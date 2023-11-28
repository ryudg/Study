import { AI } from "./01-2.ai";

export class Leela implements AI {
  stage = 0;
  advance() {
    this.stage += 1;
  }
}
