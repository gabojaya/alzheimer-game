import Phaser from 'phaser'
import {matrixFill2} from '../Utils/DrawMatrix'
import { scaleImage, wrapResizeFn }  from '../Utils/Resize';


export default class PuzzleScene extends Phaser.Scene {
    constructor() {
        super('bootGame');
    }
    init(data) {
        this.state = data.state;
        this.state2 = data.state2;
        this.UserTime = data.time;
        if (this.UserTime === undefined) {
            this.UserTime = 0
        }
        this.countDown = data.countDown;
        if (this.countDown === undefined) {
            this.countDown = 600
        }
        console.log(this.game.data)
    }
    preload() {
        console.log("paso de cuenta abajo 1 " + this.countDown)
        this.load.image('red', '/Assets/New/1.png')
        this.load.image('blue', '/Assets/New/8.png')
        this.load.image('green', '/Assets/New/4.png')
        this.load.image('white', '/Assets/New/13.png')
        this.load.image('border','/Assets/New/Default.png')
        //this.load.image("background", "../")

    }
    create() {
        this.text = this.add.text(0, 0,
            "Complete la figura seleccionando los colores deseados", {
            color: '#204659',
            align: 'justify',
        });
        
        // Variable que guarda el color seleccionado
        this.selectedColor = "red";

        // Configurar los botones para actualizar `selectedColor`
        this.redButton = this.add.image(0, 0, 'red').setInteractive({ useHandCursor: true });
        this.greenButton = this.add.image(0, 0, 'green').setInteractive({ useHandCursor: true });
        this.whiteButton = this.add.image(0, 0, 'white').setInteractive({ useHandCursor: true });
        this.blueButton = this.add.image(0, 0, 'blue').setInteractive({ useHandCursor: true });

        this.redButton.on('pointerdown', () => this.selectedColor = "red");
        this.greenButton.on('pointerdown', () => this.selectedColor = "green");
        this.whiteButton.on('pointerdown', () => this.selectedColor = "white");
        this.blueButton.on('pointerdown', () => this.selectedColor = "blue");
        matrixFill2(this)

        //Resize
        wrapResizeFn(this);
            
    }
    //Funcion de resize a landscape de la scena
    resizeLandscape(width, height) {
        const halfWidth = width / 11.5;
        const xOffset= width/3;
        const halfHeight = height / 5;
        const yOffSet= height/4

        const { text, imges,redButton,greenButton,whiteButton,blueButton } = this;
        text.setFontSize(`${halfHeight * 0.15}px`);
        for (var j = 0; j < imges.length; j++) {
            imges[j].forEach(img => img.resize(width * 0.06, height * 0.15, 50, 2))//ajusta el tamano de los bloques
            // eslint-disable-next-line 
            imges[j].forEach((img, index) => img.setPosition(xOffset+ halfWidth * 0.75 * (index + 1), yOffSet+(halfHeight/1.65 * (j + 1.5))))//ajustar en funcion de la posicion...
        }

        text.setPosition(width / 3.5, height * 0.03);
        text.setWordWrapWidth(width * 0.8);


        redButton.setPosition(width / 2.2, height * 0.12);
        scaleImage(redButton, width / 8, height / 2, 100, 0.4)

        greenButton.setPosition(width / 2.1, height * 0.12);
        scaleImage(greenButton, width / 8, height / 2, 100, 0.4)

        whiteButton.setPosition(width / 2, height * 0.12);
        scaleImage(whiteButton, width / 8, height / 2, 100, 0.4)


        blueButton.setPosition(width / 2.3, height * 0.12);
        scaleImage(blueButton, width / 8, height / 2, 100, 0.4)


        

    }
  


}