/*优化
* 1.优化上下键bug
* 2.优化上下键时hover不显示颜色的bug
* 3.将先生成li再筛选改为先筛选再生成,每次进生成函数时初始化，就不用考虑删除了
* 4.待续
*/

var email_input = document.getElementById("email-input");
var email_list = document.getElementById("email-sug-wrapper");
var postfixList = ['163.com', 'gmail.com', '126.com', 'qq.com', '263.net'];
var existli =document.getElementsByTagName("li");
var liIndex = 0;hide=0


//绑定监听事件
email_input.addEventListener("input",showList);
email_input.addEventListener("keydown",scanList);
email_list.addEventListener("click",clickList);


//当用户开始输入时，创建并显示ul
function showList(){
    addLi();
    listControl();
}

//点击li，将其内容放上输入框
function clickList(ev) {
    email_input.value = ev.target.innerHTML;
    email_list.style.display = "none";
}

//用上下键和回车键选择li,每次改变index，根据index生成li
function scanList(ev) {
    if(ev.keyCode == 40){
        if(liIndex < existli.length-1){
            liIndex++;
        }
        else {
            liIndex = 0;
        }
    }
    if(ev.keyCode == 38){
        if(liIndex == 0){
            liIndex = existli.length-1;
        }
        else {
            liIndex--;
        }
    }
    if(ev.keyCode == 13){
        email_input.value = existli[liIndex].innerHTML;
    }
    else if(ev.keyCode!=13 && ev.keyCode!=38 &&ev.keyCode!=40){
        liIndex = 0;
    }
    addLi();
}


//获得用户输入的值
function getInput() {
    var value = email_input.value;
    value.trim();
    return value;
}


//控制列表的显示和隐藏
function listControl() {
    if(getInput() == ""){
        email_list.style.display = "none";
    }
    else {
        email_list.style.display = "block";
    }
}

//根据用户的输入生成对应的li，若没匹配上，则全部生成
function createList() {
    var allLi = [];
    var userli = [];
    var inputValue = getInput();//输入框的值
    var userValue = inputValue;//用来拼接的字符串
    var matchValue ;//用来匹配的字符串

    //如果包含@，则切成两段，前面用来拼接，后面匹配；
    if(inputValue.indexOf("@") !== -1){
        userValue = inputValue.slice(0,inputValue.search("@"));
        matchValue = inputValue.slice(inputValue.search("@")+1);
    }

    //根据输入，判断是返回匹配的li还是全部li
    for(var i =0;i<postfixList.length;i++){
        //如果匹配上了，只生成匹配到的li，没匹配上，则全部生成
        if(matchValue){
            if(postfixList[i].indexOf(matchValue)==0){
                var liValue = userValue + "@" +postfixList[i];
                userli.push(liValue);
            }
        }
        else {
            var liValue = userValue + "@" +postfixList[i];
            userli.push(liValue);
        }
        
        var allValue = userValue + "@" +postfixList[i];
        allLi.push(allValue);
    }
    return userli.length>0? userli:allLi;
}

//将生成的内容，添加刀ul的li中
function addLi() {
    email_list.innerHTML="";
    var lis = createList();
    for(var i=0;i<lis.length;i++){
        var newLi = document.createElement("li");
        newLi.innerHTML = lis[i];
        email_list.appendChild(newLi);
    }
    existli[liIndex].style.backgroundColor = "#ccc"
}

