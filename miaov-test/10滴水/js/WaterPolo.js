export default class{

    constructor(level) {
        this.level = level;
    //    当一个变量需要成为类中全局变量，则
        this.div = null;
        this.img = null;
    //    定义水球位置;
        this.left = 0;
        this.top = 0;
    //    为水滴定义一个onclick的属性，方便外部调用；
        this.onclick = function () {};
        this.onboom = function () {};
        //用于碰撞检测
        this.width = 100;
        this.height = 100;
    }

    draw(obj){

            this.div = document.createElement('div');
            this.div.classList.add('water-polo');
            this.img = document.createElement('img');
            this.img.src = './img/'+ this.level +'.png';
            this.div.appendChild(this.img);

            //由于css3中添加两个相同的动画，动画效果会消失
            this.img.addEventListener('animationend', ()=> {
                this.img.classList.remove('level-up');
            });


            //直接这么写 后面levelup的this会指向div的this
            // this.div.onclick = this.levelUp;
            //使用bind修改this指向
            this.div.onclick = () => {
                //调用onclick事件
                typeof this.onclick === "function" && this.onclick();
            };


            obj.appendChild(this.div);

            this.left = this.div.offsetLeft;
            this.top = this.div.offsetTop;


    }

    levelUp(){
        this.level ++;
        if(this.level > 4){
            this.level = 0;
        //    水滴满了，将分裂出来四个小水滴
            typeof this.onboom() === "function" && this.onboom();
        }
        this.img.src = `./img/${this.level}.png`;
        this.img.classList.add('level-up');
    }
}