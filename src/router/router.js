import Vue from 'vue';
import Router from 'vue-router';
import CourseSquare from "@/pages/CourseSquare";
import AboutUs from "@/pages/AboutUs";
import Error from "@/components/Error";
import Me from "@/pages/Me";
import CourseInfoPage from "@/pages/CourseInfoPage";
import CourseSearch from "@/pages/CourseSearch";
import CourseUpload from "@/pages/CourseManage";
import store from "../store/store";
import AuditComments from "@/pages/AuditComments";

Vue.use(Router);
let router = new Router({
    routes: [
        {
            path:"/",
            name: "index",
            component: CourseSquare,
        },
        {
            path:"/about",
            component: AboutUs
        },
        {
            path:"/me",
            component: Me
        },
        {
            path:"/course/:courseId",
            component: CourseInfoPage
        },
        {
            path:"/all",
            component: CourseSearch
        },
        {
            path: "/courseUpload",
            component: CourseUpload
        },
        {
            path: "/audit",
            component: AuditComments
        },
        {
            path:"*",
            component: Error
        }
    ]
})
// 前置导航守卫
router.beforeEach((to, from, next) => {
    // 如果进入不需要验证身份的页面, 直接往下走
    if (to.path !== '/me' && to.path !== '/courseUpload') next()
    // 如果进入需要身份验证的页面
    else {
        // 如果未登录，拦截在首页
        if (store.getters.tokenNotExist) next({path: "/"})
        // 如果要去课程上传页，需要校验身份，只有为教师（身份码为1）才可以放行
        else if (to.path === '/courseUpload') {
            // 不是教师身份，拦截
            if (store.getters.getCurUser.type !== 1) next({path: "/"})
            // 是教师，放行
            else next()
        }
        else next()
    }
})

export default router;