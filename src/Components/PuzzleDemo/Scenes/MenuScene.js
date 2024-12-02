import Phaser from 'phaser';

class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MenuScene' });
  }

  preload() {
    // Cargar imágenes de los niveles (asegúrate de tener las imágenes en tu carpeta de assets)
    this.load.image('nivel1', 'Assets/GameScenes/matriz_buho.png');
    this.load.image('nivel2', 'Assets/GameScenes/matriz_estrella.png');
    this.load.image('nivel3', 'Assets/GameScenes/matriz_rosa.png');
    this.load.image('nivel4', 'Assets/GameScenes/matriz_circulo.png');
    this.load.image('background', '/Assets/GameScenes/PuzzleSbkEnBlanco.png');
  }

  create() {

    this.add.image(0, 0, 'background').setOrigin(0, 0).setScale(1).setDisplaySize(this.cameras.main.width, this.cameras.main.height);
    // Título de la escena
    this.add.text(600, 50, 'Selecciona un Nivel', { fontSize: '32px', fill: '#fff' }).setOrigin(0.5);

    // Crear las imágenes de vista previa de los niveles
    const levels = [
        //Buho
      { key: 'nivel1', x: 730, y: 200, text: 'Buho' },
      //Estrella
      { key: 'nivel2', x: 730, y: 660, text: 'Estrella' },
        //Rosa
      { key: 'nivel3', x: 1150, y: 200, text: 'Rosa' },
        //Circulo
      { key: 'nivel4', x: 1150, y: 660, text: 'Circulo' }
    ];

    // Mostrar las imágenes y los botones de cada nivel
    levels.forEach((level, index) => {
      // Mostrar imagen de vista previa del nivel y ajustar su tamaño
      const image = this.add.image(level.x, level.y, level.key);
      image.setScale(0.6);  // Ajusta el valor de escala según sea necesario (0.3 reduce el tamaño al 30%)

      // Crear el botón con estilo similar al de LoginScene
      const button = this.add.text(level.x, level.y + 220, `Seleccionar ${level.text}`, {
        fontSize: '20px',
        color: '#fff',
        backgroundColor: '#007BFF',
        padding: { x: 20, y: 10 },
        borderRadius: 8
      })
        .setOrigin(0.5)
        .setInteractive();

      // Efecto al pasar el ratón sobre el botón
      button.on('pointerover', () => {
        button.setStyle({ backgroundColor: '#0056b3' }); // Azul más oscuro al pasar el ratón
      });

      button.on('pointerout', () => {
        button.setStyle({ backgroundColor: '#007BFF' }); // Vuelve al color original
      });

      // Acción al hacer clic en el botón
      button.on('pointerdown', () => {
        console.log(`Seleccionaste el ${level.text}`);
        // Redirigir a la escena correspondiente y pasar el nombre de la función que genera la matriz
        this.scene.start('Game');
      });
    });
  }
}

// Crear la escena de Phaser y la configuración básica del juego
const config = {
  type: Phaser.AUTO,
  width: 1200,
  height: 600,
  scene: [MenuScene],  // Escena del menú
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false
    }
  }
};


export default MenuScene;
