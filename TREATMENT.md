# Treatment: Midnight Snack Run

**Style:** Neon Tubes (`neon-tubes`)
**Duration:** 45 seconds
**Language:** English
**Narrator:** Warm female, conversational tone
**Music:** Synthwave, 120 BPM, minor key

---

## Logline
A lone night owl navigates a sleeping city to satisfy a 2 AM craving, guided by the electric pulse of neon signs — each one a character, each flicker a line of dialogue.

---

## Three Candidate Structures

### Structure A: Linear Journey (Chosen)
**Why:** The Neon Tubes style thrives on sequential revelation — each sign "speaks" as the protagonist passes. A linear walk creates natural rhythm for the tube-animation technique.

**Act I (0-15s):** Departure — leaving the apartment, first signs awaken
**Act II (15-30s):** The Walk — district by district, signs accumulate into chorus
**Act III (30-45s):** Arrival — the destination sign, final flourish, fade to dawn

### Structure B: Memory Montage
Rejected: Breaks the "live walk" illusion that makes Neon Tubes feel immersive.

### Structure C: Sign POV Anthology
Rejected: Too fragmented; loses the protagonist thread that grounds the abstraction.

---

## Scene Breakdown

| Time | Scene | Visual | Audio | Neon Tubes Technique |
|------|-------|--------|-------|---------------------|
| 0:00-0:05 | **Apartment Window** | Dark room, cursor blinks on screen. Door opens. | Low hum, distant city | First tube: "OPEN" flickers on doorframe |
| 0:05-0:12 | **Stairwell Descent** | POV down spiral stairs, each landing a color | Footsteps echo, synth bass enters | Landings: "EXIT" → "DOWN" → "NIGHT" (sequential write-on) |
| 0:12-0:20 | **Korean BBQ Alley** | Steam, red/orange tubes reflect on wet pavement | Sizzle SFX, melody begins | "불고기" writes in Korean, then English "BULGOGI" — bilingual tube morph |
| 0:20-0:28 | **Convenience Store** | Automatic doors, fluorescent spill | Chime, beat drops | "24/7" pulses on beat; "SNACKS" "DRINKS" "RAMEN" cascade down |
| 0:28-0:35 | **Crosswalk Wait** | Red hand → walking figure, tubes reflect in puddle | Crosswalk beep, arpeggio | Countdown tubes: "15" "14" "13"... each number a tube segment |
| 0:35-0:42 | **Ramen Shop Arrival** | Noren curtain parts, steam billows | Bowl clack, satisfied sigh | "らーめん" → "RAMEN" — kanji tubes dissolve into latin |
| 0:42-0:45 | **First Bite / Dawn** | Close: steam rises, forming "満足" (satisfied) | Final chord, city waking | All tubes fade in reverse order — palindrome close |

---

## Neon Tubes Style Compliance Checklist

- [ ] **Tube grammar:** All text rendered as animated neon tubes (no flat text overlays)
- [ ] **Color palette:** Cyan, magenta, amber, electric blue, hot pink — no pastels
- [ ] **Flicker behavior:** Organic, not mechanical — each tube has unique phase offset
- [ ] **Write-on animation:** Characters draw stroke-by-stroke, not fade-in
- [ ] **Reflections:** Wet pavement/crosswalk puddles mirror tubes (WebGL reflection pass)
- [ ] **Glass tube physics:** Subtle glow bleed, electrode glow at ends, gas diffusion
- [ ] **Sound sync:** Key tube animations hit on musical downbeats
- [ ] **No stock footage:** Every frame rendered in code (Canvas 2D + WebGL shaders)

---

## Technical Specifications

| Parameter | Value |
|-----------|-------|
| Resolution | 1920×1080 |
| Frame Rate | 24 fps |
| Total Frames | 1080 |
| Render Engine | Canvas 2D (tubes) + WebGL (reflections/glow) |
| Audio Sample Rate | 48 kHz |
| Voice | Kokoro TTS (v1.0, `af_heart` voice) |
| Music | Procedural synthwave (Tone.js + pluck.py samples) |
| Output | `build/output.mp4` (H.264, CRF 18) |

---

## Asset Requirements

### Voice Script (45 seconds ≈ 95 words)
> "The city never really sleeps. It just changes its vocabulary. At 2 AM, the language is hunger. Neon verbs: *eat, drink, open, down, stay*. Each sign a sentence. Each block a paragraph. I'm just reading my way to ramen."

### Music Spec
- **Genre:** Synthwave / Darksynth
- **Key:** F# minor
- **Tempo:** 120 BPM
- **Instruments:** Analog bass (Monark), FM lead (DX7), 808 drums, arpeggiated pad
- **Structure:** Intro (4 bars) → AABA → Outro (fade on final chord)

### SFX List
1. Door creak (0:00)
2. Footsteps on concrete (0:05-0:20)
3. Sizzle + exhaust fan (0:12-0:20)
4. Convenience store chime (0:20)
5. Crosswalk beep (0:28-0:35)
6. Noren curtain rustle (0:35)
7. Bowl set down + chopsticks (0:42)
8. Ambient city hum (throughout, duck under voice)

---

## Self-Check Questions (DIRECTOR.md §11)

1. **Does every text element use the tube renderer?** Yes — no HTML/CSS text overlays.
2. **Are tube colors within the style palette?** Verified against `neon-tubes/STYLE.md` palette.
3. **Do flickers feel organic?** Per-tube phase offsets + Perlin noise modulation.
4. **Is the protagonist's journey clear without dialogue?** Visual storytelling: door → stairs → alley → store → crosswalk → ramen.
5. **Does the music serve the tube animation?** Beat-sync on key write-ons; arpeggio mirrors tube cascade.
6. **Is the ending satisfying?** Palindrome fade mirrors opening — "OPEN" ↔ "満足".
7. **Technical delivery:** 1920×1080, 24fps, H.264, audio synced, no dropped frames.

---

## Production Notes

**Rendering Order:**
1. Voice recording → speech check → `voice.wav`
2. Music generation → `music.wav`
3. SFX mix → `sfx.wav`
4. Full mix → `mix.wav`
5. Frame-by-frame render (1080 frames) → `frames/####.png`
6. FFmpeg encode → `output.mp4`

**Estimated Render Time:** 8-12 minutes on M2 MacBook / modern Linux

**Fallback Plan:** If WebGL reflections too slow, disable reflection pass — tubes remain primary visual.

---

*Treatment approved. Proceeding to storyboard frames → production.*