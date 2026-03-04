<template>
<h1>store component B</h1>
<div>지역변수값:{{ count }}</div>
<v-btn @click="incrementCount()">지역변수 Count값 증가</v-btn>
<div>전역변수값: {{ getStoredCount }}</div>
</template>

<script>
import { practiceStore } from '@/store/practice';

export default{
    data(){
        return{
            count:0
        }
        

    },

     computed:{
        getStoredCount(){
            const store = practiceStore();
            return store.getCount
        }
    },

     methods: {
        incrementCount(){
            this.count++;
        }
    }
}
</script>