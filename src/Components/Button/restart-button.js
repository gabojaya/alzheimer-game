export class RestartButton {

    constructor(scene) {             
        this.relatedScene = scene;
    }

    preload () {
        this.relatedScene.load.spritesheet('button', '/Assets/Button/Button.png', { frameWidth: 270, frameHeight: 122 });	
    }

    create () {
        const {width, height} = this.relatedScene.sys.game.canvas;

        this.startButton = this.relatedScene.add.sprite(width/2, height - 150, 'button').setInteractive();

        this.startButton.on('pointerover', () => {
            this.startButton.setFrame(1);
        });
        this.startButton.on('pointerout', () => {
            this.startButton.setFrame(0);
        });
        this.startButton.on('pointerdown', () => {
            this.relatedScene.scene.start('Game');
        });
    }
}