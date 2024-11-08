import Phaser from 'phaser';
import { scaleImage } from '../Utils/Resize';

export default class SquareElement extends Phaser.GameObjects.Container {
    constructor(scene, x, y, image, isEditable, imgSelected, trueValue) {
        super(scene, x, y);

        // Imagen inicial y colores internos
        this.image = new Phaser.GameObjects.Image(scene, x, y, image).setOrigin(0.5, 0.5);
        this.trueValue = trueValue; // Valor correcto que debe coincidir con el color
        this.isEditable = isEditable;
        this.memorySelection = null; // Color seleccionado actual
        this.isCorrect = null; // Estado de si es correcto o no

        // Añade imágenes de colores como opciones (inicialmente invisibles)
        this.colors = {
            red: this.createColorImage(scene, x, y, 'red'),
            yellow: this.createColorImage(scene, x, y, 'yellow'),
            green: this.createColorImage(scene, x, y, 'green'),
            lightGreen: this.createColorImage(scene, x, y, 'lightGreen'),
            darkBlue: this.createColorImage(scene, x, y, 'darkBlue'),
            blue: this.createColorImage(scene, x, y, 'blue'),
            pink: this.createColorImage(scene, x, y, 'pink'),
            black: this.createColorImage(scene, x, y, 'black'),
            orange: this.createColorImage(scene, x, y, 'orange'),
        };

        // Configuración de interactividad si es editable
        if (this.isEditable) {
            this.image.setInteractive({ useHandCursor: true }).on('pointerdown', () => {
                this.setSpriteActive(scene.selectedColor);
            });
        }
        

        // Agrega elementos a la escena
        this.add([this.image, ...Object.values(this.colors)]);
        scene.add.existing(this);
    }

    // Función para crear las imágenes de colores
    createColorImage(scene, x, y, color) {
        return new Phaser.GameObjects.Image(scene, x, y, color)
            .setOrigin(0.5, 0.5)
            .setVisible(false)
            .setScale(0.925);
    }

    // Función para verificar si el color seleccionado es el correcto
    getIsCorrectSelected() {
        return this.isEditable && this.memorySelection === this.trueValue;
    }

    // Cambia el color del cuadro según la selección
    setSpriteActive(imgSelected) {
        this.memorySelection = imgSelected;
        for (const color in this.colors) {
            this.colors[color].setVisible(color === imgSelected);
        }
    }

    // Redimensiona el cuadro y sus colores al cambiar el tamaño de pantalla
    resize(availableSpaceWidth, availableSpaceHeight, padding, scaleMultiplier) {
        scaleImage(this.image, availableSpaceWidth, availableSpaceHeight, padding, scaleMultiplier);
        Object.values(this.colors).forEach((colorImage) => {
            colorImage.setScale(this.image.scale);
        });
    }
}
