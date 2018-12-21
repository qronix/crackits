var originalText = [];
var idTracker = [];
var running = true;

async function heroType(string){
    let stringArr = string.split('');
    originalText = stringArr;
    try{
        for(char of stringArr){
            await autoType(char);
        }
        updateText();
        resetText();
    }catch{
        console.log('Hero Typing Stopped');
    }
}

function autoType(char){
    let target = document.getElementById('hero-banner');

    return new Promise((res,rej)=>{
        let id = setTimeout(function(){
            target.innerText += char;
            clearInterval(id);
            res(true);
        }.bind(target),Math.floor(Math.random()*400));
    });
}

function updateText(){
    // let target = document.getElementById('hero-banner');
    
    let id = setInterval(function(){
        let decisionResult = randomChoice();
        if(decisionResult){
            let target = document.getElementById('hero-banner');
            let targetTextArr = target.innerText.split('');
            let targetCharIndex = Math.floor(Math.random()*targetTextArr.length)-1;
            let newChar = String.fromCharCode(Math.floor(Math.random()*93)+33);
            let previousChar = targetTextArr[targetCharIndex];
            targetTextArr[targetCharIndex] = newChar;
            let newText = targetTextArr.join('').trim();
            setText(newText);
        }
        if(!running){
            clearInterval(id);
        }
    },200);
    trackThisId('interval',id);
}

function setText(newText){
    document.getElementById('hero-banner').innerText = newText;
}
function resetText(targetIndex,previousChar){
    let target = document.getElementById('hero-banner');
    let currentText = target.innerText.split('');
    let newText = [];

    let id = setInterval(()=>{
        for(let i=0; i<currentText.length; i++){
            if(randomChoice()){
                newText[i] = originalText[i];
            }else{
                newText[i] = currentText[i];
            }
        }
        setText(newText.join(''));
        if(!running){clearInterval(id);}
    },400);
    trackThisId('interval',id);
}

function trackThisId(type,id){
    idTracker.push({
        type,
        id
    });
}

function heroTypeStop(){
    running = false;
}

function randomChoice(){
    const DECISION_MAX = 40;
    const DECISION_THRESHOLD = 30;
    let decision = Math.floor(Math.random()*DECISION_MAX);
    if(decision>= DECISION_THRESHOLD){
        return true;
    }else{
        return false;
    }
}