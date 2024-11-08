import Phaser from 'phaser'
import {matrixFill2} from '../Utils/DrawMatrixCircle' // Circulo
//import {matrixFill2} from '../Utils/DrawMatrixRose' // Flor
//import {matrixFill2} from '../Utils/DrawMatrixStar' // Estrella
import { scaleImage, wrapResizeFn }  from '../Utils/Resize';
import { RestartButton } from '../../Button/restart-button.js';


 class PuzzleScene extends Phaser.Scene {
    constructor() {
        super('Game');
        this.restartButton = new RestartButton(this);
        this.score = 0; // variable para obtener el puntaje
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
        this.load.image('terminarButton', '/Assets/Button/terminar.png');
        this.load.image('puzzlescenebk', '/Assets/GameScenes/PuzzleSbk.png')
        console.log("paso de cuenta abajo 1 " + this.countDown)
        this.load.image('red', '/Assets/New/1.png')
        this.load.image('blue', '/Assets/New/8.png')
        this.load.image('green', '/Assets/New/4.png')
        this.load.image('white', '/Assets/New/13.png')
        this.load.image('border','/Assets/New/Borde.png')
        this.load.image('darkBlue', '/Assets/New/7.png')
        this.load.image('lightGreen', '/Assets/New/5.png')
        this.load.image('pink', '/Assets/New/12.png')
        this.load.image('yellow', '/Assets/New/3.png')
        this.load.image('orange', '/Assets/New/2.png')
        this.load.image('black','/Assets/New/0.png')
        this.load.image('brown','/Assets/New/17.png')
        this.load.image('transparente', '/Assets/New/Transparente.png')


        //Cubos
        this.load.image('redC', '/Assets/Cubos/1.png')
        this.load.image('blueC', '/Assets/Cubos/8.png')
        this.load.image('greenC', '/Assets/Cubos/4.png')
        this.load.image('whiteC', '/Assets/Cubos/13.png')
        this.load.image('borderC','/Assets/Cubos/Borde.png')

        this.load.image('darkBlueC', '/Assets/Cubos/7.png')
        this.load.image('lightGreenC', '/Assets/Cubos/5.png')
        this.load.image('pinkC', '/Assets/Cubos/12.png')
        this.load.image('yellowC', '/Assets/Cubos/3.png')
        this.load.image('blackC', '/Assets/Cubos/0.png')
        this.load.image('orangeC', '/Assets/Cubos/2.png')
        this.load.image('brownC', '/Assets/Cubos/17.png')
        this.load.image('whiteC', '/Assets/Cubos/13.png')



    }
    create() {
        this.correctCount = 0;
        const puzzlePage = this.add.image(0, 0, 'puzzlescenebk').setOrigin(0, 0);
        puzzlePage.displayWidth = this.sys.canvas.width;
        puzzlePage.displayHeight = this.sys.canvas.height;
        this.text = this.add.text(0, 0,
            "Complete la figura seleccionando los colores deseados", {
            color: '#204659',
            align: 'justify',
        });
        this.restartButton = this.add.image(this.scale.width - 125, this.scale.height - 150, 'terminarButton');
        this.restartButton.setInteractive();
        this.restartButton.on('pointerdown', () => {
            this.scene.start('SummaryScene');
        });

        // Configura el botón "terminar" para que verifique el progreso y cambie de escena
        this.restartButton.on('pointerdown', () => {
        this.checkCompletion();
        });
        
        // Variable que guarda el color seleccionado
        this.selectedColor = "red";
        this.selectedColor = "yellow";
        this.selectedColor = "green";
        this.selectedColor = "lightGreen";
        this.selectedColor = "darkBlue";
        this.selectedColor = "blue";
        this.selectedColor = "pink";
        this.selectedColor = "trasnparente";
        this.selectedColor = "orange";
        this.selectedColor = "black";
        this.selectedColor = "brown";
        this.selectedColor = "white";

        // Configurar los botones para actualizar `selectedColor`

        this.redButton = this.add.image(0, 0, 'redC').setInteractive({ useHandCursor: true });
        this.yellowButton = this.add.image(0, 0, 'yellowC').setInteractive({ useHandCursor: true });
        this.greenButton = this.add.image(0, 0, 'greenC').setInteractive({ useHandCursor: true });
        this.lightGreenButton = this.add.image(0, 0, 'lightGreenC').setInteractive({ useHandCursor: true });
        this.darkBlueButton = this.add.image(0, 0, 'darkBlueC').setInteractive({ useHandCursor: true });
        this.blueButton = this.add.image(0, 0, 'blueC').setInteractive({ useHandCursor: true });
        this.pinkButton = this.add.image(0, 0, 'pinkC').setInteractive({ useHandCursor: true });

        this.blackButton = this.add.image(0, 0, 'blackC').setInteractive({ useHandCursor: true });
        this.orangeButton = this.add.image(0, 0, 'orangeC').setInteractive({ useHandCursor: true });
        this.brownButton = this.add.image(0, 0, 'brownC').setInteractive({ useHandCursor: true });
        this.whiteButton = this.add.image(0, 0, 'whiteC').setInteractive({ useHandCursor: true });


        this.redButton.on('pointerdown', () => this.selectedColor = "red");
        this.yellowButton.on('pointerdown', () => this.selectedColor = "yellow");
        this.greenButton.on('pointerdown', () => this.selectedColor = "green");
        this.lightGreenButton.on('pointerdown', () => this.selectedColor = "lightGreen");
        this.darkBlueButton.on('pointerdown', () => this.selectedColor = "darkBlue");
        this.blueButton.on('pointerdown', () => this.selectedColor = "blue");
        this.pinkButton.on('pointerdown', () => this.selectedColor = "pink");
        this.blackButton.on('pointerdown', () => this.selectedColor = "black");
        this.orangeButton.on('pointerdown', () => this.selectedColor = "orange");
        this.brownButton.on('pointerdown', () => this.selectedColor = "brown");
        this.whiteButton.on('pointerdown', () => this.selectedColor = "white");
        matrixFill2(this)

        //Resize
        wrapResizeFn(this);
            
    }

    checkCompletion() {
        this.score = 0; // Asegura que el puntaje esté en 0 al inicio de la verificación
    
        this.imges.forEach((row) => {
            row.forEach((square) => {
                if (square.isEditable && square.getIsCorrectSelected()) {
                    this.score++; // Incrementa el puntaje solo si el cuadro es correcto
                }
            });
        });
    
        // Cambia a SummaryScene y asegura que el puntaje sea 0 si no hay aciertos
        this.scene.start('SummaryScene', {
            score: this.score || 0, // Usa 0 si `this.score` está `undefined`
        });
    }
    
    //Funcion de resize a landscape de la scena
    resizeLandscape(width, height) {
        const halfWidth = width / 11.5;
        const xOffset= width/10;
        const halfHeight = height / 5;
        const yOffSet= height/6

        const { text, imges,redButton,yellowButton,greenButton,lightGreenButton,darkBlueButton,blueButton, pinkButton, blackButton, orangeButton, brownButton, whiteButton } = this;
        text.setFontSize(`${halfHeight * 0.15}px`);
        for (var j = 0; j < imges.length; j++) {
            imges[j].forEach(img => img.resize(width * 0.08, height * 0.08, 34, 1.00))//ajusta el tamano de los bloques
            // eslint-disable-next-line 
            //                                                                    0.27     
            imges[j].forEach((img, index) => img.setPosition(xOffset+ halfWidth * 0.255 * (index + 10), yOffSet+(halfHeight/4 * (j + 2))))//ajustar en funcion de la posicion...
        }

        text.setPosition(width / 3.5, height * 0.03);
        text.setWordWrapWidth(width * 0.8);


        //seleccion del objeto cuadro
        redButton.setPosition(width / 5, height * 0.15);
        scaleImage(redButton, width / 8, height / 2, 100,1.5)


        yellowButton.setPosition(width / 3.85, height * 0.15);
        scaleImage(yellowButton, width / 8, height / 2, 100, 1.5)

        greenButton.setPosition(width / 3.12, height * 0.15);
        scaleImage(greenButton, width / 8, height / 2, 100, 1.5)

        lightGreenButton.setPosition(width / 2.62, height * 0.15);
        scaleImage(lightGreenButton, width / 8, height / 2, 100, 1.5)

        darkBlueButton.setPosition(width / 2.25, height * 0.15);
        scaleImage(darkBlueButton, width / 8, height / 2, 100, 1.5)

        blueButton.setPosition(width / 1.98, height * 0.15);
        scaleImage(blueButton, width / 8, height / 2, 100, 1.5)

        pinkButton.setPosition(width / 1.76, height * 0.15);
        scaleImage(pinkButton, width / 8, height / 2, 100, 1.5)

        blackButton.setPosition(width / 1.585, height * 0.15);
        scaleImage(blackButton, width / 8, height / 2, 100, 1.5)

        orangeButton.setPosition(width / 1.44, height * 0.15);
        scaleImage(orangeButton, width / 8, height / 2, 100, 1.5)

        brownButton.setPosition(width / 1.32, height * 0.15);
        scaleImage(brownButton, width / 8, height / 2, 100, 1.5)

        whiteButton.setPosition(width / 1.22, height * 0.15);
        scaleImage(whiteButton, width / 8, height / 2, 100, 1.5)




    }
}

export default PuzzleScene;