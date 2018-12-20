var originalText = [];
async function heroType(string){
    let stringArr = string.split('');
    originalText = stringArr;

    for(char of stringArr){
        await autoType(char);
    }
    updateText();
    resetText();
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
    let target = document.getElementById('hero-banner');
    
    setInterval(function(){
        let decisionResult = randomChoice();
        if(decisionResult){
            let target = document.getElementById('hero-banner');
            let targetTextArr = target.innerText.split('');
            let targetCharIndex = Math.floor(Math.random()*targetTextArr.length)-1;
            let newChar = String.fromCharCode(Math.floor(Math.random()*93)+33);
            console.log(`New char is: ${newChar}`);
            let previousChar = targetTextArr[targetCharIndex];
            targetTextArr[targetCharIndex] = newChar;
            let newText = targetTextArr.join('').trim();
            setText(newText);
            // setTimeout(resetChar(targetCharIndex,previousChar),Math.floor(Math.random()*400));
        }
    },200);
}

function setText(newText){
    document.getElementById('hero-banner').innerText = newText;
}
function resetText(targetIndex,previousChar){
    let target = document.getElementById('hero-banner');
    let currentText = target.innerText.split('');
    let newText = [];

    setInterval(()=>{
        for(let i=0; i<currentText.length; i++){
            if(randomChoice()){
                newText[i] = originalText[i];
            }else{
                newText[i] = currentText[i];
            }
        }
        setText(newText.join(''));
    },400);
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