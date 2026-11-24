# Neon Tubes Sample Film: "Midnight Snack Run"

A complete, production-ready sample project demonstrating the **Lemo-Opuscar** workflow with the **Neon Tubes** style.

---

## 🎬 Project Overview

| Property | Value |
|----------|-------|
| **Style** | Neon Tubes (`neon-tubes`) |
| **Category** | Light & Lines (Station 12/15) |
| **Duration** | 45 seconds |
| **Resolution** | 1920×1080 |
| **Frame Rate** | 24 fps |
| **Total Frames** | 1,080 |
| **Language** | English (narration), Multilingual (onscreen: KO, JA, ZH) |
| **Narrator** | Warm female (Kokoro TTS `af_heart`) |
| **Music** | Procedural Synthwave, F#m, 120 BPM |

---

## 📁 Project Structure

```
neon-sample-film/
├── TREATMENT.md           # Creative treatment (DIRECTOR.md §4)
├── build.sh               # Complete build pipeline
├── render_film.mjs        # Custom Neon Tubes renderer
├── sfx_config.json        # Sound effects specification
├── README.md              # This file
└── build/                 # Generated output (created by build.sh)
    ├── frames/            # Rendered PNG frames
    ├── audio/
    │   ├── voice.wav      # TTS narration
    │   ├── music.wav      # Procedural score
    │   ├── sfx.wav        # Sound effects
    │   └── mix.wav        # Final mix
    └── output.mp4         # Final film
```

---

## 🚀 Quick Start

### Prerequisites

```bash
# System tools (install once)
# macOS:
brew install node ffmpeg python3

# Ubuntu/Debian:
sudo apt update && sudo apt install nodejs npm ffmpeg python3 python3-venv

# Windows (via Chocolatey):
choco install nodejs ffmpeg python3
```

### Install Lemo-Opuscar Library

```bash
# Clone the library (one-time setup)
git clone --depth 1 --filter=blob:none --sparse https://github.com/lemomo-ai/lemo-opuscar.git ~/lemo-opuscar
cd ~/lemo-opuscar
git sparse-checkout set '/*' '!/styles/*/demo/' '!/styleboard/' '!/docs/readme/' '!/docs/cover.jpg' '!/styles/*/poster.jpg'

# Install core dependencies (takes 3-5 minutes first run)
sh plugin/skills/lemo-opuscar/scripts/setup.sh deps
```

### Build the Sample Film

```bash
# Navigate to this project
cd neon-sample-film

# Make build script executable
chmod +x build.sh

# Run the full pipeline
./build.sh
```

**Expected runtime:** 8-15 minutes depending on hardware.

### Output

```
build/output.mp4  →  Final 45-second film (H.264, 1920×1080, 24fps)
```

---

## 🎨 Neon Tubes Style Deep Dive

### Visual Language

The Neon Tubes style (`styles/neon-tubes/STYLE.md`) defines:

| Element | Specification |
|---------|---------------|
| **Tube Rendering** | Stroke-by-stroke write-on, not fade-in |
| **Flicker** | Organic Perlin noise, per-tube phase offsets |
| **Colors** | Cyan, Magenta, Amber, Electric Blue, Hot Pink |
| **Glass Physics** | Electrode glow, gas diffusion, glow bleed |
| **Reflections** | Wet surfaces mirror tubes (WebGL) |
| **Camera** | Fixed POV walk, no cuts within scenes |
| **Rhythm** | Key animations hit on musical downbeats |

### Scene Architecture

The film uses **7 scenes** with **23 unique tube animations**:

1. **Apartment** (0-5s) — "OPEN" on doorframe
2. **Stairwell** (5-12s) — "EXIT" → "DOWN" → "NIGHT" cascade
3. **Korean BBQ Alley** (12-20s) — Bilingual morph: 불고기 → BULGOGI
4. **Convenience Store** (20-28s) — "24/7" pulses + cascading menu
5. **Crosswalk** (28-35s) — Countdown tubes 15→8 in puddle reflection
6. **Ramen Shop** (35-42s) — らーめん → RAMEN morph + 満足
7. **Dawn Fade** (42-45s) — Palindrome close: "OPEN" fades out

---

## 🔧 Customization Guide

### Change the Topic

Edit `TREATMENT.md` and `render_film.mjs`:

1. **New story** → Rewrite scene breakdown in `TREATMENT.md`
2. **New tube text** → Modify `SCENES` array in `render_film.mjs`
3. **New timing** → Adjust `start`/`end`/`delay`/`duration` values

### Change the Style

Replace `neon-tubes` with any of the 99 styles:

```bash
# In build.sh:
STYLE="watercolor"           # Watercolor Brush
STYLE="ink-wash"             # Chinese Ink Wash
STYLE="pixel-rpg"            # 16-bit Pixel RPG
STYLE="satellite-briefing"   # Satellite Briefing
# ... see styles/README.md for all 99
```

Then update `render_film.mjs` with the new style's rendering logic.

### Adjust Duration

```bash
# In build.sh:
DURATION=60    # 60 seconds
FPS=30         # 30 fps (some styles prefer this)
```

### Custom Music

Edit the music generation in `build.sh`:

```bash
node core/music/compose.mjs \
  --style ambient \        # synthwave, ambient, orchestral, jazz...
  --key "Cm" \             # Any key
  --tempo 90 \             # BPM
  --duration 45 \
  --instruments "piano,strings,pads" \
  ...
```

### Custom Voice

```bash
# In build.sh:
node core/tts/tts.mjs \
  --voice af_bella \       # af_heart, af_bella, af_nicole, am_michael, am_adam...
  --speed 1.1 \            # 0.5-2.0
  ...
```

---

## 📚 Lemo-Opuscar Workflow Reference

This sample demonstrates the complete **AGENTS.md** workflow:

| Step | File | Description |
|------|------|-------------|
| **Brief** | `TREATMENT.md` | Scene breakdown, style compliance, tech specs |
| **Treatment** | `TREATMENT.md` | Three structures, chosen one, shot list |
| **Look** | `render_film.mjs` | Style frames with real rendering code |
| **Storyboard** | (optional) | Key frames rendered for approval |
| **Produce** | `build.sh` | Voice → Music → SFX → Mix → Render → Encode |
| **Self-Check** | `TREATMENT.md` | DIRECTOR.md §11 checklist |
| **Deliver** | `build/output.mp4` | Final film + all intermediates |

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| `node: not found` | Install Node.js 20+ |
| `ffmpeg: not found` | Install ffmpeg 7+ |
| `Python 3.11+ needed` | Install Python 3.11+ or `uv` |
| `Voice model not found` | Run `sh ~/lemo-opuscar/plugin/skills/lemo-opuscar/scripts/setup.sh deps voice` |
| `WebGL reflection errors` | Disable reflections in `render_film.mjs` (comment out webglReflections block) |
| `Out of memory` | Reduce resolution: `RESOLUTION="1280x720"` in build.sh |
| `Build hangs` | Check `build/` for partial output, resume from failed step |

---

## 📖 Learning Resources

- **Style Gallery:** https://lemomo-ai.github.io/lemo-opuscar/styles/neon-tubes/
- **All 99 Styles:** https://lemomo-ai.github.io/lemo-opuscar/
- **Director Guide:** `~/lemo-opuscar/DIRECTOR.md`
- **Technique Guide:** `~/lemo-opuscar/TECHNIQUE.md`
- **Agent Instructions:** `~/lemo-opuscar/AGENTS.md`
- **Core Tools API:** `~/lemo-opuscar/core/README.md`

---

## 🎓 Next Steps

1. **Watch the gallery demo** — See the official Neon Tubes film "Midnight Snack"
2. **Modify the story** — Change `SCENES` in `render_film.mjs` to tell your story
3. **Try another style** — Pick from 99 styles, adapt the renderer
4. **Make it yours** — Use `MY-STYLES.md` to customize Neon Tubes with your brand colors/logo
5. **Scale up** — Longer films, multiple styles, custom shaders

---

## 📄 License

This sample project is released under the same license as Lemo-Opuscar (MIT).
The Lemo-Opuscar library: https://github.com/lemomo-ai/lemo-opuscar

---

*Built with Lemo-Opuscar — 99 film styles, entirely in code.*