<template>
    <v-container>
        <v-row justify="center">
            <v-col class="text-center text-h5">
                장바구니 목록
            </v-col>
        </v-row>
        <v-row justify="space-between">
        <v-col cols="auto">
            <v-btn color="secondary" @click="clearCart()">장바구니 비우기</v-btn>
        </v-col>
        <v-col cols="auto">
            <v-btn color="primary" @click="createOrder()">주문하기</v-btn>
        </v-col>

        </v-row>
        <v-row>
            <v-col>
                <v-table>
                    <thead>
                        <tr>
                            <th>제품ID</th>
                            <th>제품명</th>
                            <th>가격</th>
                            <th>주문수량</th> 
                            <!-- 원래 이미지도 있어야된다 -->
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="product in getProductsInCart" :key="product.productId">
                            <td>{{ product.productId }}</td>    <!-- 백엔드에서는 그냥 creat해서 생성하면 된다//productList에서 받아온것(로컬스토리지), 백엔드는 받아오는데서 변수명찾기 -->
                            <td>{{ product.productName }}</td>
                            <td>{{ product.price }}</td>
                            <td>{{ product.productCount }}</td>
                        </tr>

                    </tbody>
                </v-table>
            </v-col>
        </v-row>
    </v-container>

</template>

<script>
import { cartStore } from '@/store/cart';
import axios from 'axios';

export default{
    data(){
        return{
            store:null
        }
    },
    created(){

            this.store =cartStore()


    },

    computed: {
        getProductsInCart(){
            
            return this.store.getProductsInCart; //화면 뿌리기-장바구니에 담은 물건들
        }

    },
    methods: {
        clearCart(){
            // const store = cartStore();  //data에서 선언하고, created:{this.stord =cartStore()} 이렇게 공통으로 설정해도 된다
            this.store.clearCart(); 

        },
        async createOrder(){
            // axios로 서버호출
            
      try {
        // const store =cartStore();
        const data = this.store.getProductsInCart.map((p) => ({ productId: p.productId, productCount: p.productCount }));
        if (data.length > 0) {
          await axios.post(`${process.env.VUE_APP_API_BASE_URL}/ordering/create`,data);
          alert("주문이 완료 되었습니다");
          this.store.clearCart();
          console.log(data);
        }
      } catch (e) {
        console.log(e);
        alert("주문이 실패됐습니다");
        
      }
            // 장바구니 비우기
        }
    }
}

</script>