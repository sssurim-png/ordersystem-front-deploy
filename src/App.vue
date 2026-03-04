<!-- 화면의 요소는 template안에 작업 -->
<template>
  <!-- Vuetify에서는 모든 태그의 최상단에 v-app으로 감싸져 있어야 정상적으로 동작 -->
  <v-app>
  <HeaderComponent2/>
 <!-- HelloWorld Vue -->
  <!-- router-view는 현재 url에 매칭된 컴포넌트를 렌더링(화면 생성)하는 영역 -->
  <v-main>
  <router-view/> 
</v-main>
  <FooterComponent/>
  </v-app>
</template>


<!-- js의 요소는 script안에 작업 -->
<script>

import FooterComponent from './components/FooterComponent.vue';
import HeaderComponent2 from './components/HeaderComponent2.vue';


//vue는 export를 통하여 .vue, .js등의 요소를 다른 화면에서도 import할 수 있도록 설정.
export default {
  //name을 생략 시 파일명이 name이 됌.
  name: "App",
  components:
{
  HeaderComponent2,FooterComponent
}
  }

</script>

<!-- css의 요소는 style안에 작업 -->
<style>

</style>
