import React, { Component } from "react";
import Phaser from "phaser";
import PuzzleScene from "./Scenes/PuzzleScene"
import StartScene from "./Scenes/StartScene";
import SummaryScene from "./Scenes/SummaryScene";

class PuzzleDemo extends Component {
    constructor() {
        super();
        this.state = {
            modalOpen: true,
            currentScene: 'StartScene'
        }
    }

    componentDidMount() {
        const DPR = window.devicePixelRatio;
        const config = {
            backgroundColor: '#c39ed7',
            type: Phaser.AUTO,
            scene:
                [StartScene, PuzzleScene, SummaryScene],
            scale: {
                parent: 'phaser-game',
                mode: Phaser.Scale.NONE,
                height: document.documentElement.clientHeight * DPR,
                width: document.documentElement.clientWidth * DPR,
                zoom: 1 / DPR
            }
        };
        this.game = new Phaser.Game(config)
        const gameDiv = document.getElementById('phaser-game');
        this.resizeGame = resizeGame(this.game, gameDiv);
        window.addEventListener('resize', this.resizeGame);
        //aqui estan quemados los datos
        console.log(1)
        this.game.data = {
            player_id: 1
        }



    }
    handleClose = () => {
        this.setState({ modalOpen: true })
        this.props.history.push(`/`);
    }
    handleOpen = () => this.setState({ modalOpen: true })

    componentWillUnmount() {
        window.removeEventListener('resize', this.resizeGame);
        this.game.destroy(true);
    }
    shouldComponentUpdate() {
        return true;
    }

    render() {
        const width = `${document.documentElement.clientWidth}px`;
        const height = `${document.documentElement.clientHeight}px`;
        return <div id="phaser-game"
            style={{ width, height, backgroundColor: "black" }} />;
    }


}
const resizeGame = (game, container) => () => {
    const DPR = window.devicePixelRatio*1;
    const { clientWidth, clientHeight } = document.documentElement;
    container.style.width = `${window.innerWidth}px`;
    container.style.height = `${window.innerHeight}px`;
    game.scale.resize(clientWidth * DPR, clientHeight * DPR);
}

export default PuzzleDemo;