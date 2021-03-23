window.addEventListener('load', () => {
    let audio = []

    const bar = {
        width: window.innerWidth / 128 - 8,
        height: 100,
        padding: 8
    }

    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const listener = arr => {
        audio = arr;
    }

    const draw = () => {
        context.clearRect(0, 0, window.innerWidth, window.innerHeight);

        context.fillStyle = "#00ffcc";

        for (const [i, part] of audio.entries()) {
            let x = (i * bar.width) + ((i + 1) * bar.padding) - (bar.padding / 2);
            let y = 4;
            context.fillRect(x, y, bar.width, bar.height * part * 2);
        }

        requestAnimationFrame(draw);
    }

    window.wallpaperRegisterAudioListener(listener);
    draw();
});