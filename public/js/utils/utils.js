function isRealString(testString){
    if(typeof testString === 'string' && testString.length>0){
        return true;
    }else{
        return false;
    }
}

function applyClassToEle(targetName,className){
    let target = document.getElementById(targetName);
    target.classList.add(className);
}

function removeClassFromEle(targetName,className){
    let target = document.getElementById(targetName);
    target.classList.remove(className);
}

function startAnimation(targetName){
    let ele = document.getElementById(targetName);
    ele.style.animationPlayState = "running";
}

function pushHTMLDataToEle(data,targetName){
    let target = document.getElementById(targetName);
    target.innerHTML = data;
}

function removeEleFromDOM(target){
    document.getElementById(target).remove();
}