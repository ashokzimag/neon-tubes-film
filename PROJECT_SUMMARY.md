# Neon Tubes Sample Film — Complete Project Package

## 📦 What's Included

This is a **complete, production-ready sample project** for the Lemo-Opuscar Neon Tubes style. Everything needed to understand, customize, and build a film in this style.

---

## 🗂️ File Manifest

| File | Purpose | Lines |
|------|---------|-------|
| `TREATMENT.md` | Creative treatment per DIRECTOR.md §4 | 180+ |
| `STORYBOARD.md` | Key-frame review document with approval checkboxes | 120+ |
| `build.sh` | Complete build pipeline (voice→music→sfx→mix→render→encode) | 200+ |
| `render_film.mjs` | Custom Neon Tubes renderer (Canvas 2D + WebGL) | 280+ |
| `sfx_config.json` | Sound effects specification (10 SFX cues) | 80+ |
| `style_config.json` | Machine-readable style parameters | 60+ |
| `README.md` | Full documentation & customization guide | 180+ |
| `PROJECT_SUMMARY.md` | This file | — |

**Total: 8 files, ~1,100 lines of production-ready code/docs**

---

## 🎯 What This Demonstrates

### Lemo-Opuscar Workflow Compliance
- ✅ **Brief** → Treatment with 3 structures, style compliance checklist
- ✅ **Treatment** → Written before any demo code inspected
- ✅ **Look** → Custom renderer implements Neon Tubes grammar
- ✅ **Storyboard** → Key frames documented for review/approval
- ✅ **Produce** → Full pipeline: TTS → Music → SFX → Mix → Frame Render → Encode
- ✅ **Self-Check** → DIRECTOR.md §11 verification in treatment
- ✅ **Deliver** → `build/output.mp4` + all intermediates preserved

### Neon Tubes Style Grammar (from STYLE.md)
- ✅ Tube rendering: stroke-by-stroke write-on
- ✅ Palette: Cyan, Magenta, Amber, Electric Blue, Hot Pink
- ✅ Organic flicker: Perlin noise, per-tube phase offsets
- ✅ Glass physics: electrode glow, gas diffusion, glow bleed
- ✅ Reflections: WebGL wet-surface pass
- ✅ Beat-sync: Key animations on musical downbeats
- ✅ Multilingual: KO/JA/ZH/EN tube morphs
- ✅ Zero stock footage: 100% code-rendered

---

## 🚀 How to Run

```bash
# 1. Install Lemo-Opuscar library (one-time)
git clone --depth 1 --filter=blob:none --sparse https://github.com/lemomo-ai/lemo-opuscar.git ~/lemo-opuscar
cd ~/lemo-opuscar
git sparse-checkout set '/*' '!/styles/*/demo/' '!/styleboard/' '!/docs/readme/' '!/docs/cover.jpg' '!/styles/*/poster.jpg'
sh plugin/skills/lemo-opuscar/scripts/setup.sh deps

# 2. Build this sample
cd neon-sample-film
chmod +x build.sh
./build.sh

# 3. Output: build/output.mp4 (45s, 1920×1080, 24fps)
```

**Requirements:** Node 20+, ffmpeg 7+, Python 3.11+
**Runtime:** ~8-15 minutes

---

## 🎨 Customization Entry Points

| Want to... | Edit |
|------------|------|
| Change the story | `TREATMENT.md` + `render_film.mjs` SCENES array |
| Change duration | `build.sh` DURATION/FPS + `render_film.mjs` timing |
| Change style | `build.sh` STYLE + rewrite `render_film.mjs` for new style |
| Change music | `build.sh` music generation params |
| Change voice | `build.sh` TTS voice/speed params |
| Add SFX | `sfx_config.json` |
| Adjust tube physics | `style_config.json` + `render_film.mjs` tubePhysics |

---

## 📚 Learning Value

This sample teaches:

1. **Treatment writing** — Three structures, shot-level breakdown, compliance checklist
2. **Style renderer architecture** — Canvas 2D + WebGL hybrid, frame-accurate animation
3. **Neon Tubes grammar** — Tube physics, flicker, morphs, reflections, beat-sync
4. **Build pipeline** — TTS → Music → SFX → Mix → Render → FFmpeg encode
5. **Storyboard review** — Frame-accurate approval workflow
6. **Multilingual tubes** — Korean→English, Japanese→English, Chinese morphs
7. **Palindrome structure** — Narrative mirroring (OPEN ↔ 満足)

---

## 🔗 References

- **Style Gallery:** https://lemomo-ai.github.io/lemo-opuscar/styles/neon-tubes/
- **All 99 Styles:** https://lemomo-ai.github.io/lemo-opuscar/
- **Director Guide:** `~/lemo-opuscar/DIRECTOR.md`
- **Technique Guide:** `~/lemo-opuscar/TECHNIQUE.md`
- **Agent Instructions:** `~/lemo-opuscar/AGENTS.md`
- **Style Index:** `~/lemo-opuscar/styles/README.md`

---

## 📄 License

MIT — Same as Lemo-Opuscar. Free to use, modify, distribute.

---

*This sample is part of the Lemo-Opuscar ecosystem — 99 film styles, entirely in code.*