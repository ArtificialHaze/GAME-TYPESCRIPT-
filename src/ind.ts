import { CanvasView } from "./CanvasView";
import { Brick } from "./Brick";
import { Ball } from "./Ball";
import { Paddle } from "./Paddle";

import PADDLE_IMAGE from "../images/paddle.png";
import BALL_IMAGE from "../images/ball.png";

import {
  PADDLE_SPEED,
  PADDLE_WIDTH,
  PADDLE_HEIGHT,
  PADDLE_STARTX,
  BALL_SPEED,
  BALL_SIZE,
  BALL_STARTX,
  BALL_STARTY,
} from "./setup";
import { createBricks } from "./utils";
import { Collision } from "./Collision";

let gameOver = false;
let score = 0;

function setGameOver(view: CanvasView) {
  view.drawInfo("GAME OVER.");
  gameOver = false;
}

function setGameWin(view: CanvasView) {
  view.drawInfo("YOU HAVE WON!");
  gameOver = false;
}

function gameLopp(
  view: CanvasView,
  bricks: Brick[],
  paddle: Paddle,
  ball: Ball,
  collision: Collision
) {
  view.clear();
  view.drawBricks(bricks);
  view.drawSprite(paddle);
  view.drawSprite(ball);

  ball.moveBall();

  if (
    (paddle.isMovingLeft && paddle.pos.x > 0) ||
    (paddle.isMovingRight && paddle.pos.x < view.canvas.width - paddle.width)
  ) {
    paddle.movePaddle();
  }

  collision.checkBallCollision(ball, paddle, view);

  const isColliding = collision.isCollidingBricks(ball, bricks);

  if (isColliding) {
    score += 1;
    view.drawScore(score);
  }

  if (ball.pos.y > view.canvas.height) gameOver = true;

  if (bricks.length === 0) return setGameWin(view);

  if (gameOver) return setGameOver(view);

  requestAnimationFrame(() => gameLopp(view, bricks, paddle, ball, collision));
}

function startGame(view: CanvasView) {
  score = 0;

  view.drawInfo("");
  view.drawScore(0);

  const collision = new Collision();

  const bricks = createBricks();

  const ball = new Ball(
    BALL_SPEED,
    BALL_SIZE,
    { x: BALL_STARTX, y: BALL_STARTY },
    BALL_IMAGE
  );

  const paddle = new Paddle(
    PADDLE_SPEED,
    PADDLE_WIDTH,
    PADDLE_HEIGHT,
    {
      x: PADDLE_STARTX,
      y: view.canvas.height - PADDLE_HEIGHT - 5,
    },
    PADDLE_IMAGE
  );

  gameLopp(view, bricks, paddle, ball, collision);
}

const view = new CanvasView("#playField");
view.initStartButton(startGame);
