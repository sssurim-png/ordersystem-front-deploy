import { defineStore } from "pinia";

export const cartStore = defineStore('cart',{
state:()=>({    

    // 전역상태관리의 변수값은 화면새로고침시 전체 리셋 -> 로컬스토리지(모든값이 문자ㅕㄹ로 저장) 에 저장
    totalQuantity: parseInt(localStorage.getItem("totalQuantity")) || 0,//로컬스토리지에서 가져오겠다(토큰있던곳). 없으면 0
    productsInCart:  JSON.parse(localStorage.getItem("productsInCart")) || [] 
}), //문자열 형태를 꺼내와서 객체 쓸때는 꼭 파싱


actions:{
    addCart(product){//물건 받아와서
        this.totalQuantity +=product.productCount; //실시간으로 변수값 (장바구니)숫자 변경
        localStorage.setItem("totalQuantity",this.totalQuantity); //로컬스토리지에도 저장, 담아주기 -> 새로고침 시 날라가지 않도록 저장하는것(백엔드도 가능)-숫자만 올린 것(장바구니 들어갔을때 담은것 나오게 하기// 백엔드, 프론트 둘다가능)
        const existProduct =this.productsInCart.find(p=>p.productId===product.productId); //같은거 있으면 수량 합산하려고
        if(existProduct){
            existProduct.productCount +=product.productCount;
        }else{
            this.productsInCart.push(product);
        }//여기까시 수량합산(분기처리)
        localStorage.setItem("productsInCart",JSON.stringify(this.productsInCart))
    },
    clearCart(){//장바구니 비우기
        localStorage.removeItem("productsInCart");
        localStorage.removeItem("totalQuantity");
        this.productsInCart = [];
        this.totalQuantity=0;

    }
   
},

getters:{
    getTotalQuantity: state=>state.totalQuantity, //숫자 리턴
    getProductsInCart: state => state.productsInCart,//담은 제품들 화면 뿌리기 위해
    
}
}
)