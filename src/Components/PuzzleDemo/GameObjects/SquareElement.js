import Phaser from 'phaser';
import { scaleImage } from '../Utils/Resize';
export default class SquareElement extends Phaser.GameObjects.Container {


    constructor(scene, x, y, image, isEditable, imgSelected, trueValue) {
        super(scene, x, y)

        //Inicializacion Imagen inicial
        this.image = null

        //Colores Asset interno
        this.red=null
        this.green=null
        this.white=null
        this.blue=null

        //es interactuable el cuadrado?
        this.isEditable = isEditable
        
        //Que opción esta activa
        this.imgSelected = imgSelected //Debe ser una variable global de la escena
        
        
        //Variables para detectar que esta correcto
        this.memorySelection=null
        this.isCorrect = null
        this.trueValue= trueValue
        
        this.scene = scene
        this.generated(scene, x, y, image)

    }
    
    generated(scene, x, y, image) {
        this.image = new Phaser.GameObjects.Image(scene, x, y, image)
        //Valores de escala hay que ajustar en función del sprite
        this.red = new Phaser.GameObjects.Image(scene, x, y, 'red').setOrigin(0.5, 0.5).setVisible(false).setScale(0.925)
        this.green = new Phaser.GameObjects.Image(scene, x, y, 'green').setOrigin(0.5, 0.5).setVisible(false).setScale(0.925)
        this.white = new Phaser.GameObjects.Image(scene, x, y, 'white').setOrigin(0.5, 0.5).setVisible(false).setScale(0.925)
        this.blue = new Phaser.GameObjects.Image(scene, x, y, 'blue').setOrigin(0.5, 0.5).setVisible(false).setScale(0.925)
        if(this.isEditable){
            this.image.setInteractive({ useHandCursor: true }).on('pointerdown', () => {
                this.setSpriteActive(this.scene.selectedColor)
                
            }).on('pointerover', () => {
                scene.tweens.add({
                    targets: this,
                    scale: 1.1,
                    ease: 'Power3',
                    duration: 150,
                    delay: 0,
                    repeat: 0,
                });
            }).on('pointerout', () => {
                scene.tweens.add({
                    targets: this,
                    scale: 1,
                    ease: 'Power3',
                    duration: 150,
                    delay: 0,
                    repeat: 0,
                });
    
            })
        }
        
        this.add([this.image, this.red, this.green, this.white, this.blue]);

        // Añadir `SquareElement` a la escena
        scene.add.existing(this);


    }
    resize(availableSpaceWidth, availableSpaceHeight, padding, scaleMultiplier) {
        scaleImage(this.image, availableSpaceWidth, availableSpaceHeight, padding, scaleMultiplier);
        this.red.setScale(this.image.scale)
        this.green.setScale(this.image.scale)
        this.white.setScale(this.image.scale)
        this.blue.setScale(this.image.scale)
    }
    getIsCorrectSelected() {
        if (this.isEditable && (this.memorySelection === this.trueValue)) {
            return true
        }
        else {
            return false
        }
    }
    setSpriteActive(imgSelected){
        this.memorySelection = imgSelected
        switch (imgSelected) {
            case "red":
                this.red.setVisible(true);
                this.green.setVisible(false);
                this.white.setVisible(false);
                this.blue.setVisible(false);
                break;
            case "green":
                this.red.setVisible(false);
                this.green.setVisible(true);
                this.white.setVisible(false);
                this.blue.setVisible(false);
                break;
            case "white":
                this.red.setVisible(false);
                this.green.setVisible(false);
                this.white.setVisible(true);
                this.blue.setVisible(false);
                break;
            case "blue":
                this.red.setVisible(false);
                this.green.setVisible(false);
                this.white.setVisible(false);
                this.blue.setVisible(true);
                break;
            default:
                console.log("Color no reconocido.");
                break;
        }
    }
}