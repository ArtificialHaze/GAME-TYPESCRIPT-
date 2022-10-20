import { CanvasView } from "./CanvasView";
import { Brick } from "./Brick";
import { Paddle } from "./Paddle";
import { Ball } from "./Ball";

export class Collision {
  isCollidingBrick(ball: Ball, brick: Brick): boolean {
    if (
      ball.pos.x < brick.pos.x + brick.width &&
      ball.pos.x + ball.width > brick.pos.x &&
      ball.pos.y < brick.pos.y + brick.height &&
      ball.pos.y + ball.height > brick.pos.y
    ) {
      return true;
    }
    return false;
  }

  isCollidingBricks(ball: Ball, bricks: Brick[]): boolean {
    let colliding = false;
    bricks.forEach((brick, index) => {
      if (this.isCollidingBrick(ball, brick)) {
        ball.changeVerticalDirection();
        if (brick.energy === 1) {
          bricks.splice(index, 1);
        } else {
          brick.energy -= 1;
        }
        colliding = true;
      }
    });
    return colliding;
  }

  checkBallCollision(ball: Ball, paddle: Paddle, view: CanvasView): void {
    if (
      ball.pos.x + ball.width > paddle.pos.x &&
      ball.pos.x < paddle.pos.x + paddle.width &&
      ball.pos.y + ball.height === paddle.pos.y
    ) {
      ball.changeVerticalDirection();
    }

    if (ball.pos.x > view.canvas.width - ball.width || ball.pos.x < 0) {
      ball.changeHorizontalDirection();
    }

    if (ball.pos.y < 0) {
      ball.changeVerticalDirection();
    }
  }
}
