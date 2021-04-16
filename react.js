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

    var visualizer = false;
    var color = "rgb(0, 255, 204)"

    const draw = () => {
        context.clearRect(0, 0, window.innerWidth, window.innerHeight);

        if (visualizer) {
            context.fillStyle = color;

            for (const [i, part] of audio.entries()) {
                let x = (i * bar.width) + ((i + 1) * bar.padding) - (bar.padding / 2);
                let y = 4;
                context.fillRect(x, y, bar.width, bar.height * part * 2);
            }
        }

        requestAnimationFrame(draw);
    }

    window.wallpaperRegisterAudioListener(listener);
    draw();

    window.wallpaperPropertyListener = {
        applyUserProperties: function(properties) {
            if (properties.audio_visualizer) {
                if (properties.audio_visualizer.value == true) {
                    visualizer = true;
                } else {
                    visualizer = false;
                }
            }
            if (properties.schemecolor) {
                let optionsColor = properties.schemecolor.value.split(" ")
                color = `rgb(${Math.ceil(optionsColor[0] * 255)}, ${Math.ceil(optionsColor[1] * 255)}, ${Math.ceil(optionsColor[2] * 255)})`
            }
        }
    }
});