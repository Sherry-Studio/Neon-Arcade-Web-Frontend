import * as THREE from "three";

const FONT = (px: number) =>
  `700 ${px}px "Space Grotesk", "Arial Narrow", Impact, sans-serif`;

export interface Glyph {
  char: string;
  texture: THREE.CanvasTexture;
  /** world-space size of the plane that carries this glyph */
  width: number;
  height: number;
  /** world-space x offset from the word's centre */
  x: number;
}

/**
 * Renders each character of `text` to its own canvas as a glowing neon tube,
 * so letters can be lit, flickered and flown through independently.
 */
export function buildNeonWord(text: string, worldHeight: number): {
  glyphs: Glyph[];
  width: number;
} {
  const FONT_PX = 200;
  const PAD = 90; // room for the glow to bleed without clipping

  const measure = document.createElement("canvas").getContext("2d")!;
  measure.font = FONT(FONT_PX);

  const chars = text.split("");
  const advances = chars.map((c) => measure.measureText(c).width);
  const totalAdvance = advances.reduce((a, b) => a + b, 0);

  // canvas px → world units
  const cellH = FONT_PX + PAD * 2;
  const scale = worldHeight / cellH;

  const glyphs: Glyph[] = [];
  let cursor = -totalAdvance / 2;

  chars.forEach((char, i) => {
    const advance = advances[i];
    const cw = Math.ceil(advance + PAD * 2);

    const canvas = document.createElement("canvas");
    canvas.width = cw;
    canvas.height = cellH;
    const ctx = canvas.getContext("2d")!;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = FONT(FONT_PX);

    const cx = cw / 2;
    const cy = cellH / 2;

    // wide outer bloom
    ctx.shadowColor = "#22d3ee";
    ctx.shadowBlur = 60;
    ctx.lineWidth = 18;
    ctx.strokeStyle = "rgba(60,210,240,0.75)";
    ctx.strokeText(char, cx, cy);
    ctx.strokeText(char, cx, cy);

    // inner glow
    ctx.shadowBlur = 22;
    ctx.lineWidth = 9;
    ctx.strokeStyle = "#9fe9f7";
    ctx.strokeText(char, cx, cy);

    // white-hot tube core
    ctx.shadowColor = "#ffffff";
    ctx.shadowBlur = 6;
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#ffffff";
    ctx.strokeText(char, cx, cy);
    ctx.fillStyle = "#ffffff";
    ctx.fillText(char, cx, cy);

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 4;

    glyphs.push({
      char,
      texture,
      width: cw * scale,
      height: cellH * scale,
      x: (cursor + advance / 2) * scale,
    });

    cursor += advance;
  });

  return { glyphs, width: totalAdvance * scale };
}

/**
 * Samples solid pixels of `text` to produce world-space points that particles
 * can fly to — this is the shape the logo assembles into.
 */
export function sampleTextPoints(
  lines: { text: string; y: number }[],
  worldHeight: number,
  perLine: number
): Float32Array {
  const FONT_PX = 120;
  const W = 1400;
  const H = 260;
  const out: number[] = [];

  for (const line of lines) {
    const canvas = document.createElement("canvas");
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext("2d")!;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = FONT(FONT_PX);
    ctx.fillStyle = "#fff";
    ctx.fillText(line.text, W / 2, H / 2);

    const data = ctx.getImageData(0, 0, W, H).data;

    // collect all lit pixels, then take an even spread of them
    const lit: number[] = [];
    for (let y = 0; y < H; y += 2) {
      for (let x = 0; x < W; x += 2) {
        if (data[(y * W + x) * 4 + 3] > 128) lit.push(x, y);
      }
    }

    const count = lit.length / 2;
    const scale = worldHeight / FONT_PX;
    for (let i = 0; i < perLine; i++) {
      const idx = Math.floor((i / perLine) * count) * 2;
      const px = lit[idx] ?? W / 2;
      const py = lit[idx + 1] ?? H / 2;
      out.push(
        (px - W / 2) * scale * (FONT_PX / 100) * 0.72,
        line.y - (py - H / 2) * scale * (FONT_PX / 100) * 0.72,
        (Math.random() - 0.5) * 0.06
      );
    }
  }

  return new Float32Array(out);
}
