/** @type { HTMLCanvasElement } */ 

import { Sprite } from './Sprite.js';
import { Canvas2D } from './Canvas2D.js';
import { Item } from './Item.js';
import { HitBox } from './HitBox.js';


// 考虑和keyboard封装成一个类
// let curKey = 0;
// document.addEventListener('keydown', event => curKey = event.key);
// document.addEventListener('keyup', event => curKey = 0);

const GAME_FRAME = 50;

const screen = new Canvas2D({
  CSS: '#canvas', 
  width: 1000,
  height: 1000
});

const logics = {
  game: {
    fight: function() {
      setInterval(() => {

      }, 2000);
    }
  },
  hero: {
    move: function(hero) {
      return;
      hero.move({ x: 5, y: 5 });
    }
  }
}


const staticItems = {
  heroes: {
    knight: null,
    soldier: null
  },
  enemies: {
    bat: null
  },
  backgrounds: {
    bg1: null
  }
}

function setStaticItems() {
  function setStaticHeroes() {
    function setStaticSoldier() {
      const sprites = {
        idle: new Sprite({ src: './images/heroes/soldier/idle.png', width: 100, height: 100, startX: 0, endX: 5, startY: 0, endY: 0, rate: 15 }),
        walk: new Sprite({ src: './images/heroes/soldier/walk.png', width: 100, height: 100, startX: 0, endX: 7, startY: 0, endY: 0, rate: 15 }),
        attack: new Sprite({ src: './images/heroes/soldier/attack-1.png', width: 100, height: 100, startX: 0, endX: 5, startY: 0, endY: 0, rate: 15 }),
        hurt: new Sprite({ src: './images/heroes/soldier/hurt.png', width: 100, height: 100, startX: 0, endX: 3, startY: 0, endY: 0, rate: 15 }),
        death: new Sprite({ src: './images/heroes/soldier/death.png', width: 100, height: 100, startX: 0, endX: 3, startY: 0, endY: 0, rate: 15 })
      }
      const state = 'idle';
      const logic = logics.hero.move;
      const x = 0;
      const y = 0;
      const size = 10;
      const speed = 1;
      const angle = 0;
      const width = sprites[state].width * size;
      const height = sprites[state].height * size;
      const hitBox = new HitBox({
        type: 'rectangle',
        centerX: x + width * 0.5,
        centerY: y + height * 0.48,
        width: width * 0.1,
        height: height * 0.19
      });
      staticItems.heroes.soldier = new Item({ sprites, state, logic, x, y, size, speed, angle, hitBox });
    }
    setStaticSoldier();
  }
  setStaticHeroes();

  function setStaticEnemies() {
    function setStaticBat() {
      const sprites = {
        idle: new Sprite({ src: './images/enemies/bat/idle.png', width: 64, height: 64, startX: 0, endX: 3, startY: 0, endY: 0, rate: 15 })
      }
      const state = 'idle';
      const logic = logics.hero.move;
      const x = 0;
      const y = 0;
      const size = 6;
      const speed = 1;
      const angle = 0;
      const width = sprites[state].width * size;
      const height = sprites[state].height * size;
      const hitBox = new HitBox({
        type: 'rectangle',
        centerX: x + width * 0.45,
        centerY: y + height * 0.5,
        width: width * 0.15,
        height: height * 0.25
      });
      staticItems.enemies.bat = new Item({ sprites, state, logic, x, y, size, speed, angle, hitBox });
    }
    setStaticBat();
  }
  setStaticEnemies();
}

const dynamicItems = {};


function setDynamicItems() {
  
  const soldier = staticItems.heroes.soldier.clone();
  soldier.moveCenterTo({ x: screen.width * 0.15, y: screen.height * 0.5 });
  dynamicItems.soldier = soldier;

  const bat = staticItems.enemies.bat.clone();
  bat.moveCenterTo({ x: screen.width * 0.8, y: screen.height * 0.5 });
  dynamicItems.bat = bat;

}


function animate() {
  screen.clear();

  Object.values(dynamicItems).forEach(item => item.animate(screen));

  setTimeout(() => {
    requestAnimationFrame(animate);
  }, 1000 / GAME_FRAME);
}



function gameStart() {
  setStaticItems();  // 加载静态实例
  setDynamicItems();  // 加载动态实例
  animate();  // 启动动画
  test();
}
gameStart();




function test() {
  // let heroMaxHealth = 50, enemyMaxHealth = 50;
  // let heroHealth = heroMaxHealth, enemyHealth = enemyMaxHealth;
  
  // const heroHealthText = document.querySelector('.combat-info .health');
  // heroHealthText.innerHTML = `${heroHealth} / ${heroMaxHealth}`;
  // const enemyHealthText = document.querySelector('.combat-info .enemy-health');
  // enemyHealthText.innerHTML = `${enemyHealth} / ${enemyMaxHealth}`;

  const app = new Vue({
    el: '#app',
    data: {
      place: '森林',
      weapon: '无',
      enemyName: '蝙蝠',
      heroHP: 50,
      heroMaxHP:50,
      enemyHP: 50,
      enemyMaxHP: 50
    },
    methods: {
      attack: function() {
        if (!dynamicItems.soldier.switchState('attack')) return;
        this.enemyHP -= 1;
      }
    }
  });

  setInterval(function() {
    dynamicItems.soldier.switchState('hurt');
    // app.data.heroHP -= 1;
    app.heroHP -= 1;
    console.log(app.heroHP);
  }, 2000);
  
}


