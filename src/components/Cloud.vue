<template>
    <div class="cloud_wrap" @mousemove='listener($event)'>
        <img v-for='(item,index) in tags' :key="index" :style="{top: item.y+'px', left: item.x+'px', height: 20*(600/(600-item.z))+'px', opacity: (400+item.z)/600}" :src="item.sex" alt="" />
    </div>
</template>
<script>
import { mapState, mapActions, mapGetters } from "vuex";
import man from '../assets/BootPage/man.png';
import woman from '../assets/BootPage/woman.png';

export default {
    name: "cloud",
    props:{
        
    },
    data: () => {
        return {
            width: 460,//svg宽度
            height: 460,//svg高度
            tagsNum: 50,//标签数量
            RADIUS: 230,//球的半径
            speedX: Math.PI/360,//球一帧绕x轴旋转的角度
            speedY: Math.PI/360,//球-帧绕y轴旋转的角度
            tags: [],
        };
    },
    created:function(){
        
    },
    mounted:function(){
        this.init();
        const render = () => {
            this.rotateX(this.speedX);
            this.rotateY(this.speedY);

            window.rafId = requestAnimationFrame(render); //请求再次执行渲染函数render，渲染下一帧
        }
        render();
    },
    beforeDestroy:function(){
        if(window.rafId){
            cancelAnimationFrame(window.rafId);
        }
    },
    methods:{
        rotateX(angleX){
            var cos = Math.cos(angleX), sin = Math.sin(angleX), y = 0, z = 0;
            for(let tag of this.tags){
                y = (tag.y - this.RADIUS) * cos - tag.z * sin  + this.RADIUS;
                z = tag.z * cos + (tag.y - this.RADIUS) * sin;
                tag.y = y;
                tag.z = z;
            }
        },
        rotateY(angleY){
            var cos = Math.cos(angleY), sin = Math.sin(angleY), x = 0, z = 0;
            for(let tag of this.tags){
                x = (tag.x - this.RADIUS) * cos - tag.z * sin + this.RADIUS;
                z = tag.z * cos + (tag.x - this.RADIUS) * sin;
                tag.x = x;
                tag.z = z;
            }
        },
        listener(event){//响应鼠标移动
            var x = event.clientX - this.RADIUS;
            var y = event.clientY - this.RADIUS;
            this.speedX = x*0.0001>0 ? Math.min(this.RADIUS*0.00002, x*0.0001) : Math.max(-this.RADIUS*0.00002, x*0.0001);
            this.speedY = y*0.0001>0 ? Math.min(this.RADIUS*0.00002, y*0.0001) : Math.max(-this.RADIUS*0.00002, y*0.0001); 
        },
        init(){
            let tags=[];
            for(let i = 0; i < this.tagsNum; i++){
                let tag = {};
                let k = -1 + (2 * (i + 1) - 1) / this.tagsNum;
                let a = Math.acos(k);
                let b = a * Math.sqrt(this.tagsNum * Math.PI)//计算标签相对于球心的角度
                tag.text = '1jiapu';
                tag.x = this.RADIUS +  this.RADIUS * Math.sin(a) * Math.cos(b);//根据标签角度求出标签的x,y,z坐标
                tag.y = this.RADIUS +  this.RADIUS * Math.sin(a) * Math.sin(b); 
                tag.z = this.RADIUS * Math.cos(a);
                tag.color = "rgb("+parseInt(Math.random()*255)+","+parseInt(Math.random()*255)+","+parseInt(Math.random()*255)+")";
                tag.href = '';//给标签添加链接
                tag.sex = Math.random() > 0.5 ? man : woman;
                tags.push(tag);
            }
            this.tags = tags;
        },
    },
    computed:{
        ...mapState({
            
        })
    },
};
</script>
<style scoped lang="scss">
.cloud_wrap{
    position: relative;
    width: 460px;
    height: 460px;
    overflow: hidden;
    img{
        position: absolute;
        cursor: pointer;
    }
}
</style>
