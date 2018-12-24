// var originalText = [];
// var idTracker = [];
// var running = false;
// var targetName = undefined;

class GlitchTyper{
    constructor(stringToType,targetEle,glitch,autoTyperDelayThreshold){
        this.stringToType = stringToType;
        this.taretEle = targetEle;
        this.glitch = glitch;
        this.running = false;
        this.idTracker = [];
        this.newText = [];
        this.autoTyperDelayThreshold = autoTyperDelayThreshold;
    }
    async init(){
        this.originalText = this.stringToType.split('');
        if(this.autoTyperDelayThreshold=== undefined){
            this.autoTyperDelayThreshold = 100;
        }
        this.running = true;
        try{
            for(let character in this.originalText){
                await this.autoType(this.originalText[character]);
            }
            if(this.glitch){
                this.updateText();
                this.resetText();
            }
        }catch{
            console.log('Hero Typing Stopped');
        }
    }
    autoType(char){
        return new Promise((res,rej)=>{
            let id = setTimeout(function(){
                clearInterval(id);
                if(this.checkTargetExists()){
                    this.newText.push(char);
                    this.setText(this.newText.join(''));
                }else{
                    return new Error('Target not found, stopping.');
                }
                res(true);
            }.bind(this),Math.floor(Math.random()*this.autoTyperDelayThreshold));
        });
    }
    updateText(){
        debugger;
        let id = setInterval(function(){
            let decisionResult = this.randomChoice();
            if(decisionResult){
                if(this.checkTargetExists()){
                    let target = document.getElementById(this.taretEle);
                    let targetTextArr = target.innerText.split('');
                    let targetCharIndex = Math.floor(Math.random()*targetTextArr.length)-1;
                    let newChar = String.fromCharCode(Math.floor(Math.random()*93)+33);
                    targetTextArr[targetCharIndex] = newChar;
                    // this.newText = targetTextArr.join('');
                    this.newText = targetTextArr;
                    this.setText(this.newText);
                }else{
                    return new Error('Target not found, stopping.');
                }
            }
            if(!this.running){
                clearInterval(id);
            }
        }.bind(this),200);
        this.trackThisId('interval',id);
    }
    setText(newText){
        if(Array.isArray(newText)){
            newText = newText.join('');
        }
        if(this.running && this.checkTargetExists()){
            document.getElementById(this.taretEle).innerText = newText;
        }
        // this.newText = [];
    }
    resetText(){
        if(this.checkTargetExists()){
            let target = document.getElementById(this.taretEle);
            let currentText = target.innerText.split('');
            //  newText = [];

            let id = setInterval(function(){
                for(let i=0; i<currentText.length; i++){
                    if(this.randomChoice()){
                        // this.newText[i] = this.originalText[i];
                        this.setNewText(i,this.originalText[i]);
                    }else{
                        // this.newText[i] = currentText[i];
                        this.setNewText(i,currentText[i]);
                    }
                }
                this.setText(this.newText);
                if(!this.running){clearInterval(id);}
            }.bind(this),400);
            this.trackThisId('interval',id);
        }else{
            return new Error('Target not found, stopping.');
        }
    }
    setNewText(index,char){
        this.newText[index] = char;
     }
    randomChoice(){
        const DECISION_MAX = 40;
        const DECISION_THRESHOLD = 30;
        let decision = Math.floor(Math.random()*DECISION_MAX);
        if(decision>= DECISION_THRESHOLD){
            return true;
        }else{
            return false;
        }
    }
    trackThisId(type,id){
        this.idTracker.push({
            type,
            id
        });
    }
    checkTargetExists(){
        let target = document.getElementById(this.taretEle);
        if(target){
            return true;
        }else{
            this.running = false;
            return false;
        }
    }
}
// async function heroType(string,name){
//     let stringArr = string.split('');
//     targetName = name;
//     text = document.getElementById(name).innerText;
//     init();
//     originalText = stringArr;
//     try{
//         for(char of stringArr){
//             await autoType(char);
//         }
//         updateText();
//         resetText();
//     }catch{
//         console.log('Hero Typing Stopped');
//     }
// }
// function init(){
//     originalText = [];
//     if(idTracker.length === 0){
//         running = true;
//     }
// }
// function autoType(char){
//     let target = document.getElementById(targetName);

//     return new Promise((res,rej)=>{
//         let id = setTimeout(function(){
//             document.getElementById(targetName).innerText += char;
//             clearInterval(id);
//             res(true);
//         }.bind(target),Math.floor(Math.random()*400));
//     });
// }

// function updateText(){
//     // let target = document.getElementById('hero-banner');
    
//     let id = setInterval(function(){
//         let decisionResult = randomChoice();
//         if(decisionResult){
//             let target = document.getElementById(targetName);
//             let targetTextArr = target.innerText.split('');
//             let targetCharIndex = Math.floor(Math.random()*targetTextArr.length)-1;
//             let newChar = String.fromCharCode(Math.floor(Math.random()*93)+33);
//             let previousChar = targetTextArr[targetCharIndex];
//             targetTextArr[targetCharIndex] = newChar;
//             let newText = targetTextArr.join('').trim();
//             setText(newText);
//         }
//         if(!running){
//             clearInterval(id);
//         }
//     },200);
//     trackThisId('interval',id);
// }

// function setText(newText){
//     if(running){
//         document.getElementById(targetName).innerText = newText;
//     }
// }
// function resetText(targetIndex,previousChar){
//     let target = document.getElementById(targetName);
//     let currentText = target.innerText.split('');
//     let newText = [];

//     let id = setInterval(()=>{
//         for(let i=0; i<currentText.length; i++){
//             if(randomChoice()){
//                 newText[i] = originalText[i];
//             }else{
//                 newText[i] = currentText[i];
//             }
//         }
//         setText(newText.join(''));
//         if(!running){clearInterval(id);}
//     },400);
//     trackThisId('interval',id);
// }

// function trackThisId(type,id){
//     idTracker.push({
//         type,
//         id
//     });
// }

// function heroTypeStop(i=0){
//     running = false;
//     for(obj in idTracker){
//         if(obj.type === 'interval'){
//             window.clearInterval(obj.id);
//             console.log(`Stopped interval: ${id}`);
//         }
//         if(obj.type === 'timeout'){
//             window.clearInterval(obj.id);
//             console.log(`Stopped timeout:${id}`);
//         }
//         obj.type = 'cleared';
//     }
//     allAsyncDone = idTracker.every((obj)=>obj.type==='cleared');
//     console.log('After clear:');
//     console.dir(idTracker);
//     if(!allAsyncDone){
//         setTimeout(function(){
//             heroTypeStop(i+1);
//         }.bind(i),2000);
//     }else{
//         idTracker = [];
//         running = true;
//         return 0;
//     }
//     if(i>5){
//         return new Error('Could not terminate all async functions. Disabling heroTyper.');
//     }
// }

// function randomChoice(){
//     const DECISION_MAX = 40;
//     const DECISION_THRESHOLD = 30;
//     let decision = Math.floor(Math.random()*DECISION_MAX);
//     if(decision>= DECISION_THRESHOLD){
//         return true;
//     }else{
//         return false;
//     }
// }