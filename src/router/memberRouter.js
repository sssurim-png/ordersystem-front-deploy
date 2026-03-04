import MemberCreate from "@/view/member/MemberCreate.vue";
import MemberDetail from "@/view/member/MemberDetail.vue";
import MemberList from "@/view/member/MemberList.vue";
import MemberLogin from "@/view/member/MemberLogin.vue";
import MemberMyPage from "@/view/member/MemberMyPage.vue";




export const memberRouter=[
    {
         path: "/member/create",
            name: "MemberCreate",
            component: MemberCreate
    },
     {
         path: "/member/login",
            name: "MemberLogin",
            component: MemberLogin
    },
        {
         path: "/member/list",
            name: "MemberList",
            component: MemberList
    },
     {
         path: "/member/detail/:memberId",
            name: "MemberDetail",
            component: MemberDetail
    },
    {
         path: "/member/mypage",
            name: "MemberMyPage",
            component: MemberMyPage
    }
]
