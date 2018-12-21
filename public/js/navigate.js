async function loadHome(event,button){
    heroTypeStop();
    try{
        let response = await getPage('home');
        console.dir(response);
        if(response.status === 200){
            startAnimation('hero-content');
            removeClassFromEle('overlay-panel','homeOverlay');
            applyClassToEle('overlay-panel','nonDistractOverlay');
            pushHTMLDataToEle(response.data,'content-panel');
            applyClassToEle('content-panel','contentPanelShown');
            removeEleFromDOM('hero-content');
        }
    }
    catch{
        Notification.displayNotification('error','Cannot display page at this time');
    }
    event.preventDefault();
}

function getPage(name){

    return axios.get(`/${name}`)
    .then((res)=>{return res})
    .catch((err)=>{
        throw new Error('could not display page');
    });
}

