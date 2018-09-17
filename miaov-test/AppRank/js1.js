var btn1 = document.getElementsByClassName('leftRank')[0];
var btn2 = document.getElementsByClassName('rightRank')[0];


function RankChange(ul1,ul2) {
    var show = document.getElementById(ul1);
    var hide = document.getElementById(ul2);

    show.style.display = 'block';
    hide.style.display = 'none';
}

/*btn1.onclick = RankChange('apps','games');
btn2.onclick = RankChange('games','apps');*/



btn1.onclick = function () {
    RankChange('apps','games');
    btn1.style.background = '#35E6E9';
    btn2.style.background = 'none';
    activeApp('apps');
}


btn2.onclick = function () {
    RankChange('games','apps');
    btn2.style.background = '#35E6E9';
    btn1.style.background = 'none';
    activeApp('games');
}




function activeApp(ul) {
    var list = document.getElementById(ul);
    var apps = list.getElementsByTagName('li');
    var flag =0;

    //鼠标移开时，默认高亮第一个
    list.onmouseout = function(){
        apps[0].className = 'active';
    }

    //鼠标移入时，判断若不是在第一个上，取消高亮第一个
    list.onmouseover = function(){
        apps[0].onmouseover =function(){
            flag =1;
        }
        if( flag === 1){}
        else {
            apps[0].className = 'none';
        }
        flag =0;
    }


    for(var i=0;i<apps.length;i++){

        apps[i].onmouseover = function () {
            this.className = 'active';
        }

        apps[i].onmouseout = function () {
            this.className = 'none';
        }

    }

}
