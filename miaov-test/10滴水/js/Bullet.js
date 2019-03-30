export default class{

    constructor(dir){
        this.div = null;
        this.dir = dir;
        this.left = 0;
        this.top = 0;
        this.timer = null;
        //不确定具体操作的功能不写在类里，通过事件调用会更方便
        this.onmove = function () {
        };
        //用于碰撞检测
        this.width = 100;
        this.height = 100;
}


    draw(wrap){
        this.div = document.createElement('div');
        this.div.classList.add('bullet');
        this.div.classList.add(`${this.dir}`);

        wrap.appendChild(this.div)

        this.move();
    }

    setPosition(left, top){
        this.left  = left;
        this.top = top;
        this.div.style.left = this.left + 'px';
        this.div.style.top = this.top + 'px';
    }

    move(){
        this.timer = setInterval( () => {
            switch (this.dir){
                case 'left':this.left -=2;
                break;
                case 'top': this.top -=2;
                break;
                case 'right': this.left +=2;
                break;
                case 'bottom': this.top +=2;
                break;
            }
            this.setPosition(this.left,this.top);
            typeof this.onmove === "function" && this.onmove();
        },15)
    }

    collision( arr ) {
        // 当前子弹的中心点坐标
        let p1 = {
            x: this.left + this.width / 2,
            y: this.top + this.height / 2
        }
        for (let i=0; i<arr.length; i++) {

            let p2 = {
                x: arr[i].left + arr[i].width / 2,
                y: arr[i].top + arr[i].height / 2
            }

            if ( p1.x > p2.x - 10 && p1.x < p2.x + 10 && p1.y > p2.y - 10 && p1.y < p2.y + 10 ) {
                return arr[i];
            }

        }
    }

//    碰撞完了销毁子弹
    destory(){
        clearInterval(this.timer);
        this.div.remove();
    }



}