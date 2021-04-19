var canvas = document.getElementById('particles');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight*(15/100);


class glowParticle {
    static particleList = [];

    constructor(posX, posY, radius, color, offset = 0) {
        this.posX = posX;
        this.posY = posY;
        this.radius = radius;
        this.color = color;
        this.state = 0;
        this.timeOffset = offset;
        glowParticle.particleList.push(this);
    }

    colorSaturation = (factor) => {
        let newColor = [0, 0, 0];
        newColor[0] = (this.color[0] + factor > 255) ? 255 : this.color[0] + factor;
        newColor[1] = (this.color[1] + factor > 255) ? 255 : this.color[1] + factor;
        newColor[2] = (this.color[2] + factor > 255) ? 255 : this.color[2] + factor;
        return newColor;
    }

    createParticle = () => {
        let color = this.colorSaturation(240);
        ctx.fillStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, 0.5)`;
        ctx.beginPath();
        ctx.ellipse(
            this.posX,
            this.posY,
            Math.sin(this.state)*this.radius*2,
            Math.sin(this.state)*this.radius,
            0, 0, Math.PI*2);
        ctx.closePath();
        ctx.fill();
    }

    createGlow = () => {
        let glowFactor = 5;
        for (let i = glowFactor; i > 0; --i) {
            let color = this.colorSaturation(255 - i*20);
            ctx.fillStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${0.1 - i*0.05})`;
            ctx.beginPath();
            ctx.ellipse(
                this.posX,
                this.posY,
                Math.sin(this.state)*this.radius*(this.radius+i*0.2)*2,
                Math.sin(this.state)*this.radius*(this.radius+i*0.2),
                0, 0, Math.PI*2);
            ctx.closePath();
            ctx.fill();
        }
    }
}


const spawnParticles = () => {
    for (let i = 0; i < 200; ++i) {
        new glowParticle(
            Math.floor(Math.random()*(window.innerWidth-20)+20),
            Math.floor(Math.random()*window.innerHeight),
            Math.round(Math.random()*1.5, -2),
            // [254, 190, 64],
            [255, 255, 255],
            Math.random()*5
            );
    }
}

spawnParticles();
var interval = setInterval(() => {
    spawnParticles();
}, 1000);


const draw = () => {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    for (let i = 0; i < glowParticle.particleList.length; ++i) {
        if (glowParticle.particleList[i].timeOffset > 0) {
            glowParticle.particleList[i].timeOffset -= 0.02;
        }
        else {
            if (glowParticle.particleList[i].state < Math.PI) {
                glowParticle.particleList[i].createGlow();
                glowParticle.particleList[i].createParticle();
    
                glowParticle.particleList[i].state += 0.02;
            }
            else {
                glowParticle.particleList.splice(i, 1);
            }
        }
    }
    requestAnimationFrame(draw);
}

draw();