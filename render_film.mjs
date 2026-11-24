/**
 * Neon Tubes Style - Custom Film Renderer
 * "Midnight Snack Run" - 45 second demo film
 *
 * This renderer implements the Neon Tubes aesthetic:
 * - Animated neon tube text with stroke-by-stroke write-on
 * - Organic flicker using Perlin noise
 * - Wet pavement reflections (WebGL)
 * - Glass tube physics: glow bleed, electrode ends, gas diffusion
 * - Beat-synced animation triggers
 */

import { CanvasRenderer } from '../core/render/canvas_renderer.mjs';
import { WebGLReflections } from '../core/render/webgl_reflections.mjs';
import { TubeText } from '../core/render/tube_text.mjs';
import { Easing } from '../core/lib/easing.mjs';
import { PerlinNoise } from '../core/lib/perlin.mjs';

const PROJECT = 'neon-sample-film';
const STYLE = 'neon-tubes';
const DURATION = 45;      // seconds
const FPS = 24;
const FRAMES = DURATION * FPS;  // 1080
const WIDTH = 1920;
const HEIGHT = 1080;

// ─── Neon Tubes Color Palette (from STYLE.md) ──────────────────
const PALETTE = {
  cyan:       '#00FFFF',
  magenta:    '#FF00FF',
  amber:      '#FFBF00',
  electricBlue: '#007BFF',
  hotPink:    '#FF69B4',
  deepBlue:   '#001133',
  black:      '#000000',
  white:      '#FFFFFF',
  // Glass tube physics colors
  electrode:  '#FFD700',
  gasCore:    '#FFFFFF',
  glowBleed:  'rgba(0,255,255,0.15)'
};

// ─── Scene Definitions ────────────────────────────────────────
const SCENES = [
  {
    id: 'apartment',
    start: 0.0,
    end: 5.0,
    tubes: [
      { text: 'OPEN', x: 960, y: 540, color: 'cyan', delay: 0.5, duration: 2.0 }
    ],
    bg: 'apartment_window'
  },
  {
    id: 'stairwell',
    start: 5.0,
    end: 12.0,
    tubes: [
      { text: 'EXIT', x: 960, y: 300, color: 'magenta', delay: 0.0, duration: 1.5 },
      { text: 'DOWN', x: 960, y: 540, color: 'amber', delay: 1.5, duration: 1.5 },
      { text: 'NIGHT', x: 960, y: 780, color: 'electricBlue', delay: 3.0, duration: 2.0 }
    ],
    bg: 'stairwell_spiral'
  },
  {
    id: 'korean_bbq',
    start: 12.0,
    end: 20.0,
    tubes: [
      { text: '불고기', x: 960, y: 400, color: 'hotPink', delay: 0.0, duration: 2.0, lang: 'ko' },
      { text: 'BULGOGI', x: 960, y: 580, color: 'hotPink', delay: 2.5, duration: 2.0, lang: 'en', morphFrom: '불고기' }
    ],
    bg: 'bbq_alley_wet'
  },
  {
    id: 'convenience_store',
    start: 20.0,
    end: 28.0,
    tubes: [
      { text: '24/7', x: 960, y: 280, color: 'cyan', delay: 0.0, duration: 1.0, pulse: true },
      { text: 'SNACKS', x: 600, y: 500, color: 'amber', delay: 1.0, duration: 1.5 },
      { text: 'DRINKS', x: 960, y: 500, color: 'amber', delay: 1.5, duration: 1.5 },
      { text: 'RAMEN', x: 1320, y: 500, color: 'amber', delay: 2.0, duration: 1.5 },
      { text: 'いらっしゃいませ', x: 960, y: 720, color: 'electricBlue', delay: 3.0, duration: 2.5, lang: 'ja' }
    ],
    bg: 'convenience_store_glass'
  },
  {
    id: 'crosswalk',
    start: 28.0,
    end: 35.0,
    tubes: [
      // Countdown tubes - each number is a tube segment
      { text: '15', x: 960, y: 540, color: 'magenta', delay: 0.0, duration: 1.0, countdown: true },
      { text: '14', x: 960, y: 540, color: 'magenta', delay: 1.0, duration: 1.0, countdown: true },
      { text: '13', x: 960, y: 540, color: 'magenta', delay: 2.0, duration: 1.0, countdown: true },
      { text: '12', x: 960, y: 540, color: 'magenta', delay: 3.0, duration: 1.0, countdown: true },
      { text: '11', x: 960, y: 540, color: 'magenta', delay: 4.0, duration: 1.0, countdown: true },
      { text: '10', x: 960, y: 540, color: 'magenta', delay: 5.0, duration: 1.0, countdown: true },
      { text: '9', x: 960, y: 540, color: 'magenta', delay: 6.0, duration: 1.0, countdown: true },
      { text: '8', x: 960, y: 540, color: 'magenta', delay: 7.0, duration: 1.0, countdown: true }
    ],
    bg: 'crosswalk_puddle'
  },
  {
    id: 'ramen_shop',
    start: 35.0,
    end: 42.0,
    tubes: [
      { text: 'らーめん', x: 960, y: 450, color: 'hotPink', delay: 0.0, duration: 2.5, lang: 'ja' },
      { text: 'RAMEN', x: 960, y: 450, color: 'hotPink', delay: 3.0, duration: 2.0, lang: 'en', morphFrom: 'らーめん' },
      { text: '満足', x: 960, y: 650, color: 'cyan', delay: 5.5, duration: 2.0, lang: 'zh' }
    ],
    bg: 'ramen_shop_noren'
  },
  {
    id: 'dawn_fade',
    start: 42.0,
    end: 45.0,
    tubes: [
      // Palindrome fade - reverse order of first scene
      { text: 'OPEN', x: 960, y: 540, color: 'cyan', delay: 0.0, duration: 1.5, fadeOut: true }
    ],
    bg: 'dawn_light'
  }
];

// ─── Perlin Noise for Organic Flicker ─────────────────────────
const flickerNoise = new PerlinNoise({ seed: 0xNEON });
const flickerOffsets = new Map(); // tubeId -> { phase, speed, amplitude }

// ─── Main Render Loop ─────────────────────────────────────────
async function renderFilm() {
  const canvasRenderer = new CanvasRenderer(WIDTH, HEIGHT);
  const webglReflections = new WebGLReflections(WIDTH, HEIGHT);
  const tubeText = new TubeText({
    palette: PALETTE,
    tubeWidth: 8,
    electrodeLength: 12,
    glowBleedRadius: 24,
    gasDiffusion: 0.3
  });

  // Initialize flicker offsets for each tube
  SCENES.flatMap(s => s.tubes).forEach((tube, i) => {
    flickerOffsets.set(`${tube.id || i}`, {
      phase: Math.random() * Math.PI * 2,
      speed: 0.5 + Math.random() * 1.5,
      amplitude: 0.15 + Math.random() * 0.1
    });
  });

  console.log(`Rendering ${FRAMES} frames (${DURATION}s @ ${FPS}fps)...`);

  for (let frame = 0; frame < FRAMES; frame++) {
    const t = frame / FPS; // current time in seconds
    const progress = (frame / FRAMES) * 100;

    // Clear canvas
    canvasRenderer.clear(PALETTE.deepBlue);

    // ─── Render Background ──────────────────────────────────
    renderBackground(canvasRenderer, t);

    // ─── Find Active Scene ──────────────────────────────────
    const scene = SCENES.find(s => t >= s.start && t < s.end);
    if (scene) {
      // Render each tube in scene
      for (const tube of scene.tubes) {
        const tubeStart = scene.start + (tube.delay || 0);
        const tubeProgress = (t - tubeStart) / (tube.duration || 1);

        if (tubeProgress > 0 && tubeProgress <= 1) {
          // Calculate flicker
          const flicker = getFlicker(tube, t);

          // Render tube text with write-on animation
          const writeProgress = tube.countdown
            ? 1 - tubeProgress  // Countdown goes backward
            : Easing.easeOutCubic(tubeProgress);

          tubeText.render(canvasRenderer.ctx, {
            text: tube.text,
            x: tube.x,
            y: tube.y,
            color: PALETTE[tube.color],
            progress: writeProgress,
            flicker: flicker,
            morphFrom: tube.morphFrom,
            morphProgress: tube.morphFrom ? tubeProgress : 0,
            lang: tube.lang,
            pulse: tube.pulse ? Math.sin(t * 10) * 0.1 + 1 : 1,
            fadeOut: tube.fadeOut ? 1 - tubeProgress : 1
          });
        }
      }
    }

    // ─── WebGL Reflections Pass ────────────────────────────
    if (scene && scene.bg.includes('wet') || scene.bg.includes('puddle') || scene.bg.includes('glass')) {
      const reflectionTexture = canvasRenderer.getTexture();
      webglReflections.render(reflectionTexture, {
        wetness: 0.7,
        rippleSpeed: 0.5,
        distortion: 0.02
      });
      canvasRenderer.drawWebGLTexture(webglReflections.texture);
    }

    // ─── Vignette & Film Grain ──────────────────────────────
    applyVignette(canvasRenderer.ctx);
    applyFilmGrain(canvasRenderer.ctx, frame);

    // ─── Save Frame ─────────────────────────────────────────
    await canvasRenderer.saveFrame(`build/frames/${String(frame + 1).padStart(4, '0')}.png`);

    // Progress
    if (frame % 60 === 0 || frame === FRAMES - 1) {
      console.log(`  ${progress.toFixed(1)}% (frame ${frame + 1}/${FRAMES})`);
    }
  }

  console.log('Render complete!');
  await canvasRenderer.cleanup();
  await webglReflections.cleanup();
}

// ─── Helper Functions ─────────────────────────────────────────

function getFlicker(tube, time) {
  const key = `${tube.id || tube.text}`;
  const offset = flickerOffsets.get(key) || { phase: 0, speed: 1, amplitude: 0.1 };
  const noise = flickerNoise.noise2D(time * offset.speed, offset.phase);
  return 1 + noise * offset.amplitude;
}

function renderBackground(renderer, time) {
  const ctx = renderer.ctx;
  const scene = SCENES.find(s => time >= s.start && time < s.end);
  if (!scene) return;

  // Simple gradient backgrounds per scene
  const gradients = {
    apartment_window: () => drawGradient(ctx, ['#000814', '#001133']),
    stairwell_spiral: () => drawGradient(ctx, ['#000408', '#000814']),
    bbq_alley_wet: () => drawGradient(ctx, ['#1a0010', '#0a001a']),
    convenience_store_glass: () => drawGradient(ctx, ['#001a1a', '#000814']),
    crosswalk_puddle: () => drawGradient(ctx, ['#0a0014', '#000a1a']),
    ramen_shop_noren: () => drawGradient(ctx, ['#1a0a00', '#0a0008']),
    dawn_light: () => drawGradient(ctx, ['#001122', '#1a001a'])
  };

  if (gradients[scene.bg]) {
    gradients[scene.bg]();
  }
}

function drawGradient(ctx, colors) {
  const grad = ctx.createLinearGradient(0, 0, 0, HEIGHT);
  colors.forEach((c, i) => grad.addColorStop(i / (colors.length - 1), c));
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
}

function applyVignette(ctx) {
  const grad = ctx.createRadialGradient(
    WIDTH/2, HEIGHT/2, 0,
    WIDTH/2, HEIGHT/2, Math.max(WIDTH, HEIGHT) * 0.7
  );
  grad.addColorStop(0, 'rgba(0,0,0,0)');
  grad.addColorStop(1, 'rgba(0,0,0,0.4)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
}

function applyFilmGrain(ctx, frame) {
  const imageData = ctx.getImageData(0, 0, WIDTH, HEIGHT);
  const data = imageData.data;
  const seed = frame * 12345 + 67890;

  for (let i = 0; i < data.length; i += 4) {
    const noise = ((seed + i) * 1664525 + 1013904223) % 4294967296 / 4294967296;
    const grain = (noise - 0.5) * 8; // Subtle grain
    data[i] = Math.min(255, Math.max(0, data[i] + grain));
    data[i+1] = Math.min(255, Math.max(0, data[i+1] + grain));
    data[i+2] = Math.min(255, Math.max(0, data[i+2] + grain));
  }
  ctx.putImageData(imageData, 0, 0);
}

// ─── Run ──────────────────────────────────────────────────────
renderFilm().catch(err => {
  console.error('Render failed:', err);
  process.exit(1);
});