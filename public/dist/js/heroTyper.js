var originalText=[];async function heroType(e){let t=e.split("");for(char of(originalText=t,t))await autoType(char);updateText(),resetText()}function autoType(e){let t=document.getElementById("hero-banner");return new Promise((n,o)=>{let r=setTimeout(function(){t.innerText+=e,clearInterval(r),n(!0)}.bind(t),Math.floor(400*Math.random()))})}function updateText(){document.getElementById("hero-banner");setInterval(function(){if(randomChoice()){let e=document.getElementById("hero-banner").innerText.split(""),t=Math.floor(Math.random()*e.length)-1,n=String.fromCharCode(Math.floor(93*Math.random())+33);e[t];e[t]=n,setText(e.join("").trim())}},200)}function setText(e){document.getElementById("hero-banner").innerText=e}function resetText(e,t){let n=document.getElementById("hero-banner").innerText.split(""),o=[];setInterval(()=>{for(let e=0;e<n.length;e++)randomChoice()?o[e]=originalText[e]:o[e]=n[e];setText(o.join(""))},400)}function randomChoice(){return Math.floor(40*Math.random())>=30}