import WaterPolo from './WaterPolo.js';
import Bullet from './Bullet.js';

export default {
    //水滴数
    water : 10,
    //游戏主体容器
    wrap : null,
    //剩余水滴数
    num : null,
    value : null,
    //水球集合，用于碰撞检测
    waterPolos : [],
    //子弹集合，用于检测游戏是否结束
    bullets: [],

//    游戏开始进程
    start(){

        if(this.wrap === null) throw new Error('请设置容器');

        //更新水滴数
        this.num.innerHTML = this.water;
        this.value.style.height = this.water*20 + 'px';

        for(var i=0; i<36; i++) {
            let waterPolo = new WaterPolo(Math.floor(Math.random()*5));
            this.waterPolos.push(waterPolo);
            waterPolo.draw(this.wrap);
            //使用箭头函数，将this绑定到当前定义环境,即game类
            waterPolo.onclick = () => {
                if(this.water > 0){
                    this.water --;
                    waterPolo.levelUp();
                    this.num.innerHTML = this.water;
                    this.value.style.height = this.water*20 + 'px';
                }
            }

            waterPolo.onboom = () => {
                var bulletLeft = new Bullet('left');
                this.bullets.push(bulletLeft);
                bulletLeft.draw(this.wrap);
                bulletLeft.setPosition(waterPolo.left-50, waterPolo.top);
                bulletLeft.onmove =() =>{
                    this.bulletMove(waterPolo, bulletLeft);
                };


                var bulletRight = new Bullet('right');
                this.bullets.push(bulletRight);
                bulletRight.draw(this.wrap);
                bulletRight.setPosition(waterPolo.left+50, waterPolo.top);
                bulletRight.onmove =() =>{
                    this.bulletMove(waterPolo, bulletRight);
                };

                var bulletTop = new Bullet('top');
                this.bullets.push(bulletTop);
                bulletTop.draw(this.wrap);
                bulletTop.setPosition(waterPolo.left, waterPolo.top-50);
                bulletTop.onmove =() =>{
                    this.bulletMove(waterPolo, bulletTop);
                };

                var bulletBottom = new Bullet('bottom');
                this.bullets.push(bulletBottom);
                bulletBottom.draw(this.wrap);
                bulletBottom.setPosition(waterPolo.left, waterPolo.top+50);
                bulletBottom.onmove =() =>{
                    this.bulletMove(waterPolo, bulletBottom);
                };
            }
        }
    },

    //将子弹碰撞函数封装起来方便调用
    bulletMove(waterPolo, bullet) {
        //排除自身与level为0的元素
        let waterPolos = this.waterPolos.filter(wp => {
            return wp !== waterPolo && wp.level > 0;
        });
        let wp = bullet.collision(waterPolos);
        if (wp) {
            bullet.destory();
            wp.levelUp();
            this.bullets = this.bullets.filter( bu => bu !== bullet);
        }

        //销毁越界后的子弹
        if (bullet.left < -bullet.width || bullet.left > this.wrap.offsetWidth || bullet.top < -bullet.height || bullet.top > this.wrap.offsetHeight) {
            bullet.destory();
            this.bullets = this.bullets.filter( bu => bu !== bullet);
        }

        // console.log(this.bullets.length)
        if(this.bullets.length === 0){
            let wps = this.waterPolos.filter( wp => wp.level !== 0 );
            if(this.water === 0){
                alert('Game Over');
                return
            }
            if(wps.length === 0 && this.water > 0){
                alert('PASS')
                return
            }
        }
    }

}