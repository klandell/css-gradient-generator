import ColorCanvas from 'Components/configurator/ColorCanvas';

export default class ColorPicker extends ColorCanvas {
    draw() {
        const context = this.getContext();
        const width = this.getWidth();
        const height = this.getHeight();

        context.fillStyle = this.props.sliderColor;
        context.fillRect(0, 0, width, height);

        const whiteGradient = context.createLinearGradient(0, 0, width, 0);
        whiteGradient.addColorStop(0, 'rgba(255,255,255,1)');
        whiteGradient.addColorStop(1, 'rgba(255,255,255,0)');
        context.fillStyle = whiteGradient;
        context.fillRect(0, 0, width, height);

        const blackGradient = context.createLinearGradient(0, 0, 0, height);
        blackGradient.addColorStop(0, 'rgba(0,0,0,0)');
        blackGradient.addColorStop(1, 'rgba(0,0,0,1)');
        context.fillStyle = blackGradient;
        context.fillRect(0, 0, width, height);
    }
}
