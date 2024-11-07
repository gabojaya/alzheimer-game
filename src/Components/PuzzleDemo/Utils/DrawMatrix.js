import SquareElement from "../GameObjects/SquareElement"

export const matrixFill2 = (scene) => {
    scene.imges = []
    scene.fila = []

    //Fila 1
    scene.fila.push(new SquareElement(scene, 0, 0, 'green', false, scene.selectedColor,"red")) //1
    scene.fila.push(new SquareElement(scene, 0, 0, 'red', false, scene.selectedColor, "red"))
    scene.fila.push(new SquareElement(scene, 0, 0, 'border', true, scene.selectedColor,"red")) //1
    scene.fila.push(new SquareElement(scene, 0, 0, 'border', true, scene.selectedColor, "red"))


    //push fila 1
    scene.imges.push(scene.fila)
    scene.fila = []


    //Fila 2
    scene.fila.push(new SquareElement(scene, 0, 0, 'green', false, scene.selectedColor, "red"))
    scene.fila.push(new SquareElement(scene, 0, 0, 'blue', false, scene.selectedColor, "red")) //1
    scene.fila.push(new SquareElement(scene, 0, 0, 'border', true, scene.selectedColor,"red")) //1
    scene.fila.push(new SquareElement(scene, 0, 0, 'border', true, scene.selectedColor, "red"))

    scene.imges.push(scene.fila)
    scene.fila = []

    return scene.imges;
}