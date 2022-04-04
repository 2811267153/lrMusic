import axios from "axios";
import Vue from "vue";
const mv = Vue.prototype.$bus = new Vue()// import { Loading } from 'element-ui';

// const loading={ //loading加载对象
//     loadingInstance: null,
//     //打开加载
//     open(){
//         if(this.loadingInstance===null){ // 如果实例 为空，则创建
//             this.loadingInstance=Loading.service({
//                 text:'加载中...', //加载图标下的文字
//                 spinner: 'el-icon-loading', //加载图标
//                 background:'rgb(223,223,223)', //背景色
//                 customClass:'loading' //自定义样式的类名
//             })
//         }
//     },
//     //关闭加载
//     close(){
//         // 不为空时, 则关闭加载窗口
//         if(this.loadingInstance !== null) {
//             this.loadingInstance.close()
//         }
//         this.loadingInstance = null
//     }
// }

export function request(config){
    const instance = axios.create({
        baseURL: "https://netease-cloud-music-api-ecru-nu.vercel.app/",
        timeout: 15000,
        withCredentials: true
    })
    instance.interceptors.request.use(config => {
        mv.$bus.$emit('loading', true)
            return config
    }, error => {
        console.log('err')
    })
    instance.interceptors.response.use(config => {
        return config
    })

    return instance(config)
}
