import Phaser from 'phaser'
//import {matrixFill2} from '../Utils/DrawMatrixCircle' 
//import {matrixFill2} from '../Utils/DrawMatrixRose' 
//import {matrixFill2} from '../Utils/DrawMatrixStar' 
import {matrixFill2} from '../Utils/DrawMatrixBuho' 
import { RestartButton } from '../../Button/restart-button.js';
import { scaleImage, wrapResizeFn }  from '../Utils/Resize';

 class PuzzleScene extends Phaser.Scene {
    constructor() {
        super('Game');
        this.restartButton = new RestartButton(this);
        this.score = 0; // variable para obtener el puntaje
    }
    init(data) {
        document.body.style.zoom = "80%"; 
        
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
        this.load.image('borderC','/Assets/Cubos/Borde.png')
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
        // Tamaño dinámico para los cubos basado en el ancho y alto de la pantalla
        document.body.style.zoom = "100%";  // Establece el zoom a 100%
        const cubeSize = Math.min(width, height) * 0.11; // Tamaño relativo
        const horizontalSpacing = cubeSize * 0.5833; // Espaciado horizontal dinámico
        const verticalSpacing = cubeSize * 0.5833; // Espaciado vertical dinámico
        const xOffset = (width - horizontalSpacing * (this.imges[0].length - 1)) / 1.5; // Centrar los cubos
        const yOffset = height * 0.1; // Margen superior dinámico
    
        const { imges, restartButton, redButton, yellowButton, greenButton, lightGreenButton, darkBlueButton, blueButton, pinkButton, blackButton, orangeButton, brownButton } = this;
    
        // Ajustar posiciones y tamaño de los cubos
        imges.forEach((row, rowIndex) => {
            row.forEach((cube, colIndex) => {
                cube.resize(cubeSize, cubeSize, 0, 0.6); // Ajustar escala
                cube.setPosition(
                    xOffset + colIndex * horizontalSpacing,
                    yOffset + rowIndex * verticalSpacing
                );
            });
        });
    
        // Función para configurar botones con márgenes consistentes
        const configureButton = (button, xFactor, yFactor) => {
            const buttonWidth = cubeSize * 1.5; // Escala proporcional a los cubos
            const buttonHeight = cubeSize * 1.5;
            button.setPosition(width * xFactor, height * yFactor);
            scaleImage(button, buttonWidth, buttonHeight, 10, 1); // Ajustar tamaño del botón
        };
    
        // Posicionar los botones de colores de forma dinámica
        configureButton(redButton, 0.1, 0.2);
        configureButton(yellowButton, 0.2, 0.2);
        configureButton(greenButton, 0.1, 0.35);
        configureButton(lightGreenButton, 0.2, 0.35);
        configureButton(darkBlueButton, 0.1, 0.5);
        configureButton(blueButton, 0.2, 0.5);
        configureButton(pinkButton, 0.1, 0.65);
        configureButton(orangeButton, 0.2, 0.65);
        configureButton(blackButton, 0.1, 0.8);
        configureButton(brownButton, 0.2, 0.8);
    
        // Ajustar el botón "terminar"
        scaleImage(restartButton, cubeSize * 2, cubeSize * 2, 20, 1); // Escala proporcional
        restartButton.setPosition(width - (cubeSize * 2), height - (cubeSize * 2));
    }
    




}

export default PuzzleScene;