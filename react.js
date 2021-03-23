window.addEventListener('load', () => {
    let audio = []

    const bar = {
        width: window.innerWidth / 128 - 8,
        width: 100,
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

        for (const [i, part] of audio.entries()) {
            canvas.style.opacity = part;
            break;
        }

        requestAnimationFrame(draw);
    }

    window.wallpaperRegisterAudioListener(listener);
    draw();
});