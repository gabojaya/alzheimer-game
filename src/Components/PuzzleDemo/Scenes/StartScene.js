import Phaser from 'phaser';
import { RestartButton } from '../../Button/restart-button.js';
class StartScene extends Phaser.Scene {
    constructor() {
        super({ key: 'StartScene' });
        this.restartButton = new RestartButton(this);
    }

    preload() {
        this.load.image('startpage', '/Assets/GameScenes/StartPage.png');
        this.load.image('startButton', '/Assets/Button/button.png');
        this.restartButton.preload();
    }

    create() {
        const startPage = this.add.image(0, 0, 'startpage').setOrigin(0, 0);
        startPage.displayWidth = this.sys.canvas.width;
        startPage.displayHeight = this.sys.canvas.height;
        this.restartButton.create();
    }
}

export default StartScene;