<template>
<v-btn>라우트3 화면</v-btn>
<div>{{ result }}</div>
</template>

<script>
import axios from 'axios';

export default{
    data(){
        return{
            id:null,

        }
    },
    created(){
       this.id=this.$route.params.productId;
       console.log(this.id);
    //    아래와 같이 라우터ㅡㄹ 통해 전달도니 id값을 꺼내어 서버로 데이터ㅓ 요청
        const result = axios.get("http:loalhost:8080/product/detail"+this.id);
         console.log(result);
    // }
}
}

</script>