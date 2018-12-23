let canvas = document.getElementById('landing-canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// let canvas = undefined;


var ctx = canvas.getContext('2d');

class LandingCanvas{
    constructor(canvas,ctx){
        this.canvas = canvas
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.textLibrary = [];
        this.ctx = ctx;
        // this.initTextObject("Hello!");
        this.addString(20);
    }
    
    setDimensions(width,height){
        this.canvas.width = width;
        this.canvas.height = height;
    }
    initTextObject(stringArr){
        // let stringArray = string.split('');
        var prevYPos = Math.floor(Math.random()*innerHeight-200);
        var xPos     = Math.floor(Math.random()*innerWidth+10);
        stringArr.forEach((char)=>{
            let stringObj = {};
            stringObj.char = char;
            stringObj.x    = xPos;
            stringObj.y   = prevYPos = prevYPos+20;
            this.textLibrary.push(stringObj);
        });
    }
    addString(count){
        for(let i=0; i<count; i++){
            let stringLength = Math.floor(Math.random()*20);
            let stringArray  = [];
    
            for(let i=0; i<stringLength; i++){
                let char = String.fromCharCode(Math.floor(Math.random()*93+33));
                stringArray.push(char);
            }
            // let stringObj = stringArray.join('');
            this.initTextObject(stringArray);
        }
    }
    update(){
        let libraryLength = this.textLibrary.length;
        this.textLibrary = this.textLibrary.filter((obj)=>{
            obj.y += 4;
            let variance = Math.floor(Math.random()*40);
            if(variance>30){
                obj.char = String.fromCharCode(Math.floor(Math.random()*93+33));
            }
            if(obj.y > innerHeight){
                return false;
            }
            else{
                return true;
            }
        });
        this.textLibrary.forEach((obj)=>{
            this.ctx.fillText(obj.char,obj.x,obj.y-7);
            this.ctx.fillText(obj.char,obj.x,obj.y-5);
            this.ctx.fillText(obj.char,obj.x,obj.y-3);
            this.ctx.fillText(obj.char,obj.x,obj.y);
        });
        let addNewStringCount = libraryLength-this.textLibrary.length;
        this.addString(2);
    }
}


let landCanvas = undefined;
// function initCanvas(){
//     canvas = document.getElementById('landing-canvas');
//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;
//     ctx = canvas.getContext('2d');
//     landCanvas = new LandingCanvas(canvas,ctx);
//     window.addEventListener('resize',()=>{
//     landCanvas = new LandingCanvas(canvas,ctx);
//         landCanvas.setDimensions(innerWidth,innerHeight);
//     });
//     animate();
// }

window.onload = ()=>{
    landCanvas = new LandingCanvas(canvas,ctx);
    window.addEventListener('resize',()=>{
    landCanvas = new LandingCanvas(canvas,ctx);
        landCanvas.setDimensions(innerWidth,innerHeight);
    });
    animate();
    var glitchTyper = new GlitchTyper("Crackits is great","hero-banner",false);
    glitchTyper.init();
}

function animate(){
    ctx.clearRect(0,0,innerWidth,innerHeight);
    ctx.font = "0.8vw Major Mono Display";
    ctx.fillStyle = "#4d4dff";
    landCanvas.update();
    requestAnimationFrame(animate);
}

// heroType("Crackits","hero-banner");