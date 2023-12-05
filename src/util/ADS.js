

const timeago = (timestamp) => {
    let mistiming = Math.round((new Date())-timestamp)/1000;
  
    if(mistiming <= 1){
      return '1秒前';
    }
    let arrr = ['年','个月','星期','天','小时','分钟','秒'];
    let arrn = [31536000,2592000,604800,86400,3600,60,1];
    let inms=[];
    for(let i=6;i>=0;i--){
        let inm = Math.floor(mistiming/arrn[i]);
        if(inm != 0){
            inms.push(inm+arrr[i]+'前');
        }
    }

    return inms[inms.length-1]
}

const getLocalTime = (nS, symbol, index) => {
    if(nS){
        symbol = symbol || '-';
        index = index || 5;
        var date = new Date(nS),
            Y, M, D, h, m, s;
        Y = date.getFullYear() + symbol;
        M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + symbol;
        D = date.getDate() + ' ';
        h = appendzero(date.getHours()) + ':';
        m = appendzero(date.getMinutes()) + ':';
        s = appendzero(date.getSeconds());
        switch (index) {
            case 1:
                return (Y + M + D);
            case 2:
                return (Y + M);
            case 3:
                return (M + D);
            case 4:
                return (h + m + s);
            case 5:
                return (Y + M + D + h + m + s);
        }
    }else{
        return '';
    }
}

const setValue = (label,value) => {
	window.localStorage.setItem(label,value);
}

const getValue = (label) => {
	return window.localStorage.getItem(label);
}

const appendzero = (s) => {
	if (s < 10) return "0" + s;
	else return s;
}

const obj2str = (O) => {
    let s ='';
    for(let k in O){
        s = s + (!s ? '?' : '&') + k + '=' +O[k];
    }
    return s;
}

const createMsg = (msg='ok', flag = false) => {
    let time = Date.now(),className = flag ? 'msg_wrap_ok' : 'msg_wrap_warn';

    let str = '<span id='+time+' class="msg_wrap '+className+'">'+msg+'</span>';
    let range = document.createRange();
    range.selectNodeContents(document.documentElement); 
    let fragment = range.createContextualFragment(str);
    document.body.appendChild(fragment);

    let timer = setTimeout(function(){
        document.body.removeChild(document.getElementById(time));
        clearTimeout(timer);
    },3000);
}

const initMediaDevices = (config,callback) => {// 打开摄像头 麦克风
    if (navigator.mediaDevices === undefined) {
        navigator.mediaDevices = {};
    }
    if (navigator.mediaDevices.getUserMedia === undefined) {
        navigator.mediaDevices.getUserMedia = function (constraints) {
            var getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
            if (!getUserMedia) {
                return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
            }
            return new Promise(function (resolve, reject) {
                getUserMedia.call(navigator, constraints, resolve, reject);
            });
        }
    }

    navigator.mediaDevices.getUserMedia(config).then(stream => {
        callback(stream);
    }).catch(console.error);
}

const qrcode = (url, id, w = 180) => {
    let qrcode = document.getElementById(id);
    qrcode.innerHTML = '';
    let QRCode = window.QRCode;
    let adaiQrcode = new QRCode(id,{
        text: url,
        width: w,
        height: w,
        colorDark : '#000000',
        colorLight : '#ffffff',
        correctLevel : QRCode.CorrectLevel.H
    });
}

const cacheImage = (data, callback) =>{
    let bg = new Image();
    bg.setAttribute("crossOrigin",'Anonymous');

    bg.src = data;
    bg.onload = () => {
        callback(data)
    }
}

Array.prototype.shuffle = function() {
    let m = this.length, i;
    while (m) {
        i = (Math.random() * m--) >>> 0;
        [this[m], this[i]] = [this[i], this[m]]
    }
    return this;
}

function getQueryVariable(variable){
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for(var i=0;i<vars.length;i++) {
         var pair = vars[i].split("=");
         if(pair[0] == variable){return pair[1];}
    }
    return '';
}

function getTodayZero(timestamp = ''){
    if(timestamp){
        return new Date(new Date(timestamp).toLocaleDateString()).getTime();
    }else{
        return new Date(new Date().toLocaleDateString()).getTime();
    }
}

function getSurplusDays(timestamp){
    return (getTodayZero() - getTodayZero(timestamp))/24/60/60/1000;
}

// 命名导出 可以导出多个
export {
    timeago,
    getLocalTime,
    setValue,
    getValue,
    obj2str,
    createMsg,
    initMediaDevices,
    qrcode,
    cacheImage,
    getQueryVariable,
    getSurplusDays
}