export const calculateImageScale = (imgWidth, imgHeight, availableSpaceWidth, availableSpaceHeight, minPadding) => {
    let ratio = 1;
    const currentDPI = window.devicePixelRatio;
    const widthRatio = (imgWidth * currentDPI + 2 * minPadding) / availableSpaceWidth;
    const heightRatio = (imgHeight * currentDPI + 2 * minPadding) / availableSpaceHeight;
    if (widthRatio > 1 || heightRatio > 1)
        ratio = 1 / Math.max(widthRatio, heightRatio);
    return ratio * currentDPI;
}

export const scaleImage = (image, availableSpaceWidth, availableSpaceHeight, padding = 0, scaleMultiplier = 1) => {
    const scale = calculateImageScale(image.width, image.height, availableSpaceWidth, availableSpaceHeight, padding);
    image.setScale(scale * scaleMultiplier)
}

export const wrapResizeFn = (scene) => {
    const { scale, resize, events } = scene;
    if (!resize) {
        scene.resize = resizeDefault(scene);
        scene.resizeFn = () => scene.resize();
    }
    scale.on('resize', scene.resizeFn);
    events.once('shutdown', () => scale.off('resize', scene.resizeFn));
    scene.resizeFn();
}

export const resizeDefault = (scene) => () => {
    const { game } = scene;
    const { width, height } = game.canvas;
    scene.resizeLandscape(width, height);

}