//Notification system written by QronixDev of Kronofire LLC 2018 

class Notification{
    static init(){
        this.notificationPanel = document.getElementById('notificationPanel');
        this.displayingMessage = false;
        console.log('init done');
    }
    static async displayNotification(msgType,message){
        if(!this.displayingMessage){
            Notification.init();
            this.msgType = msgType;
            this.message = message;
            this.displayingMessage = true;
            console.log(`Displaying message: ${this.displayingMessage}`);
            if(isRealString(this.message)&&isRealString(this.msgType)){
                if(this.msgType==='error'){
                    this.notificationPanel.classList.add('errorMessage');
                }else if(this.msgType ==='warning'){
                    this.notificationPanel.classList.add('warningMessage');
                }else if(this.msgType === 'success'){
                    this.notificationPanel.classList.add('successMessage');
                }else{
                    this.notificationPanel.classList.add('warningMessage');
                }
            
                this.notificationPanel.innerText = this.message;
                this.notificationPanel.classList.remove('notificationHidden');
                await this.msgDisplayTimer();
                this.resetPanel();
            }else{
                throw new Error('Message or message type sent to notifcation system is not a string');
            }
        }else{
            throw new Error('Already displaying message');
        }
    }
    static msgDisplayTimer(){
        return new Promise((resolve,reject)=>{
            let id = setTimeout(()=>{
                clearTimeout(id);resolve();
                this.notificationPanel.classList.remove('notificationHidden');
                this.displayingMessage = false;
                console.log(`Displaying message: ${this.displayingMessage}`);
            },2000);
        });
    }
    static resetPanel(){
        this.notificationPanel.classList.toggle('notificationHidden');
        this.notificationPanel.classList.remove('errorMessage');
        this.notificationPanel.classList.remove('warningMessage');
        this.notificationPanel.classList.remove('successMessage');
    }
}
