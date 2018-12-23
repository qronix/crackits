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
            removeClassFromEle('nav-bar','hidden');
            applyClassToEle('overlay-panel','nonDistractOverlay');
            pushHTMLDataToEle(response.data,'content-panel');
            applyClassToEle('content-panel','contentPanelShown');
            removeEleFromDOM('hero-content');
            showNavBar();
            let glitchTyper_logo = new GlitchTyper("Crackits","home-nav-logo",false);
            glitchTyper_logo.init();
            let glitchTyper_hero = new GlitchTyper("Open Alpha Coming Soon...","home-hero-content",true);
            glitchTyper_hero.init();
        }
    }
    catch{
        Notification.displayNotification('error','Cannot display page at this time');
    }
    event.preventDefault();
}

function showNavBar(){
    let target = document.getElementById('nav-bar');
    target.removeAttribute('hidden');
}
function getPage(name){
    return axios.get(`/${name}`)
    .then((res)=>{return res})
    .catch((err)=>{
        throw new Error('could not display page');
    });
}

