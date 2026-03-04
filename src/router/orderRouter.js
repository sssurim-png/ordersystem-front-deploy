import OrderCart from "@/view/order/OrderCart.vue";
import OrderList from "@/view/order/OrderList.vue";


export const orderRouter=[
    {
         path: "/order/list",
            name: "orderList",
            component: OrderList
    },
     {
         path: "/order/cart",
            name: "orderCart",
            component: OrderCart
    }
]