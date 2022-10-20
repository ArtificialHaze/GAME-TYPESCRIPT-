import { Brick } from "./Brick";
import {
  BRICK_IMAGES,
  LEVEL,
  STAGE_COLS,
  STAGE_PADDING,
  BRICK_WIDTH,
  BRICK_HEIGHT,
  BRICK_PADDING,
  BRICK_ENERGY,
} from "./setup";

export function createBricks(): Brick[] {
  return LEVEL.reduce((acc, curr, index) => {
    const row = Math.floor((index + 1) / STAGE_COLS);
    const col = index % STAGE_COLS;
    const x = STAGE_PADDING + col * (BRICK_WIDTH + BRICK_PADDING);
    const y = STAGE_PADDING + row * (BRICK_HEIGHT + BRICK_PADDING);
    if (curr === 0) return acc;
    return [
      ...acc,
      new Brick(
        BRICK_WIDTH,
        BRICK_HEIGHT,
        { x, y },
        BRICK_ENERGY[curr],
        BRICK_IMAGES[curr]
      ),
    ];
  }, [] as Brick[]);
}
