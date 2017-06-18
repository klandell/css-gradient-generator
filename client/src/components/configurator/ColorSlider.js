import ColorCanvas from 'Components/configurator/ColorCanvas';

export default class ColorPicker extends ColorCanvas {
    draw() {
        const context = this.getContext();
        const width = this.getWidth();
        const height = this.getHeight();
        const colorGradient = context.createLinearGradient(0, 0, 0, height);

        colorGradient.addColorStop(0, 'rgba(255, 0, 0, 1)');
        colorGradient.addColorStop(0.17, 'rgba(255, 0, 255, 1)');
        colorGradient.addColorStop(0.34, 'rgba(0, 0, 255, 1)');
        colorGradient.addColorStop(0.51, 'rgba(0, 255, 255, 1)');
        colorGradient.addColorStop(0.68, 'rgba(0, 255, 0, 1)');
        colorGradient.addColorStop(0.85, 'rgba(255, 255, 0, 1)');
        colorGradient.addColorStop(1, 'rgba(255, 0, 0, 1)');
        context.fillStyle = colorGradient;
        context.fillRect(0, 0, width, height);
    }
}
