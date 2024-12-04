import Phaser from 'phaser'
//import {matrixFill2} from '../Utils/DrawMatrixCircle' 
//import {matrixFill2} from '../Utils/DrawMatrixRose' 
//import {matrixFill2} from '../Utils/DrawMatrixStar' 
import { matrixFill2 } from '../Utils/DrawMatrixBuho'
import { RestartButton } from '../../Button/restart-button.js';
import { scaleImage, wrapResizeFn } from '../Utils/Resize';

class PuzzleScene extends Phaser.Scene {
    constructor() {
        super('Game');
        this.restartButton = new RestartButton(this);
        this.score = 0; // variable para obtener el puntaje
    }
    init(data) {
        this.score = 0
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
        this.load.image('puzzlescenebk', '/Assets/GameScenes/PuzzleSbkEnBlanco.png')
        console.log("paso de cuenta abajo 1 " + this.countDown)
        this.load.image('red', '/Assets/New/1.png')
        this.load.image('blue', '/Assets/New/8.png')
        this.load.image('green', '/Assets/New/4.png')
        this.load.image('border', '/Assets/New/Borde.png')
        this.load.image('darkBlue', '/Assets/New/7.png')
        this.load.image('lightGreen', '/Assets/New/5.png')
        this.load.image('pink', '/Assets/New/12.png')
        this.load.image('yellow', '/Assets/New/3.png')
        this.load.image('orange', '/Assets/New/2.png')
        this.load.image('black', '/Assets/New/0.png')
        this.load.image('brown', '/Assets/New/17.png')
        this.load.image('transparente', '/Assets/New/Transparente.png')


        //Cubos
        this.load.image('redC', '/Assets/Cubos/1.png')
        this.load.image('blueC', '/Assets/Cubos/8.png')
        this.load.image('greenC', '/Assets/Cubos/4.png')
        this.load.image('borderC', '/Assets/Cubos/Borde.png')
        this.load.image('darkBlueC', '/Assets/Cubos/7.png')
        this.load.image('lightGreenC', '/Assets/Cubos/5.png')
        this.load.image('pinkC', '/Assets/Cubos/12.png')
        this.load.image('yellowC', '/Assets/Cubos/3.png')
        this.load.image('blackC', '/Assets/Cubos/0.png')
        this.load.image('orangeC', '/Assets/Cubos/2.png')
        this.load.image('brownC', '/Assets/Cubos/17.png')

    }
    create() {
        this.correctCount = 0;
        const puzzlePage = this.add.image(0, 0, 'puzzlescenebk').setOrigin(0, 0);
        puzzlePage.displayWidth = this.sys.canvas.width;
        puzzlePage.displayHeight = this.sys.canvas.height;
        this.text = this.add.text(0, 0,
            "Complete la figura seleccionando\nlos colores deseados", {
            color: '#000000',

        });
        this.restartButton = this.add.image(this.scale.width - 115, this.scale.height - 60, 'terminarButton');
        this.restartButton.setInteractive();


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
        this.selectedColor = "orange";
        this.selectedColor = "black";
        this.selectedColor = "brown";
        this.selectedColor = "trasnparente";

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
        // Tamaño fijo para cada cubo (independiente de la resolución)
        const cubeSize = Math.min(width, height) / 9;  // Tamaño mínimo para evitar distorsión en pantallas grandes

        // Ajuste de márgenes y espacio entre elementos
        const xOffset = width *0.5;
        const yOffset = height / 10;
        const horizontalSpacing = width *0.025;
        const verticalSpacing = height* 0.05;

        const { text, imges, redButton, yellowButton, greenButton, lightGreenButton, darkBlueButton, blueButton, pinkButton, blackButton, orangeButton, brownButton, restartButton } = this;

        // Ajustar texto
        text.setFontSize(`${height / 20}px`); // Ajuste del tamaño de texto proporcional a la altura
        text.setPosition(width / 20, height * 0.02);
        text.setWordWrapWidth(width * 0.8);

        // Ajustar imágenes de los cubos
        imges.forEach((row, rowIndex) => {
            row.forEach((img, colIndex) => {
                img.resize(cubeSize, cubeSize, 40, 1.0);  // Tamaño uniforme para los cubos
                img.setPosition(
                    xOffset + colIndex * horizontalSpacing,
                    yOffset + rowIndex * verticalSpacing
                );
            });
        });

        // Función para configurar botones con márgenes consistentes
        const configureButton = (button, xPositionFactor, yPositionFactor) => {
            const buttonWidth = width / 8;
            const buttonHeight = height / 10;
            button.setPosition(width * xPositionFactor, height * yPositionFactor);
            scaleImage(button, buttonWidth, buttonHeight, 100, 2);
        };

        // Configuración de botones con posiciones fijas
        configureButton(redButton, 1 / 7, 0.2);
        configureButton(yellowButton, 1 / 3.8, 0.2);
        configureButton(greenButton, 1 / 7, 0.38);
        configureButton(darkBlueButton, 1 / 3.8, 0.38);
        configureButton(orangeButton, 1 / 7, 0.56);
        configureButton(pinkButton, 1 / 3.8, 0.56);
        configureButton(blueButton, 1 / 7, 0.74);
        configureButton(brownButton, 1 / 3.8, 0.74);
        configureButton(blackButton, 1 / 7, 0.92);
        configureButton(lightGreenButton, 1 / 3.8, 0.92);

        // Ajustar botón de reinicio
        scaleImage(restartButton, width / 5, height / 5, 100, 2.3);
    }




}

export default PuzzleScene;