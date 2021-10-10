import { Types } from 'ecsy';
import 'phaser';

// Import stylesheets
import './style.css';
import * as AssetsData from './assets';
// import { Types } from 'phaser';
// import type { Types as PhaserTypes } from 'phaser';

const SCREEN_WIDTH = window.innerWidth;
const SCREEN_HEIGHT = window.innerHeight;

// Write TypeScript code!
const appRoot = document.getElementById('app');
const canvas = document.createElement('canvas');
appRoot.appendChild(canvas);

// type SchemeTypes = NumberPropType |  ;

const PointScheme = {
  x: Types.Number,
  y: Types.Number,
};

export default class Demo extends Phaser.Scene {
  constructor() {
    super('demo');
  }

  preload() {
    const { images, glsl } = AssetsData;
    
    console.log({ images, glsl, location });

    const hostName = location.hostname;

    images &&
      Object.entries(images).forEach(([name, path]) => {
        this.load.image(name, hostName + path);
      });

    glsl &&
      Object.entries(glsl).forEach(([name, path]) => {
        this.load.glsl(name, hostName + path);
      });
  }

  create() {
    this.add
      .shader('RGB Shift Field', 0, 0, SCREEN_WIDTH, SCREEN_HEIGHT)
      .setOrigin(0);

    const logo = this.add.image(SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2, 'logo');

    this.tweens.add({
      targets: logo,
      y: 10,
      duration: 1500,
      ease: 'Sine.inOut',
      yoyo: true,
      repeat: -1,
    });
  }
}

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.WEBGL,
  canvas: canvas,
  backgroundColor: '#125555',
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
  scene: Demo,
};

const game = new Phaser.Game(config);
