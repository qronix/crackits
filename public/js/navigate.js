function loadHome(event,button){
    startAnimation('hero-content');
    event.preventDefault();
}

function startAnimation(target){
    let ele = document.getElementById(target);
    ele.style.animationPlayState = "running";
}

function getPage(name){
    let response = undefined;

    axios.get(`/${name}`)
    .then((res)=>response=res)
    .catch((err)=>{
        
    })
}