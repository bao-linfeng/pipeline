<template>
    <div class="download-wrap Montserrat_Bold">
        <div class="download-head">
            <div class="head-left" @click="goHome">
                <img src="../assets/DCAM/left.svg" alt="">
                <span>返回</span>
            </div>
        </div>
        <div class="download-content">
            <h3 class="title">影像拍摄</h3>
            <p class="summary">DCAM System</p>
            <ul class="dcam-box">
                <li v-for="(item, index) in DCAMList" :key="index">
                    <div class="circle">
                        <img :src="item.img" alt="">
                    </div>
                    <p>{{item.desc}}</p>
                </li>
            </ul>
        </div>
        <div class="download-foot">
            <div class="client-box" v-for="(item, index) in clientList" :key="index">
                <h3 class="client-name">{{item.name}}</h3>
                <div class="app-box">
                    <a class="app" :href="item2.url" target="_blank" download v-for="(item2, index2) in item.child" :key="index2">
                        <img :src="item2.img" alt="" />
                        <span>{{item2.name}}</span>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, reactive, onMounted, watch, watchEffect, computed, provide,readonly, toRefs } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useState, changePropertyValue } from '../store';
import { getQueryVariable, setValue, getValue } from '../util/ADS';
import { user } from '../util/api';
import img_1 from '../assets/DCAM/1.svg';
import img_2 from '../assets/DCAM/2.svg';
import img_3 from '../assets/DCAM/3.svg';
import img_4 from '../assets/DCAM/4.svg';
import iOS from '../assets/DCAM/iOS.svg';
import Android from '../assets/DCAM/Android.svg';
import Windows from '../assets/DCAM/Windows.svg';
import { version } from '../util/api.js';

export default {
    components: {
        
    },
    name: 'download',
    props: ['id'],
    setup(props, context) {
        const { token, origin } = toRefs(useState());
        const router = useRouter();
        const id = props.id;

        const DCAMList = ref([{'desc': '降低家谱磁盘邮寄成本', 'img': img_1},
        {'desc': '云端数据实时传输， 提高审核效率', 'img': img_2},
        {'desc': '实时智能化数据统计， 节省人工，减少出错率', 'img': img_3},
        {'desc': '为发票结算提供精准数据依据', 'img': img_4}]);

        const clientList = ref([{'name': '手机移动端', 'child': [
            {'name': 'iOS', 'img': iOS, 'url': 'http://d.firim.pro/v8ap'},
            {'name': 'Android', 'img': Android, 'url': 'http://d.maps9.com/3buz'}
        ]},
        {'name': '桌面客户端', 'child': [
			{'name': 'Nikon', 'img': Windows, 'url': 'http://1jiapu.com/DCam Setup 1.0.3.exe'}
        ]}]);

        const getVersion = async () => {
            const result = await version.getVersion();
            console.log(result.v);
            clientList.value = [{'name': '手机移动端', 'child': [
                {'name': 'iOS', 'img': iOS, 'url': 'http://d.firim.pro/v8ap'},
                {'name': 'Android', 'img': Android, 'url': 'http://d.maps9.com/3buz'}
            ]},
            {'name': '桌面客户端', 'child': [
                {'name': 'Nikon', 'img': Windows, 'url': 'http://1jiapu.com/DCam Setup '+result.v+'.exe'}
            ]}];
        }

        const goHome = () => {
            router.push('/');
        }

        onMounted(() => {
            getVersion();
        });

        return {
            DCAMList, clientList, goHome, 
        }
    }
}
</script>

<style lang="scss" scoped>
.download-wrap{
    position: relative;
    width: 100%;
    min-height: 100%;
    color: #322a31;
    font-size: 18px;
    text-align: center;
    z-index: 100;
}
.download-head{
    position: relative;
    width: calc(100% - 220px);
    padding: 0 110px;
    height: 78px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .head-left{
        display: flex;
        align-items: center;
        cursor: pointer;
        img{
            margin-right: 15px;
        }
    }
}
.download-content{
    position: relative;
    width: 100%;
    text-align: center;
    .title{
        position: relative;
        font-size: 44px;
        height: 85px;
        color: #322a31;
        line-height: 58px;
        &::after{
            content: '';
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 42px;
            height: 4px;
            background: #2478f2;
            border-radius: 4px;
        }
    }
    .summary{
        font-size: 30px;
        font-weight: bold;
        margin: 15px 0 30px 0;
    }
    .dcam-box{
        width: calc(100% - 100px);
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        li{
            .circle{
                width: 140px;
                height: 140px;
                margin: 0 auto;
                border: 1px dashed #ddd;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            p{
                width: 270px;
                font-size: 26px;
                margin: 7px 0 0 0;
            }
        }
    }
}
.download-foot{
    position: relative;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 64px 0 140px 0;
    font-size: 24px;
    z-index: 100;
    .client-box{
        margin: 0 40px;
        .client-name{
            position: relative;
            font-size: 36px;
            height: 68px;
            line-height: 58px;
            margin-bottom: 46px;
            &::after{
                content: '';
                position: absolute;
                bottom: 0;
                left: 50%;
                transform: translateX(-50%);
                width: 42px;
                height: 4px;
                background: #2478f2;
                border-radius: 4px;
            }
        }
        .app-box{
            width: 617px;
            height: 257px;
            background: #fafafa;
            border: 1px solid #989898;
            border-radius: 17px;
            display: flex;
            justify-content: space-around;
            align-items: center;
            .app{
                margin: 0 20px;
                cursor: pointer;
                color: #322a31;
                img{
                    display: block;
                    margin: 0 auto;
                }
                span{
                    height: 60px;
                    line-height: 60px;
                    font-weight: bold;
                }
            }
        }
    }
}
</style>