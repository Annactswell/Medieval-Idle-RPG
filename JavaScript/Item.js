import { HitBox } from './HitBox.js'

export class Item {
  constructor({ sprites=null, state='', logic=()=>{}, x=0, y=0, size=1, speed=10, angle=0, hitBox=null }) {
    
    // 私有属性
    this.sprites = sprites;  // 静态对象的指针引用，不要改
    this.state = state;
    this.isSwitchState = false;
    this.lastState = this.state;

    // 公有属性
    this.sprite = this.sprites[this.state].clone();  // 将状态与精灵图绑定
    this.logic = logic;
    this.x = x;
    this.y = y;
    this.size = size;
    this.speed = speed;
    this.angle = angle;
    this.width = this.sprite.width * this.size;
    this.height = this.sprite.height * this.size;
    this.hitBox = hitBox.clone();  // ?: 是否需要将碰撞箱与状态绑定

  }

  // 公有方法：changeState(state)
  changeState(state) {
    this.state = state;
    this.sprite = this.sprites[this.state].clone();
    this.sprite.isFinished = false;  // ?: 是否有必要
  }

  // 公有方法：switchState(state)
  switchState(state) {
    if (this.isSwitchingState) return false;
    this.lastState = this.state;
    this.isSwitchingState = true;
    this.changeState(state);
    return true;
  }

  // 私有方法：checkSwitchingState()
  checkSwitchingState() {
    if (this.isSwitchingState && this.sprite.isFinished) {
      this.isSwitchingState = false;
      this.changeState(this.lastState);
    }
  }

  // 公有方法：move({ x, y })
  move({ x=0, y=0 }) {
    if (this.angle === 0) {
      this.x += this.speed * x;
      this.y += this.speed * y;
      this.hitBox.centerX += this.speed * x;
      this.hitBox.centerY += this.speed * y;
    } else {
      const movementX = x * Math.cos(this.angle) + y * Math.sin(this.angle);  // 可能是 -this.angle ？
      const movementY = x * Math.sin(-this.angle) + y * Math.cos(this.angle);
      this.x += this.speed *  movementX;
      this.y += this.speed * movementY;
      this.hitBox.centerX += this.speed * movementX;
      this.hitBox.centerY += this.speed * movementY;
    }
  }

  // 公有方法：moveTo({ x, y })
  moveTo({ x=this.x, y=this.y }) { 
    this.hitBox.centerX += x - this.x;
    this.hitBox.centerY += y - this.y;
    this.x = x;
    this.y = y;
  }

  // 公有方法：moveCenterTo({ x, y })
  moveCenterTo({ x=this.hitBox.centerX, y=this.hitBox.centerY }) {
    this.x += x - this.hitBox.centerX;
    this.y += y - this.hitBox.centerY;
    this.hitBox.centerX = x;
    this.hitBox.centerY = y;
  }

  // 公有方法：rotate({ angle })
  // 与HitBox的rotate区分：Item旋转为移动方向上的旋转，而HitBox的旋转为图像的旋转
  rotate({ angle=0 }) {
    this.angle += angle;
    this.hitBox.angle += angle;
  }

  // 私有方法：update()，包括执行逻辑与图象更新
  update() {
    this.logic(this);
    this.checkSwitchingState();
    this.sprite.update(); 
  }

  // 私有方法：draw(screen)
  draw(screen) {
    screen.drawSprite({
      sprite: this.sprite,
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
      rotate: this.angle === 0 ? null : {
        centerX: this.hitBox.centerX,
        centerY: this.hitBox.centerY,
        angle: this.hitBox.angle
      }
    });
    this.hitBox.draw(screen);
  }

  // 公有方法：animate(screen)
  animate(screen) {
    this.update();
    this.draw(screen);
  }

  // 公有方法：clone()
  clone() {
    return new Item({
      sprites: this.sprites,
      state: this.state,
      logic: this.logic,
      x: this.x,
      y: this.y,
      size: this.size,
      speed: this.speed,
      angle: this.angle,
      hitBox: this.hitBox.clone()
    })
  }
}
