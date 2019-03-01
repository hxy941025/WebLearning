var email_input = document.getElementById("email-input");
var email_list = document.getElementById("email-sug-wrapper");
var postfixList = ['163.com', 'gmail.com', '126.com', 'qq.com', '263.net'];
var pastli =document.getElementsByTagName("li");

var userexp = "";
var flag =0;
var downnum = 0; downflag = 0;upflag = 0;

//单个按键按下，4个事件的顺序:keydown press oninput up
email_input.addEventListener("keydown",keydown);
// email_input.addEventListener("keypress",keypress);
email_input.addEventListener("input",showlist);
// email_input.addEventListener("keyup",keyup);

email_list.addEventListener("click",selectli);


function keydown(ev) {
    if(ev.keyCode == 27){
        email_input.value = "";
        email_list.style.display = "none" ;
    }
    if(ev.keyCode == 40){
        if(downflag == 1){
            downnum = 0;
            keyselect(downnum);
            pastli[pastli.length-1].style.backgroundColor = "white";
            downflag = 0;
        }
        else {
            pastli[pastli.length-1].style.backgroundColor = "white";
            downnum ++;
            keyselect(downnum);
            pastli[downnum-1].style.backgroundColor = "white";
            if(downnum == pastli.length-1){
                downflag=1;
            }
        }
    }
    if(ev.keyCode == 38) {
        if(upflag == 1){
            downnum = pastli.length-1;
            keyselect(downnum);
            pastli[0].style.backgroundColor = "white";
            upflag =0;
        }
        else {
            pastli[0].style.backgroundColor = "white";
            downnum --;
            keyselect(downnum);
            pastli[downnum+1].style.backgroundColor = "white";
            if(downnum == 0){
                upflag=1;
            }
        }
    }
    if(ev.keyCode == 13){
        email_input.value = pastli[downnum].innerHTML;
        email_list.style.display = "none" ;
        clearli();
        flag=1;
    }
}

function showlist() {
    email_list.style.display = "block" ;
    if(flag==0){
        createlist();
        keyselect();
    }
    else {
        for(var i =0;i<postfixList.length;i++){
            var create_li=document.createElement("li");
            create_li.innerHTML = getvalue() +"@"+ postfixList[i];
            email_list.appendChild(create_li);
        }
        flag=0;
        keyselect();
    }
}


function getvalue() {
    var input = email_input.value.trim();
    var output;

    input = input.replace(/&/g,"&");
    input = input.replace(/</g,"<");
    input = input.replace(/>/g,">");
    input = input.replace(/ /g," ");
    input = input.replace(/\'/g,"\'");
    input = input.replace(/\"/g,"\"");

    if(input.search("@") !== -1){
        output = input.slice(0,input.search("@"));
        userexp = input.slice(input.search("@")+1,input.length)
    }
    else output = input;
    return output;
}

function createlist() {
    var pastli =document.getElementsByTagName("li");
    var j =0;

    if(getvalue() == ""){
        email_list.style.display = "none" ;
    }

    clearli();

    if(userexp == ""){
        for(var i =0;i<postfixList.length;i++){
            var create_li=document.createElement("li");
            create_li.innerHTML = getvalue() +"@"+ postfixList[i];
            email_list.appendChild(create_li);
        }
    }
    else {
        for(var i =0;i<postfixList.length;i++) {
            if (postfixList[i].match(userexp) !== null) {
                var create_li = document.createElement("li");
                create_li.innerHTML = getvalue() + "@" + postfixList[i];
                email_list.appendChild(create_li);
            }
            else{
                j++;
                if(j==5){
                    for(var i =0;i<postfixList.length;i++){
                        var create_li=document.createElement("li");
                        create_li.innerHTML = getvalue() +"@"+ postfixList[i];
                        email_list.appendChild(create_li);
                    }
                }
            }
        }
    }

}

//清除已有的li
function clearli() {
    var len = pastli.length;

    for (var i=0;i<len;i++){
        email_list.removeChild(pastli[0]);
    }
}

//将鼠标点击的li内容放入输入框中
function selectli(ev) {
    email_input.value = ev.target.innerHTML;
    clearli();
    flag =1;
}

//上下+回车键控制li选项
function keyselect(num=0) {
    var len = pastli.length;
    if(len !==0){
        pastli[num].style.backgroundColor = "yellow";
    }
}