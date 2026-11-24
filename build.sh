#!/bin/bash
# Build script for Neon Tubes sample film: "Midnight Snack Run"
# Run from project root: ./build.sh
# Requires: Lemo-Opuscar library at ~/lemo-opuscar (or $LEMO_OPUSCAR_HOME)

set -e

# ─── Configuration ──────────────────────────────────────────────
PROJECT_NAME="neon-sample-film"
LIB="${LEMO_OPUSCAR_HOME:-$HOME/lemo-opuscar}"
STYLE="neon-tubes"
DURATION=45          # seconds
FPS=24
TOTAL_FRAMES=$((DURATION * FPS))  # 1080
RESOLUTION="1920x1080"
OUTPUT="build/output.mp4"

# ─── Paths ──────────────────────────────────────────────────────
FRAMES_DIR="build/frames"
AUDIO_DIR="build/audio"
mkdir -p "$FRAMES_DIR" "$AUDIO_DIR"

# ─── Colors for output ──────────────────────────────────────────
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

log() { echo -e "${BLUE}[BUILD]${NC} $*"; }
ok() { echo -e "${GREEN}[OK]${NC} $*"; }
warn() { echo -e "${YELLOW}[WARN]${NC} $*"; }
err() { echo -e "${RED}[ERR]${NC} $*"; }

# ─── Pre-flight checks ──────────────────────────────────────────
log "Checking dependencies..."

command -v node >/dev/null || { err "Node.js not found"; exit 1; }
command -v ffmpeg >/dev/null || { err "ffmpeg not found"; exit 1; }
command -v python3 >/dev/null || { err "Python 3 not found"; exit 1; }

[ -f "$LIB/AGENTS.md" ] || { err "Lemo-Opuscar library not found at $LIB"; exit 1; }
[ -f "$LIB/core/tts/kokoro-v1.0.onnx" ] || warn "Voice model not found — run 'sh setup.sh deps voice' in library"

# Check Node version
NODE_MAJOR=$(node -p 'process.versions.node.split(".")[0]')
[ "$NODE_MAJOR" -ge 20 ] || warn "Node $NODE_MAJOR < 20; may have issues"

# Check ffmpeg version
FFV=$(ffmpeg -version 2>/dev/null | sed -n '1s/^ffmpeg version n\{0,1\}\([0-9][0-9]*\)\..*/\1/p')
[ -n "$FFV" ] && [ "$FFV" -ge 7 ] || warn "ffmpeg $FFV < 7; may have encoding issues"

ok "Dependencies checked"

# ─── Step 1: Voice ──────────────────────────────────────────────
log "Step 1/6: Generating voice narration..."

cat > "$AUDIO_DIR/voice_script.txt" << 'EOF'
The city never really sleeps. It just changes its vocabulary. At 2 AM, the language is hunger. Neon verbs: eat, drink, open, down, stay. Each sign a sentence. Each block a paragraph. I'm just reading my way to ramen.
EOF

cd "$LIB"
node core/tts/tts.mjs \
  --text "$(cat "$PROJECT_DIR/$AUDIO_DIR/voice_script.txt")" \
  --voice af_heart \
  --speed 1.0 \
  --output "$PROJECT_DIR/$AUDIO_DIR/voice.wav" \
  --sample-rate 48000

# Speech check
node core/tts/speech_check.mjs \
  --audio "$PROJECT_DIR/$AUDIO_DIR/voice.wav" \
  --text "$(cat "$PROJECT_DIR/$AUDIO_DIR/voice_script.txt")" \
  --threshold 0.85

ok "Voice generated: $AUDIO_DIR/voice.wav"

# ─── Step 2: Music ──────────────────────────────────────────────
log "Step 2/6: Generating synthwave score..."

cd "$LIB"
node core/music/compose.mjs \
  --style synthwave \
  --key "F#m" \
  --tempo 120 \
  --duration $DURATION \
  --structure "intro:4,A:8,A:8,B:8,A:8,outro:4" \
  --instruments "bass:monark,lead:dx7,drums:808,arp:pad" \
  --output "$PROJECT_DIR/$AUDIO_DIR/music.wav" \
  --sample-rate 48000

ok "Music generated: $AUDIO_DIR/music.wav"

# ─── Step 3: SFX ────────────────────────────────────────────────
log "Step 3/6: Generating sound effects..."

cd "$LIB"
node core/sfx/render.mjs \
  --project "$PROJECT_DIR" \
  --config "sfx_config.json" \
  --output "$PROJECT_DIR/$AUDIO_DIR/sfx.wav" \
  --sample-rate 48000

ok "SFX generated: $AUDIO_DIR/sfx.wav"

# ─── Step 4: Audio Mix ──────────────────────────────────────────
log "Step 4/6: Mixing audio..."

cd "$LIB"
node core/mix/mix.mjs \
  --voice "$PROJECT_DIR/$AUDIO_DIR/voice.wav" \
  --music "$PROJECT_DIR/$AUDIO_DIR/music.wav" \
  --sfx "$PROJECT_DIR/$AUDIO_DIR/sfx.wav" \
  --duck-voice -18 \
  --duck-sfx -12 \
  --normalize -14 \
  --output "$PROJECT_DIR/$AUDIO_DIR/mix.wav"

ok "Final mix: $AUDIO_DIR/mix.wav"

# ─── Step 5: Frame Render ───────────────────────────────────────
log "Step 5/6: Rendering $TOTAL_FRAMES frames at ${FPS}fps..."

cd "$LIB"
node core/render/film.mjs \
  --project "$PROJECT_DIR" \
  --style "$STYLE" \
  --frames "$TOTAL_FRAMES" \
  --fps "$FPS" \
  --resolution "$RESOLUTION" \
  --output-dir "$PROJECT_DIR/$FRAMES_DIR" \
  --audio "$PROJECT_DIR/$AUDIO_DIR/mix.wav" \
  --progress

ok "Frames rendered to $FRAMES_DIR/"

# ─── Step 6: Video Encode ───────────────────────────────────────
log "Step 6/6: Encoding video..."

ffmpeg -y \
  -framerate "$FPS" \
  -i "$FRAMES_DIR/%04d.png" \
  -i "$AUDIO_DIR/mix.wav" \
  -c:v libx264 \
  -preset slow \
  -crf 18 \
  -pix_fmt yuv420p \
  -c:a aac \
  -b:a 192k \
  -shortest \
  -movflags +faststart \
  "$PROJECT_DIR/$OUTPUT"

ok "Video encoded: $OUTPUT"

# ─── Final verification ─────────────────────────────────────────
log "Verifying output..."
DURATION_ACTUAL=$(ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "$PROJECT_DIR/$OUTPUT" 2>/dev/null | cut -d. -f1)
FRAMES_ACTUAL=$(ffprobe -v error -select_streams v:0 -show_entries stream=nb_frames -of default=noprint_wrappers=1:nokey=1 "$PROJECT_DIR/$OUTPUT" 2>/dev/null)

echo ""
echo "╔══════════════════════════════════════════════════════════════╗"
echo "║  BUILD COMPLETE                                              ║"
echo "╠══════════════════════════════════════════════════════════════╣"
echo "║  Output:      $OUTPUT"
echo "║  Duration:    ${DURATION_ACTUAL}s (target: ${DURATION}s)"
echo "║  Frames:      $FRAMES_ACTUAL (target: $TOTAL_FRAMES)"
echo "║  Resolution:  $RESOLUTION"
echo "║  Frame Rate:  ${FPS}fps"
echo "║  Audio:       48kHz AAC 192kbps"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""
log "Done! Play with: ffplay $OUTPUT"