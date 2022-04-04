var canvas = document.createElement("canvas"),
    c = canvas.getContext("2d");
var w = canvas.width = window.innerWidth,
    h = canvas.height = window.innerHeight;
c.fillStyle = "rgb(0,0,0)";
c.fillRect(0, 0, w, h);

particles = {},
    particleIndex = 0,
    particleNum = 1;



function particle() {
    this.x = Math.random()*w;
    this.y = Math.random()*h;
    this.vx = 0;
    this.vy = 0;
    this.gravity = 1;
    particleIndex++;
    particles[particleIndex] = this;
    this.id = particleIndex;
    this.life = 0;
    this.maxLife = Math.random() * 100;
    this.shadeR = Math.floor(this.x/(w/180));
    this.shadeG = Math.floor(Math.random() * 255);
    this.shadeB = Math.floor(Math.random() * 90);
    this.color = 'hsla(' + this.shadeR + ',100%,' + this.shadeB + '%,' + Math.random() * 0.7 + ')';
    this.size = 0.1;
    this.a1 = 100;
    this.a2 = Math.random()*4+1;
    this.a3 = 0;
    this.a4 = 1;
}
particle.prototype.draw = function() {
    this.y += 0;

    c.beginPath();
    c.lineWidth = this.size;
    c.lineTo(this.x,this.y);
    for(k=0;k<10;k++){
        this.x += this.a1*Math.sin(this.a2*this.vx)+this.a3*this.vx*Math.sin(this.a4*this.vx);
        this.y += this.a1*Math.cos(this.a2*this.vx)+this.a3*this.vx*Math.cos(this.a4*this.vx);
        this.vy += this.gravity/1;
        this.vx += this.gravity/1;
        c.lineTo(this.x,this.y);
    }
    c.lineTo(this.x,this.y);
    c.strokeStyle = this.color;
    c.stroke();

    this.life++;
    if (this.life >= this.maxLife) {
        delete particles[this.id];
    }

};

function drawParticle() {
    c.fillStyle = "rgba(0,0,0,0)";
    c.fillRect(0, 0, w, h);
    for (var i = 0; i < particleNum; i++) {
        new particle();
    }
    for (var i in particles) {
        particles[i].draw();
    }
}

var mouse = {x: 0, y: 0};
var last_mouse = {x: 0, y: 0};

canvas.addEventListener('mousemove', function(e) {
    last_mouse.x = mouse.x;
    last_mouse.y = mouse.y;

    mouse.x = e.pageX - this.offsetLeft;
    mouse.y = e.pageY - this.offsetTop;
}, false);

window.requestAnimFrame = (function() {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function(callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();
var appended = false;
function showLoader() {
    if(!appended){
        document.body.appendChild(canvas);
        appended = true;
    }
    var selectors = [
        "body > div.navigation-wrapper",
        "body > div.container",
        "body > div.wrapper",
        "#main",
        "#footer",
        "body > header",
    ];
    selectors.map(function (selector){
        var el = document.querySelector(selector);
        if(el){el.style.display = 'none';}
    })
    document.querySelector("body").style.padding = "0px";
    window.requestAnimFrame(showLoader);
    drawParticle();
}

(function() {
    // your page initialization code here the DOM will be available here
    var submitButton = document.querySelector("#submit-button-group > div > input.btn.btn-primary");
    if(!submitButton){submitButton = document.querySelector("#submit-button-group");}
    if(submitButton){submitButton.addEventListener("click", showLoader);}
})();

$(function () {
    var as = $('a');
    //debugger
    var urls = as.map(function (key, el){return el.href;});
    var text = as.map(function (key, el){return el.innerText;});
    var filtered = as.filter(function (key, el){return el.href.indexOf("#") === -1;});
    filtered.click(function (e) {
        //$('<div class=loadingDiv>loading...</div>').prependTo(document.body);
        showLoader();
    });
});
