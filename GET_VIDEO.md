# 🎬 Get Your Video in 3 Minutes (No Local Setup)

## The Easiest Way: GitHub Actions (Free Cloud Build)

### Step 1: Create a GitHub Repo (1 min)
1. Go to https://github.com/new
2. Repo name: `neon-tubes-film` (or anything)
3. **Public** (free Actions minutes) or Private
4. Click **Create repository**

### Step 2: Push This Folder (1 min)
```bash
# In the neon-sample-film folder:
git init
git add .
git commit -m "Neon Tubes film project"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/neon-tubes-film.git
git push -u origin main
```

### Step 3: Trigger Build (30 sec)
1. Go to your repo → **Actions** tab
2. Click **"Build Neon Tubes Film"** workflow
3. Click **Run workflow** → **Run workflow** button
4. Wait ~15-25 minutes

### Step 4: Download Your MP4 (30 sec)
1. Click the completed workflow run
2. Scroll to **Artifacts** section
3. Click **neon-tubes-film** → downloads `output.mp4`

---

## 📁 What You're Pushing

This folder (`neon-sample-film/`) contains:
- `.github/workflows/build.yml` — Cloud build pipeline
- `TREATMENT.md` — Creative plan
- `STORYBOARD.md` — 7 scenes, 1080 frames
- `build.sh` — Local build script
- `render_film.mjs` — Neon Tubes renderer
- `sfx_config.json` — Sound effects
- `style_config.json` — Style parameters
- `README.md` — Full documentation

---

## ⚡ Why This Works

| Problem | GitHub Actions Solution |
|---------|------------------------|
| No ffmpeg 7+ | Pre-installed on ubuntu-latest |
| No Python 3.11+ | Installs 3.12 in workflow |
| Voice model download fails | Works in Actions (GitHub network) |
| Chromium download fails | Playwright installs it automatically |
| No GPU | CPU render is fine for 1080 frames |
| Build takes 15 min | Free 45-min timeout |

---

## 🎯 Alternative: One-Click Codespaces

If you don't want to push to GitHub:

1. Open this repo in **GitHub Codespaces** (green "Code" button → Codespaces → Create)
2. Wait for container to start (~2 min)
3. Terminal: `cd neon-sample-film && chmod +x build.sh && ./build.sh`
4. Download `build/output.mp4` from file explorer

---

## 📞 Need Help?

- **Actions failing?** Check the workflow logs — each step shows exact error
- **Video not in artifacts?** Build failed — check the "Render Neon Tubes film" step logs
- **Want to customize?** Edit `render_film.mjs` SCENES array, push again

---

**That's it. Push → Wait → Download. No local tools needed.**