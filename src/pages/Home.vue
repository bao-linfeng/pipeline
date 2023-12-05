<template>
    <div class="home-wrap Montserrat_Bold">
        <div class="home-head">
            <h3 class="logo">PipeLine</h3>
            <div class="head-right" v-if="token">
                <div class="avatar" @click="isLogin = !isLogin" :style="{backgroundImage: 'url('+avatar+')'}"></div>
                <span class="userName" @click="isLogin = !isLogin">{{userName}}</span>
                <span class="logout" @click="logout">退出</span>
            </div>
            <div class="head-right" v-else>
                <button class="btn" @click="login">登录</button>
                <button class="btn active" @click="login">注册</button>
            </div>
        </div>
        <div class="home-content">
            <h3 class="title">PipeLine</h3>
            <p class="summary Montserrat_Regular">集家谱查重、拍摄、云存储、数字化暨质量管控一站式解决方案</p>
            <ul class="system-box">
                <li :class="{active: systemIndex === index}" @click="changeSystem(item, index)" v-for="(item, index) in systemList" :key="index">
                    <div class="circle">
                        <img :src="item.img" alt="">
                    </div>
                    <h3 :class="{active: systemIndex === index}">{{item.CN}}</h3>
                    <p class="Montserrat_Regular">{{item.ZN}}</p>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { ref, reactive, onMounted, watch, watchEffect, computed, provide,readonly, toRefs } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useState, changePropertyValue } from '../store';
import { getQueryVariable, setValue, getValue, createMsg } from '../util/ADS';
import { user } from '../util/api';
import img_1 from '../assets/Home/1.svg';
import img_2 from '../assets/Home/2.svg';
import img_3 from '../assets/Home/3.svg';
import img_4 from '../assets/Home/4.svg';

export default {
    components: {
        
    },
    name: 'home',
    props: ['id'],
    setup(props, context) {
        const { token, origin, avatar, userName, switchToken } = toRefs(useState());
        const router = useRouter();
        const id = props.id;
        console.log(token.value);

        const getuserinfo = async (t) => {
            const { result } = await user.getUserInfo(t);
            console.log(result);
            changePropertyValue('userKey', result._key);
            changePropertyValue('userName', result.profile && (result.profile.trueName || result.profile.nickName));
            changePropertyValue('profile', result.profile);
            changePropertyValue('avatar', result.profile.avatar);
            setValue('userKey', result._key);
            setValue('userName', result.profile && (result.profile.trueName || result.profile.nickName));
            setValue('profile', JSON.stringify(result.profile));
            setValue('avatar', result.profile && result.profile.avatar);
            router.push('/');
        }

        // 查重 => 26(当归);拍机 => 52;有谱 => 28;供应商 => 
        const systemList = ref([{'CN': '谱目查重', 'ZN': 'Duplication System', 'url': 'http://genealogy.1jiapu.com/fs/genealogySearch', 'img': img_1, 'appHigh': '26'}, 
        {'CN': '影像拍摄', 'ZN': 'DCAM System', 'url': '/download', 'img': img_2, 'appHigh': '52'},
        {'CN': '家谱录入', 'ZN': 'Index System', 'url': 'https://youpu.qingtime.cn', 'img': img_3, 'appHigh': '28'},
        {'CN': '供应商管理', 'ZN': 'Supplier Manage System', 'url': 'http://suppliersys.1jiapu.com', 'img': img_4, 'appHigh': '26'}]);
        const systemIndex = ref(-1);
        const changeSystem = (data, i) => {
            systemIndex.value = i;
            if(data.url == '/download'){
                router.push(data.url);
            }else{
                window.open(data.url+(switchToken.value[data.appHigh] ? '?token='+switchToken.value[data.appHigh] : ''));
                // if(token.value){
                //     window.open(data.url+'?'+switchToken.value[data.appHigh]);
                // }else{
                //     openLogin();
                // }
            }
        }

        const switchTokenBatch = async (t) => {
            const result = await user.switchTokenBatch(t, [26, 28, 52, 56]);
            if(result.statusCode == 200){
                changePropertyValue('switchToken', result.result);
            }else{
                createMsg(result.msg);
            }
        }

        onMounted(() => {
            const TOKEN = getQueryVariable('token');
            if(TOKEN){
                getuserinfo(TOKEN);
                changePropertyValue('token', TOKEN);
                setValue('token', TOKEN);
                switchTokenBatch(TOKEN);
            }
            if(token.value){
                switchToken.value ? null : switchTokenBatch(token.value);
            }
        });

        const login = () => {
            if(!token.value){
                openLogin();
            }
        }

        const isLogin = ref(false);
        const logout = () => {
            isLogin.value = false;
            changePropertyValue('token', '');
            changePropertyValue('userKey', '');
            changePropertyValue('userName', '');
            changePropertyValue('profile', '');
            changePropertyValue('avatar', '');
            changePropertyValue('switchToken', '');
            window.localStorage.clear();
        }

        const openLogin = () =>{
            window.open(
                `https://account.qingtime.cn?apphigh=26&logo=https://cdn.qingtime.cn/supplierSystem.svg&redirect=${origin.value}`,
                "new",
                `width=360, height=560, resizable=false, toolbar=no, menubar=no, location=no, status=no, top=${
                (screen.height - 560) / 2
                }, left=${(screen.width - 360) / 2}`
            );
        }

        return {
            login, systemList, systemIndex, changeSystem, token, avatar, userName, logout, isLogin, 
        }
    }
}
</script>

<style lang="scss" scoped>
.home-wrap{
    position: relative;
    width: 100%;
    min-height: 100%;
    color: #333;
    font-size: 16px;
    z-index: 100;
}
.home-head{
    position: relative;
    width: calc(100% - 240px);
    height: 78px;
    padding: 0 120px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .logo{
        font-size: 26px;
        line-height: 44px;
        opacity: 0;
    }
    .head-right{
        position: relative;
        height: 100%;
        display: flex;
        align-items: center;
        .avatar{
            width: 40px;
            height: 40px;
            background-position: 50% 50%;
            background-repeat: no-repeat;
            background-size: cover;
            border-radius: 20px;
            cursor: pointer;
        }
        .userName{
            margin: 0 0 0 10px;
            cursor: pointer;
        }
        .logout{
            margin-left: 10px;
            cursor: pointer;
            // position: absolute;
            // width: 100%;
            // height: 40px;
            // line-height: 40px;
            // cursor: pointer;
            // top: calc(100% + 5px);
            // left: 0;
            // box-shadow: 0 0 1px 2px #ddd;
            // text-align: center;
        }
        .btn{
            width: 80px;
            height: 40px;
            line-height: 40px;
            font-size: 18px;
            background: #fff;
            color: #322A31;
            border: none;
            outline: none;
            cursor: pointer;
            &.active{
                background: #3296ff;
                border-radius: 20px;
                color: #fff;
                margin-left: 20px;
            }
        }
    }
}
.home-content{
    position: relative;
    width: calc(100% - 220px);
    text-align: center;
    margin: 0 auto;
    padding-bottom: 30px;
    z-index: 100;
    .title{
        position: relative;
        padding: 30px 0 41px 0;
        font-size: 48px;
        line-height: 44px;
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
        height: 85px;
        line-height: 85px;
        // font-weight: bold;
        margin: 30px 0 100px 0;
    }
    .system-box{
        display: flex;
        justify-content: space-around;
        align-items: center;
        color: #322A31;
        font-size: 20px;
        li{
            cursor: pointer;
            &.active{
                color: #3296FF;
            }
            &:hover{
                color: #3296FF;
            }
            .circle{
                margin: 0 auto;
                width: 200px;
                height: 200px;
                // background: url('../assets/circle.svg') 50% 50% no-repeat;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            h3{
                position: relative;
                font-size: 30px;
                height: 85px;
                line-height: 85px;
                margin: 10px 0 13px 0;
                &.active{
                    &::after{
                        content: '';
                        position: absolute;
                        bottom: 0;
                        left: 50%;
                        transform: translateX(-50%);
                        width: 28px;
                        height: 4px;
                        background: #2478f2;
                        border-radius: 4px;
                    }
                }
            }
            p{
                height: 94px;
            }
        }
    }
}
</style>