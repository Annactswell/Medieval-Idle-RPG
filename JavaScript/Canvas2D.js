export class Canvas2D {
  constructor({ CSS='#canvas', width=1000, height=1000 }) {
    this.canvas = document.querySelector(CSS);
    this.width = width;
    this.height = height;
    this.canvas.width = width;
    this.canvas.height = height;
    this.ctx = this.canvas.getContext('2d');
  }

  // 公有方法：drawSprite({ sprite, x, y, width, height, rotate })
  drawSprite({ sprite=null, x=0, y=0, width=0, height=0, rotate=null }) {
    const frame = Math.floor(sprite.frame);
    const length = sprite.endX - sprite.startX + 1;
    const frameX = sprite.startX + frame % length;
    const frameY = sprite.startY + Math.floor(frame / length);
    if (!rotate) {
      this.ctx.drawImage(sprite.image, frameX * sprite.width, frameY * sprite.height, sprite.width, sprite.height, x, y, width, height);
    } else {
      this.ctx.save();
      this.ctx.translate(rotate.centerX, rotate.centerY);
      this.ctx.rotate(-rotate.angle);
      this.ctx.drawImage(sprite.image, frameX * sprite.width, frameY * sprite.height, sprite.width, sprite.height, x - rotate.centerX, y - rotate.centerY, width, height);
      this.ctx.restore();
    }
  }

  // 公有方法：drawRect({ x, y, width, height, rotate })
  drawRect({ x=0, y=0, width=0, height=0, rotate=null }) {  // ?: 可能错误，之后检查
    if (!rotate) {
      this.ctx.strokeRect(x, y, width, height);
    } else {
      this.ctx.save();
      this.ctx.translate(rotate.centerX, rotate.centerY);
      this.ctx.rotate(-rotate.angle);
      this.ctx.strokeRect(x - rotate.centerX, y - rotate.centerY, width, height);
      this.ctx.restore();
    }
  }

  // 公有方法：fillRect({ x, y, width, height, rotate })
  fillRect({ x=0, y=0, width=0, height=0, rotate=null }) {  // ?: 可能错误，之后检查
    if (!rotate) {
      this.ctx.fillRect(x, y, width, height);
    } else {
      this.ctx.save();
      this.ctx.translate(rotate.centerX, rotate.centerY);
      this.ctx.rotate(-rotate.angle);
      this.ctx.fillRect(x - rotate.centerX, y - rotate.centerY, width, height);
      this.ctx.restore();
    }
  }

  // 公有方法：clear()
  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }
}
