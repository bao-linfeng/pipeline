<template>
    <div class="page-wrap" @scroll.passive="handleScroll">
        <div class="section section-1" id="0">
            <div class="head-box">
                <img class="logo" src="../assets/BootPage/section_1_logo_s.png" alt="">
                <ul class="nav-wrap">
                    <li class="nav-box" :class="{active: navIndex === index}" v-for="(item, index) in navList" :key="index" @click="handleChangeNav(index)">{{item}}</li>
                </ul>
                <div v-if="token" class="login-box">
                    <span class="userName">{{userName}}</span>
                    <button class="btn" @click="logout">退出</button>
                </div>
                <button v-else class="btn" @click="login">立即登录</button>
            </div>
            <div class="content-box">
                <div class="summary">
                    <div class="summary-box" :style="{top: top+'px'}">{{summary}}</div>
                    <div class="summary-box" :style="{top: top2+'px'}">{{summary}}</div>
                </div>
                <img class="logo" src="../assets/BootPage/section_1_logo.png" alt="">
            </div>
            <Fireworks />
        </div>
        <div class="section section-2" id="1">
            <div class="content-box">
                <div class="genealogy-summary">
                    <img class="logo" src="../assets/BootPage/section_2_logo.png" alt="">
                    <p class="summary">{{genealogySummary}}</p>
                    <a target="_blank" :href="'http://genealogy.1jiapu.com/fs/genealogySearch'+(switchToken['26'] ? '?token='+switchToken['26'] : '')"><img class="btn" src="../assets/BootPage/section_2_btn.png" alt=""></a>
                    <span class="note">注：平台仅供专业伙伴使用</span>
                </div>
                <div class="img-box marginL205">
                    <img class="genealogy" :class="{img1: isShow.indexOf(1) > -1}" src="../assets/BootPage/section_2_img.png" alt="">
                </div>
            </div>
        </div>
        <div class="section section-2 section-3" id="2">
            <div class="content-box">
                <div class="genealogy-summary marginL205">
                    <img class="logo" src="../assets/BootPage/section_3_logo.png" alt="">
                    <p class="summary">{{youpu}}</p>
                    <a target="_blank" :href="'https://index.1jiapu.com?token='+(switchToken['26'] ? switchToken['26'] : '')"><img class="btn" src="../assets/BootPage/section_3_btn.png" alt=""></a>
                    <span class="note">注：平台仅供专业伙伴使用</span>
                </div>
                <div class="youpu-box">
                    <Cloud />
                    <!-- <img class="youpu" :class="{img2: isShow.indexOf(2) > -1}" src="../assets/BootPage/section_3_img.png" alt=""> -->
                </div>
            </div>
        </div>
        <div class="section section-4" id="3">
            <div class="content-box">
                <img class="logo" src="../assets/BootPage/section_4_logo.png" alt="">
                <h3 class="title">为纸质家谱提供永久的数字化云存储服务。守护典籍，传承记忆。</h3>
                <div class="download-box">
                    <a class="download-a" v-for="(item, index) in downloadList" :key="index" download :href="item.url" target="_blank">
                        <img :src="item.img" alt="">
                        <p>{{item.name}}</p>
                    </a>
                </div>
                <p class="note">注：本产品仅为合作伙伴提供，非专业人士请勿下载。</p>
            </div>
            <img class="camera" src="../assets/BootPage/section_4_img.png" alt="">
        </div>
        <div class="section section-5" id="4">
            <div class="content-left">
                <img class="marker marker-1" src="../assets/BootPage/section_5_marker.png" alt="">
                <img class="marker marker-2" src="../assets/BootPage/section_5_marker.png" alt="">
                <img class="marker marker-3" src="../assets/BootPage/section_5_marker.png" alt="">
                <img class="marker marker-4" src="../assets/BootPage/section_5_marker.png" alt="">
                <img class="marker marker-5" src="../assets/BootPage/section_5_marker.png" alt="">
                <img class="marker marker-6" src="../assets/BootPage/section_5_marker.png" alt="">
                <img class="marker marker-7" src="../assets/BootPage/section_5_marker.png" alt="">
                <img class="marker marker-8" src="../assets/BootPage/section_5_marker.png" alt="">
                <img class="marker marker-9" src="../assets/BootPage/section_5_marker.png" alt="">
            </div>
            <div class="content-right">
                <img class="logo" src="../assets/BootPage/section_5_logo.png" alt="">
                <p class="summary">本功能为 一家谱 平台提供资源统一管理入口</p>
                <a target="_blank" :href="'http://suppliersys.1jiapu.com'+(switchToken['26'] ? '?token='+switchToken['26'] : '')"><img class="btn" src="../assets/BootPage/section_5_btn.png" alt=""></a>
                <span class="note">注：平台仅供专业伙伴使用</span>
            </div>
            <div class="foot-box">
                <div>
                    <p>技术支持 江苏时光信息科技有限公司</p>
                    <p>联系方式：lil@qingtime.cn  0519-83908995</p>
                </div>
            </div>
            <Fireworks v-if="isShow.indexOf(4) > -1" />
        </div>
        <div class="beian">
            <!--©{{year}} 江苏时光信息科技有限公司 Qingtime All Rights Reserved -->
            <p><a href="https://beian.miit.gov.cn" target="_blank">苏ICP备15006448号-30</a></p>
        </div>
        <img class="top" @click="goTop" src="../assets/BootPage/top.svg" alt="">
    </div>
</template>

<script>
import { ref, reactive, onMounted, watch, watchEffect, computed, provide,readonly, toRefs } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useState, changePropertyValue } from '../store';
import { getQueryVariable, setValue, getValue, createMsg } from '../util/ADS';
import { user, version } from '../util/api';
import Fireworks from '../components/Fireworks.vue';
import win from '../assets/BootPage/section_4_win.png';
import ios from '../assets/BootPage/section_4_ios.png';
import android from '../assets/BootPage/section_4_android.png';
import DcamHelp from '../assets/Dcam-help.png';
import Cloud from '../components/Cloud.vue';

export default {
    components: {
        Fireworks, Cloud, 
    },
    name: 'bootPage',
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

        const switchTokenBatch = async (t) => {
            const result = await user.switchTokenBatch(t, [26, 28, 52, 56]);
            if(result.statusCode == 200){
                changePropertyValue('switchToken', result.result);
            }else{
                createMsg(result.msg);
            }
        }

        onMounted(() => {
            initCarousel();
            getVersion();
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

        // 第一屏
        const navList = ref(['首页', '谱目查重', '家谱索引', '家谱拍拍', '质量管理']);
        const navIndex = ref(0);
        const handleChangeNav = (i) => {
            navIndex.value = i;
            document.getElementById(i+'').scrollIntoView();
            if(isShow.value.indexOf(i) > -1){

            }else{
                isShow.value.push(i);
            }
        }

        let timer = '';
        const top = ref(0);
        const top2 = ref(240);
        const initCarousel = () => {
            timer = setInterval(() => {
                if(top.value >= -240){
                    top.value = top.value - 1;
                }else{
                    top.value = 240;
                }
                if(top2.value >= -240){
                    top2.value = top2.value - 1;
                }else{
                    top2.value = 240;
                }
            }, 30);
        }
        // 描述
        const summary = ref('家谱资源， 浩如烟海。 历代人名， 恒河沙数。 今天， 我们聚沙成塔， 重建整个人类的家族谱系。 让家谱链接古今， 让四海成为一家， 让爱的号角， 传遍四方。');
        // 第二屏
        // 描述
        const genealogySummary = ref('家谱作为一种出版之时，诞生于有 ISBN （国际标准数目编号）之前。因此，家谱的查重始终是个困扰藏家的大问题。 为便于寻根探源，时光科技将自己整理的谱目与上图、国图、美国FS等机构开放的谱目，组成联合谱目。 我们也乐于为更多家谱藏家和寻谱爱好者提供服务，共同构建人类的一家谱。');
        // 第三屏
        // 描述
        const youpu = ref('寻根之路，如唐僧西天取经，历经九九八十一难。 为提升家谱检索效率，我们为世界各地的家谱公益志愿者，提供家谱典籍的索引标注引擎。 利用OCR服务，结合人工标注，让家谱索引更高效。 让后人寻根问祖，不再像今天这样困难重重。 让每个普通人类，都能感受到来自历史的脉搏与心跳。');
        // 第四屏
        const downloadList = ref([
            {'name': 'Windows PC版', 'img': win, 'url': 'https://1jiapu.com/DCamera-1.0.5-win.rar'},
            // {'name': '苹果手机版', 'img': ios, 'url': 'http://d.firim.pro/v8ap'}, 
            {'name': '安卓手机版', 'img': android, 'url': 'https://fir.xcxwo.com/3buz'},
            {'name': 'Dcam助手', 'img': DcamHelp, 'url': 'https://1jiapu.com/Dcamera-Helper.zip'}
        ]);
        const getVersion = async () => {
            const result = await version.getVersion();
            console.log(result.v);
            downloadList.value.forEach((ele, i) => {
                if(ele.name == 'Windows PC版'){
                    ele.url = 'https://1jiapu.com/'+result.v;
                }
            });
        }
        // 第五屏
        const isShow = ref([]);
        const goTop = () => {
            navIndex.value = 0;
            document.getElementById('0').scrollIntoView();
        }

        const handleScroll = (e) => {
            if(Math.floor((e.target.scrollTop+50)/1080) != navIndex.value){
                navIndex.value = Math.floor((e.target.scrollTop+50)/1080);
                if(isShow.value.indexOf(navIndex.value) > -1){

                }else{
                    isShow.value.push(navIndex.value);
                }
            }
        }

        const year = ref(2023);

        return {
            login, token, avatar, userName, logout, isLogin, switchToken, 
            navList, navIndex, handleChangeNav, summary,
            genealogySummary, 
            youpu, 
            downloadList, 
            isShow, 
            goTop, top, handleScroll, top2, year,
        }
    }
}
</script>

<style lang="scss" scoped>
.page-wrap{
    position: relative;
    width: 100%;
    height: 100vh;
    color: #000;
    font-size: 20px;
    background: #fff;
    overflow-y: auto;
}
.section{
    position: relative;
    width: 100%;
    height: 1080px;
    color: #fff;
}
.head-box{
    position: fixed;
    top: 0;
    left: 0;
    width: calc(100% - 86px);
    padding: 25px 43px 25px 43px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #000;
    z-index: 1000;
    .logo{
        cursor: pointer;
        height: 50px;
    }
    .nav-wrap{
        position: relative;
        display: flex;
        align-items: center;
        font-size: 16px;
        .nav-box{
            position: relative;
            margin: 0 25px;
            cursor: pointer;
            &.active{
                font-weight: 600;
                &::after{
                    content: '';
                    position: absolute;
                    bottom: -10px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 14px;
                    height: 4px;
                    background: #f10000;
                    border-radius: 2px;
                }
            }
            
        }
    }
    .login-box{
        display: flex;
        align-items: center;
        .userName{
            margin-right: 20px;
        }
    }
    .btn{
        width: 90px;
        height: 30px;
        line-height: 28px;
        background: #f10000;
        border-radius: 2px;
        font-size: 16px;
        color: #fff;
        outline: none;
        border: none;
        cursor: pointer;
    }
}
.section-1{
    background: url('../assets/BootPage/section_1_bg.png') 50% 50% no-repeat;
    background-size: cover;
    .content-box{
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        .summary{
            position: relative;
            width: 496px;
            height: 158px;
            text-align: center;
            overflow: hidden;
            .summary-box{
                position: absolute;
                top: 0;
                left: 50%;
                transform: translateX(-50%);
                width: 300px;
                text-align: left;
                line-height: 40px;
            }
        }
        .logo{
            height: 158px;
            margin-left: 115px;
        }
    }
}
.section-2{
    position: relative;
    color: #000;
    display: flex;
    justify-content: center;
    align-items: center;
    .content-box{
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        .genealogy-summary{
            position: relative;
            .logo{
                height: 100px;
            }
            .summary{
                width: 581px;
                line-height: 40px;
                margin: 38px 0 32px 0;
            }
            .btn{
                height: 60px;
                cursor: pointer;
                display: block;
            }
            .note{
                font-size: 14px;
                margin-left: 20px;
                line-height: 40px;
            }
        }
        .img-box{
            position: relative;
            width: 896px;
            height: 652px;
            overflow: hidden;
        }
        .genealogy{
            position: absolute;
            top: 0;
            right: -1000px;
            height: 652px;
        }
    }
}
.section-3{
    background: #000 url('../assets/BootPage/section_3_bg.png') 50% 50% no-repeat;
    background-size: cover;
    color: #fff;
    .content-box{
        .genealogy-summary{
            order: 10;
        }
        .youpu-box{
            order: 0;
            position: relative;
            width: 460px;
            height: 460px;
            overflow: hidden;
            .youpu{
                position: absolute;
                top: 0;
                left: -1000px;
                height: 460px;
            }
        }
    }
}
.section-4{
    display: flex;
    align-items: center;
    color: #000;
    overflow: hidden;
    .content-box{
        text-align: center;
        margin-left: 100px;
        .logo{
            height: 102px;
        }
        .title{
            line-height: 40px;
            margin: 4px 0 100px 0;
            font-weight: 400;
        }
        .download-box{
            display: flex;
            justify-content: space-around;
            align-items: center;
            .download-a{
                margin: 0 100px;
                display: inline-block;
                color: #000;
                cursor: pointer;
                img{
                    display: inline-block;
                    height: 100px;
                }
                p{
                    line-height: 68px;
                    height: 68px;
                }
            }
        }
        .note{
            margin-top: 169px;
            font-size: 14px;
            color: #666;
        }
    }
    .camera{
        position: absolute;
        right: -512px;
        height: 1024px;
        animation: rotate360 5s infinite;
        transform-origin: 50% 50%;
        &:hover{
            transform: scale(1.2);
        }
    }
}
@keyframes rotate360{
    from {
        transform: rotate(0);
    }
    to{
        transform: rotate(360deg);
    }
}
.section-5{
    background: #000;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .content-left{
        position: relative;
        width: 1100px;
        height: 530px;
        background: url('../assets/BootPage/section_5_map.png') 50% 50% no-repeat;
        background-size: cover;
        .marker{
            position: absolute;
            animation: scale12 3s infinite alternate;
            &.marker-1{
                top: -30px;
                left: 116px;
                height: 38px;
                opacity: 0.3;
            }
            &.marker-2{
                top: 149px;
                left: 149px;
                height: 52px;
                opacity: 0.5;
            }
            &.marker-3{
                top: 50px;
                left: 302px;
                height: 60px;
                opacity: 0.6;
            }
            &.marker-4{
                top: 370px;
                left: 322px;
                height: 68px;
                opacity: 0.6;
            }
            &.marker-5{
                top: 240px;
                left: 453px;
                height: 75px;
            }
            &.marker-6{
                top: 32px;
                left: 670px;
                height: 45px;
                opacity: 0.8;
            }
            &.marker-7{
                top: 148px;
                left: 743px;
                height: 45px;
                opacity: 0.2;
            }
            &.marker-8{
                top: 289px;
                left: 790px;
                height: 90px;
                opacity: 0.4;
            }
            &.marker-9{
                top: 6px;
                left: 910px;
                height: 98px;
                opacity: 0.3;
            }
        }
    }
    .content-right{
        .logo{
            height: 100px;
        }
        .summary{
            height: 58px;
            margin: 15px 0 20px 0;
        }
        .btn{
            height: 60px;
            cursor: pointer;
            margin-bottom: 10px;
            display: block;
        }
        .note{
            height: 48px;
            margin-left: 20px;
            font-size: 14px;
        }
    }
    .foot-box{
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 60px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 16px;
    }
}
@keyframes scale12{
    from{
        transform: scale(0.7);
    }
    to{
        transform: scale(1);
    }
}
.img1{
    animation: moveFromRightToLeft 3s forwards;
}
@keyframes moveFromRightToLeft{
    from{
        right: -1000px;
    }
    to{
        right: 0;
    }
}
.img2{
    animation: moveFromLToR 3s forwards;
}
@keyframes moveFromLToR{
    from{
        left: -1000px;
    }
    to{
        left: 0;
    }
}
.marginL205{
    margin-left: 205px;
}
.top{
    position: fixed;
    bottom: 50px;
    right: 20px;
    cursor: pointer;
}
@media screen  and (max-width: 1500px) and (min-width: 1400px){
    .section-2{
        .content-box{
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            .genealogy-summary{
                position: relative;
                .logo{
                    height: 75px;
                }
                .summary{
                    width: 435px;
                    line-height: 40px;
                    margin: 38px 0 32px 0;
                }
            }
            .img-box{
                width: 673px;
                height: 490px;
            }
            .genealogy{
                height: 490px;
            }
        }
    }
    .section-3{
        .content-box{
            .youpu-box{
                width: 460px;
                height: 460px;
                .youpu{
                    height: 460px;
                }
            }
        }
    }
    .section-4{
        .content-box{
            .logo{
                height: 76px;
            }
            .download-box{
                .download-a{
                    margin: 0 50px;
                }
            }
        }
        .camera{
            right: -384px;
            height: 768px;
        }
    }
    .section-5{
        .content-left{
            width: 825px;
            height: 398px;
            .marker{
                &.marker-1{
                    top: -22px;
                    left: 87px;
                    height: 28px;
                }
                &.marker-2{
                    top: 111px;
                    left: 111px;
                    height: 39px;
                }
                &.marker-3{
                    top: 37px;
                    left: 226px;
                    height: 45px;
                }
                &.marker-4{
                    top: 277px;
                    left: 241px;
                    height: 51px;
                }
                &.marker-5{
                    top: 180px;
                    left: 339px;
                    height: 56px;
                }
                &.marker-6{
                    top: 24px;
                    left: 502px;
                    height: 33px;
                }
                &.marker-7{
                    top: 111px;
                    left: 557px;
                    height: 33px;
                }
                &.marker-8{
                    top: 216px;
                    left: 592px;
                    height: 67px;
                }
                &.marker-9{
                    top: 5px;
                    left: 682px;
                    height: 74px;
                }
            }
        }
        .content-right{
            .logo{
                height: 75px;
            }
        }
        .foot-box{
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 60px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 16px;
        }
    }
    .marginL205{
        margin-left: 100px;
    }
}
@media screen  and (max-width: 1399px){
    .section-2{
        .content-box{
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            .genealogy-summary{
                position: relative;
                .logo{
                    height: 75px;
                }
                .summary{
                    width: 435px;
                    line-height: 40px;
                    margin: 38px 0 32px 0;
                }
            }
            .img-box{
                width: 673px;
                height: 490px;
            }
            .genealogy{
                height: 490px;
            }
        }
    }
    .section-3{
        .content-box{
            .youpu-box{
                width: 460px;
                height: 460px;
                .youpu{
                    height: 460px;
                }
            }
        }
    }
    .section-4{
        .content-box{
            .logo{
                height: 76px;
            }
            .download-box{
                .download-a{
                    margin: 0 50px;
                }
            }
        }
        .camera{
            right: -384px;
            height: 768px;
        }
    }
    .section-5{
        .content-left{
            width: 825px;
            height: 398px;
            .marker{
                &.marker-1{
                    top: -22px;
                    left: 87px;
                    height: 28px;
                }
                &.marker-2{
                    top: 111px;
                    left: 111px;
                    height: 39px;
                }
                &.marker-3{
                    top: 37px;
                    left: 226px;
                    height: 45px;
                }
                &.marker-4{
                    top: 277px;
                    left: 241px;
                    height: 51px;
                }
                &.marker-5{
                    top: 180px;
                    left: 339px;
                    height: 56px;
                }
                &.marker-6{
                    top: 24px;
                    left: 502px;
                    height: 33px;
                }
                &.marker-7{
                    top: 111px;
                    left: 557px;
                    height: 33px;
                }
                &.marker-8{
                    top: 216px;
                    left: 592px;
                    height: 67px;
                }
                &.marker-9{
                    top: 5px;
                    left: 682px;
                    height: 74px;
                }
            }
        }
        .content-right{
            .logo{
                height: 75px;
            }
        }
        .foot-box{
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 60px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 16px;
        }
    }
    .marginL205{
        margin-left: 100px;
    }
}
.beian{
    position: relative;
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #000;
    color: #fff;
    font-size: 12px;
    a{
        color: #fff;
    }
}
</style>