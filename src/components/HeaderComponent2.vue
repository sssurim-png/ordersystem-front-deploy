
<!-- 보통 화면 여기서 -->

<template>
    <v-app-bar>
<v-container>
    <v-row>
        <v-col calss="d-flexjustify-start">
        <div v-if="userRole==='ADMIN'">
            <v-btn :to="'/member/list'">회원관리</v-btn>
            <v-btn :to="'/product/manage'">상품관리</v-btn>
            <v-btn href="'/order/list'">실시간 주문건수{{ liveOrderCount }}</v-btn>
        </div>
        </v-col>
        <v-col calss="text-center">
            <v-btn :to="'/'">java shop</v-btn>
        </v-col>
        <v-col calss="d-flexjustify-end">
            <v-btn v-if="isLogined" :to = "'/order/cart'">장바구니 {{ totalQuantity }}</v-btn>
            <v-btn  :to = "'/product/list'">상품목록</v-btn>
            <v-btn  v-if="isLogined" :to ="'/member/mypage'">마이페이지</v-btn>
            <v-btn  v-if="!isLogined" :to="'/member/create'">회원가입</v-btn>
            <v-btn  v-if="!isLogined" :to="'/member/login'">로그인</v-btn>
            <v-btn v-if = "isLogined" @click = "doLogout()" >로그아웃</v-btn>
        </v-col>

    </v-row>
</v-container>
    </v-app-bar>
</template>

<script>
import { cartStore } from '@/store/cart';
import axios from 'axios';
import { EventSourcePolyfill } from 'event-source-polyfill';
import { jwtDecode } from 'jwt-decode';

export default{
    data(){
        return{
            userRole: null,
            isLogined: false,
            // totalQuantity:0, //지역변수
            liveOrderCount: 0

        }
    },
      created(){
        const accessToken = localStorage.getItem("accessToken")
        if(accessToken){
            const payload = jwtDecode(accessToken);
            this.userRole =payload.role;
            console.log(payload);
            this.isLogined = true;

        }
        if(this.userRole==='ADMIN'){ //admin인 경우에만 알림믈 보내겠다
        this.sseConnect();
        }
    },
computed: {
    totalQuantity(){
        const store=cartStore(); //js보는중
        return store.getTotalQuantity; //getter에서 가져옴 -이게 변하면 나도 변할게 //header에 있는 장바구니 숫자
// 지역변수로 있던 totalQuantity를 여기로 가져옴
        }
    },


    methods:{
        sseConnect(){
            const accessToken = localStorage.getItem("accessToken")
            const sse = new EventSourcePolyfill(`${process.env.VUE_APP_API_BASE_URL}/sse/connect`,{headers: {Authorization: `Bearer ${accessToken}`}}); //axios요청이 아니다 ->토큰 생성
            
        // sse연결객체에서 connect라는 이벤트를 리슨하고 있겠다, 들어오면 중괄호 안쪽(데이터)을 실행
        sse.addEventListener(`ordered`,(event)=>{
            console.log(event);
            this.liveOrderCount++;

        });
        // sse연결해제를 위한 이벤트 설정
        window.addEventListener("beforeunload",this.disconnect);

        },
        async disconnect(){//끊을 때는 axios
            await axios.get(`${process.env.VUE_APP_API_BASE_URL}/sse/connect`);
        },
        
        doLogout(){
        localStorage.clear();
        this.isLogined=false;
        this.userRole = null;
        this.$router.push("/");
        }
    }
}
</script>

