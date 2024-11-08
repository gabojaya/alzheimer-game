import Phaser from 'phaser';
import { RestartButton } from '../../Button/restart-button.js';

class SummaryScene extends Phaser.Scene{
    constructor(){
        super({key: 'SummaryScene'});
        this.restartButton = new RestartButton(this);
    }
    preload(){
        this.load.image('summarypage', '/Assets/GameScenes/SummaryScene.png');
        this.load.image('restartButton', '/Assets/Button/Restart.png');
        this.load.image('salirButton', '/Assets/Button/salir.png');

    }
    create(){
        const summaryPage = this.add.image(0, 0, 'summarypage').setOrigin(0, 0);
        summaryPage.displayWidth = this.sys.canvas.width;
        summaryPage.displayHeight = this.sys.canvas.height;
        this.restartButton = this.add.image(this.scale.width/2 + 199, this.scale.height - 125, 'restartButton');
        this.restartButton.setInteractive();
        this.restartButton.on('pointerdown', () => {
            this.scene.start('Game');
        });
        this.restartButton = this.add.image(this.scale.width/2 - 199, this.scale.height - 125, 'salirButton');
        this.restartButton.setInteractive();
        this.restartButton.on('pointerdown', () => {
            this.scene.start('StartScene');
        });
    }
}

export default SummaryScene;