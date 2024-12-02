import Phaser from 'phaser';

class LoginScene extends Phaser.Scene {
    constructor() {
        super({ key: 'LoginScene' });
    }

    preload() {
        // Cargar la imagen de fondo
        this.load.image('background', 'Assets/fondos/fondo-login.jpg'); // Cambia la ruta a la de tu imagen
    }

    create() {
        // Agregar la imagen de fondo y hacerla ocupar toda la pantalla
        this.add.image(0, 0, 'background').setOrigin(0, 0).setScale(1); // Ajusta el tamaño si es necesario

        // Agregar título de la escena de login
        this.add.text(100, 50, "Iniciar sesión", { fontSize: '32px', fill: '#fff', fontFamily: 'Arial' });

        // Crear los elementos del formulario de inicio de sesión
        this.createLoginForm();

        // Mensaje de error o éxito
        this.messageText = this.add.text(670, 660, '', { fontSize: '23px', fill: '#FF0000' }); // Establece la posición debajo de la contraseña
    }

    createLoginForm() {
        // Crear el campo de entrada de nombre de usuario
        this.usernameInput = document.createElement('input');
        this.usernameInput.style.position = 'absolute';
        this.usernameInput.style.left = '50%';
        this.usernameInput.style.top = '380px';
        this.usernameInput.style.transform = 'translateX(-50%)'; // Centra el campo de entrada
        this.usernameInput.style.width = '250px';
        this.usernameInput.style.height = '40px';
        this.usernameInput.style.fontSize = '18px';
        this.usernameInput.style.padding = '10px';
        this.usernameInput.style.borderRadius = '8px';
        this.usernameInput.style.border = '2px solid #ddd';
        this.usernameInput.style.boxShadow = '0px 2px 6px rgba(0, 0, 0, 0.1)';
        this.usernameInput.style.outline = 'none';
        this.usernameInput.style.transition = 'border 0.3s ease';
        this.usernameInput.placeholder = 'Username';
        document.body.appendChild(this.usernameInput);

        // Agregar efecto de enfoque al hacer clic
        this.usernameInput.addEventListener('focus', () => {
            this.usernameInput.style.border = '2px solid #007BFF'; // Resalta en azul al enfocar
        });
        this.usernameInput.addEventListener('blur', () => {
            this.usernameInput.style.border = '2px solid #ddd'; // Vuelve al borde gris al perder foco
        });

        // Crear el campo de entrada de contraseña
        this.passwordInput = document.createElement('input');
        this.passwordInput.style.position = 'absolute';
        this.passwordInput.style.left = '50%';
        this.passwordInput.style.top = '450px';
        this.passwordInput.style.transform = 'translateX(-50%)'; // Centra el campo de entrada
        this.passwordInput.style.width = '250px';
        this.passwordInput.style.height = '40px';
        this.passwordInput.style.fontSize = '18px';
        this.passwordInput.style.padding = '10px';
        this.passwordInput.style.borderRadius = '8px';
        this.passwordInput.style.border = '2px solid #ddd';
        this.passwordInput.style.boxShadow = '0px 2px 6px rgba(0, 0, 0, 0.1)';
        this.passwordInput.style.outline = 'none';
        this.passwordInput.style.transition = 'border 0.3s ease';
        this.passwordInput.type = 'password';
        this.passwordInput.placeholder = 'Password';
        document.body.appendChild(this.passwordInput);

        // Agregar efecto de enfoque al hacer clic
        this.passwordInput.addEventListener('focus', () => {
            this.passwordInput.style.border = '2px solid #007BFF'; // Resalta en azul al enfocar
        });
        this.passwordInput.addEventListener('blur', () => {
            this.passwordInput.style.border = '2px solid #ddd'; // Vuelve al borde gris al perder foco
        });

        // Crear el botón de login
        this.loginButton = document.createElement('button');
        this.loginButton.textContent = 'Iniciar sesión';
        this.loginButton.style.position = 'absolute';
        this.loginButton.style.left = '50%';
        this.loginButton.style.top = '560px';  // Moved down
        this.loginButton.style.transform = 'translateX(-50%)'; // Centra el botón
        this.loginButton.style.fontSize = '18px';
        this.loginButton.style.padding = '12px 20px';
        this.loginButton.style.borderRadius = '8px';
        this.loginButton.style.border = 'none';
        this.loginButton.style.backgroundColor = '#007BFF';
        this.loginButton.style.color = 'white';
        this.loginButton.style.cursor = 'pointer';
        this.loginButton.style.transition = 'background-color 0.3s ease';
        document.body.appendChild(this.loginButton);

        // Cambiar color al pasar el ratón
        this.loginButton.addEventListener('mouseenter', () => {
            this.loginButton.style.backgroundColor = '#0056b3'; // Cambia a un azul más oscuro
        });
        this.loginButton.addEventListener('mouseleave', () => {
            this.loginButton.style.backgroundColor = '#007BFF'; // Vuelve al color original
        });

        // Botón para regresar al inicio
        this.backButton = document.createElement('button');
        this.backButton.textContent = 'Regresar al inicio';
        this.backButton.style.position = 'absolute';
        this.backButton.style.left = '50%';
        this.backButton.style.top = '620px';  // Moved down
        this.backButton.style.transform = 'translateX(-50%)'; // Centra el botón
        this.backButton.style.fontSize = '18px';
        this.backButton.style.padding = '12px 20px';
        this.backButton.style.borderRadius = '8px';
        this.backButton.style.border = 'none';
        this.backButton.style.backgroundColor = '#f1f1f1';
        this.backButton.style.color = '#333';
        this.backButton.style.cursor = 'pointer';
        this.backButton.style.transition = 'background-color 0.3s ease';
        document.body.appendChild(this.backButton);

        // Cambiar color al pasar el ratón
        this.backButton.addEventListener('mouseenter', () => {
            this.backButton.style.backgroundColor = '#ddd'; // Cambia el fondo cuando el ratón pasa
        });
        this.backButton.addEventListener('mouseleave', () => {
            this.backButton.style.backgroundColor = '#f1f1f1'; // Vuelve al fondo original
        });

        // Agregar eventos a los botones
        this.loginButton.addEventListener('click', () => this.handleLogin());
        this.backButton.addEventListener('click', () => this.handleBack());
    }

    handleLogin() {
        const username = this.usernameInput.value;
        const password = this.passwordInput.value;

        if (username === 'user' && password === 'password') {
            console.log('Login exitoso');
            this.messageText.setText('Login exitoso');
            this.messageText.setFill('#00FF00'); // Mensaje verde en caso de éxito
            this.scene.start('Game'); // Redirige al juego si el login es correcto
        } else {
            console.log('Nombre de usuario o contraseña incorrectos');
            this.messageText.setText('Nombre de usuario o contraseña incorrectos');
            this.messageText.setFill('#FF0000'); // Mensaje rojo en caso de error
        }
    }

    handleBack() {
        // Elimina los elementos del formulario antes de regresar
        document.body.removeChild(this.usernameInput);
        document.body.removeChild(this.passwordInput);
        document.body.removeChild(this.loginButton);
        document.body.removeChild(this.backButton);

        // Cambia a la escena de inicio
        this.scene.start('StartScene');
    }
}

export default LoginScene;
