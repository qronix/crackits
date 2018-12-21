class Notification{static init(){this.notificationPanel=document.getElementById("notificationPanel"),this.displayingMessage=!1,console.log("init done")}static async displayNotification(i,s){if(this.displayingMessage)throw new Error("Already displaying message");if(Notification.init(),this.msgType=i,this.message=s,this.displayingMessage=!0,console.log(`Displaying message: ${this.displayingMessage}`),!isRealString(this.message)||!isRealString(this.msgType))throw new Error("Message or message type sent to notifcation system is not a string");"error"===this.msgType?this.notificationPanel.classList.add("errorMessage"):"warning"===this.msgType?this.notificationPanel.classList.add("warningMessage"):"success"===this.msgType?this.notificationPanel.classList.add("successMessage"):this.notificationPanel.classList.add("warningMessage"),this.notificationPanel.innerText=this.message,this.notificationPanel.classList.remove("notificationHidden"),await this.msgDisplayTimer(),this.resetPanel()}static msgDisplayTimer(){return new Promise((i,s)=>{let e=setTimeout(()=>{clearTimeout(e),i(),this.notificationPanel.classList.remove("notificationHidden"),this.displayingMessage=!1,console.log(`Displaying message: ${this.displayingMessage}`)},2e3)})}static resetPanel(){this.notificationPanel.classList.toggle("notificationHidden"),this.notificationPanel.classList.remove("errorMessage"),this.notificationPanel.classList.remove("warningMessage"),this.notificationPanel.classList.remove("successMessage")}}