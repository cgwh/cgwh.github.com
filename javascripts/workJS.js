/**
 * Created by cg on 16-5-17.
 */

window.onload = function () {
    setSize();
    drawGalaxy();
    showHello();
};

function drawGalaxy() {
    var divWidth = document.getElementById('div_cover').offsetWidth;
    var divHeight = document.getElementById('div_cover').offsetHeight;
    var canvas = document.getElementById('canvas'),
        ctx = canvas.getContext('2d'),
        w = canvas.width = divWidth,
        h = canvas.height = divHeight,

        hue = 217,
        stars = [],
        count = 0,
        maxStars = 600,
        maxStarsgal = 2200;

    var canvas2 = document.createElement('canvas'),
        ctx2 = canvas2.getContext('2d');
    canvas2.width = 100;
    canvas2.height = 100;
    var half = canvas2.width/2,
        gradient2 = ctx2.createRadialGradient(half, half, 0, half, half, half);
    gradient2.addColorStop(0.055, '#fff');
    gradient2.addColorStop(0.1, 'hsl(' + hue + ', 60%, 30%)');
    gradient2.addColorStop(0.15, 'hsl(' + hue + ', 64%, 6%)');
    gradient2.addColorStop(1, 'transparent');

    ctx2.fillStyle = gradient2;
    ctx2.beginPath();
    ctx2.arc(half, half, half, 0, Math.PI * 2);
    ctx2.fill();

    function random(min, max) {
        if (arguments.length < 2) {
            max = min;
            min = 0;
        }
        if (min > max) {
            var hold = max;
            max = min;
            min = hold;
        }
        return Math.floor(Math.random() * (max - min) + min + 1);
    }

    var Star = function() {
        this.orbitRadius = random(w / 2 - 50);
        this.radius = random(100, this.orbitRadius) / 10;
        this.orbitX = w / 3 - 100;
        this.orbitY = h / 5;
        // this.orbitX = 100;
        // this.orbitY = 100;
        this.timePassed = random(0, maxStars);
        this.speed = random(this.orbitRadius) / 1000000;
        this.alpha = random(2, 10) / 5;
        count++;
        stars[count] = this;
    };

    Star.prototype.draw = function() {
        var x = Math.sin(this.timePassed) * this.orbitRadius * 2 + this.orbitX,
            y = Math.cos(this.timePassed) * this.orbitRadius * 1.5 + this.orbitY,
            twinkle = random(10);
        if (twinkle === 1 && this.alpha > 0) {
            this.alpha -= 0.05;
        } else if (twinkle === 2 && this.alpha < 1) {
            this.alpha += 0.05;
        }
        ctx.globalAlpha = this.alpha;
        ctx.drawImage(canvas2, x - this.radius / 2, y - this.radius / 2, this.radius, this.radius);
        this.timePassed += this.speed;
    };
    for (var i = 0; i < maxStars; i++) {
        new Star();
    }
    var Stargal = function() {
        this.orbitRadius = random(w / 2 - 50);
        this.radius = random(100, this.orbitRadius) / 10;
        this.orbitX = w / 2 + 130;
        this.orbitY = h / 2 + 55;
        this.timePassed = random(0, maxStarsgal);
        this.speed = random(this.orbitRadius) / 200000;
        this.alpha = random(2, 10) / 10;
        count++;
        stars[count] = this;
    };

    Stargal.prototype.draw = function() {
        var x = Math.sin(this.timePassed) * this.orbitRadius/1.2 + this.orbitX,
            y = Math.cos(this.timePassed + 0.8) * this.orbitRadius/2.3 + this.orbitY,
            twinkle = random(10);
        if (twinkle === 1 && this.alpha > 0) {
            this.alpha -= 0.05;
        } else if (twinkle === 2 && this.alpha < 1) {
            this.alpha += 0.05;
        }
        ctx.globalAlpha = this.alpha;
        ctx.drawImage(canvas2, x - this.radius / 2, y - this.radius / 2, this.radius, this.radius);
        this.timePassed += this.speed;
    };

    for (var n = 0; n < maxStarsgal; n++){
        new Stargal();
    }

    function drawAnimation() {
        ctx.globalCompositeOperation = 'source-over';
        ctx.globalAlpha = 0.8;
        ctx.fillStyle = 'hsla(' + hue + ', 64%, 9%, 0.8)';
        ctx.fillRect(0, 0, w, h);
        ctx.globalCompositeOperation = 'lighter';
        for (var i = 1, l = stars.length; i < l; i++) {
            stars[i].draw();
        }
        window.requestAnimationFrame(drawAnimation);
    }
    drawAnimation();
}

function choiceShow() {
    var presentTime = new Date().getHours();
    var showText;
    if(presentTime >= 5 && presentTime <10){
        showText = "Hi , 早上好";
    }else if(presentTime >= 10 && presentTime < 13){
        showText = "Hi , 中午好";
    }else if(presentTime >= 13 && presentTime < 19){
        showText = "Hi , 下午好";
    }else if(presentTime >= 19 && presentTime < 24){
        showText = "Hi , 晚上好"
    }else{
        showText = "Hi , 你好"
    }
    return showText;
}
// function choiceShowEnd() {
//     var presentTime = new Date().getHours();
//     var showTextEnd;
//     if(presentTime >= 5 && presentTime <10){
//         showTextEnd = "新的一天好心情";
//     }else if(presentTime >= 10 && presentTime < 13){
//         showTextEnd = "现在最好今天的时光";
//     }else if(presentTime >= 13 && presentTime < 17){
//         showTextEnd = "努力工作";
//     }else if(presentTime >= 17 && presentTime < 19){
//         showTextEnd = "一起去看夕阳吧"
//     }else if(presentTime >= 19 && presentTime < 22){
//         showTextEnd = "好好放松下"
//     }else if(presentTime >= 22 && presentTime < 24){
//         showTextEnd = "熬夜伤身,早点休息"
//     }else{
//         showTextEnd = "为什么睡不着呢"
//     }
//     return showTextEnd;
// }

function showHello() {
    var showHelloDiv = document.getElementById("div_showHello");
    var maxWidths = window.innerWidth;
    showHelloDiv.style.color = "#d3d5c8";
    showHelloDiv.style.fontSize = maxWidths/36 + 'px';
    showHelloDiv.innerText = choiceShow();
}

function setSize() {
    var maxWidth = window.innerWidth,maxHeight = window.innerHeight;
    // if(maxWidth > maxHeight){
        document.getElementById('div_cover').style.height = maxHeight + 'px';
//        document.getElementById('div_recently').style.height = maxHeight + 40 + 'px';
        document.getElementById('div_hobby').style.height = maxHeight + 40 + 'px';
        document.getElementById('div_linkOther').style.height = maxHeight/1.5 + 'px';
        document.getElementById('div_showHello').style.width = maxWidth/4 + 'px';
        document.getElementById('div_showHello').style.height = maxHeight/5 + 'px';
        document.getElementById('div_arrow').style.width = 80 + 'px';
        document.getElementById('div_arrow').style.height = 40 + 'px';
        // document.getElementById('div_menuBar').style.height = 500 + 'px';
    // }
}

