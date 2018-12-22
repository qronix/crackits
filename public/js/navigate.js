async function navigate(event,button,route){
    // heroTypeStop();
    try{
        let response = await getPage(route);
        console.dir(response);
        console.log('getting route');
        let location = getCurrentRoute();
        console.log(location);
        if(response.status === 200 && route === 'home' && location === ""){
            startAnimation('hero-content');
            removeClassFromEle('overlay-panel','homeOverlay');
            applyClassToEle('overlay-panel','nonDistractOverlay');
            pushHTMLDataToEle(response.data,'content-panel');
            applyClassToEle('content-panel','contentPanelShown');
            removeEleFromDOM('hero-content');
            showNavBar();
            let glitchTyper = new GlitchTyper("Crackits","home-nav-logo");
            glitchTyper.init();
        }
    }
    catch{
        Notification.displayNotification('error','Cannot display page at this time');
    }
    event.preventDefault();
}

function showNavBar(){
    let target = document.getElementById('nav-bar');
    target.setAttribute('hidden','false');
}
function getPage(name){
    return axios.get(`/${name}`)
    .then((res)=>{return res})
    .catch((err)=>{
        throw new Error('could not display page');
    });
}

