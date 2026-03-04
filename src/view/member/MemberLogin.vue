<template>
    <v-container>
            <v-row justify="center">
                <v-col cols="6">
                <v-card>
                <v-card-title calss="text-h5 text-center"> 
                    로그인
                </v-card-title>
                <v-card-text>
                    <v-form>
                        <v-text-field
                        label="이메일"
                        type="email"
                        v-model="email"
                        prepend-icon="mdi-email"
                        />
                        <v-text-field
                        label="비밀번호"
                        type="password"
                        v-model="password"
                        prepend-icon="mdi-lock"
                        @keyup.enter="memberLogin"
                        />
                        <v-row>
                            <v-col>
                                <v-btn color="secaondary" block @click="memberLogin()">
                                    로그인
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-form>
                </v-card-text>
            </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import axios from 'axios';

export default {
    data(){
        return{
            email: null,
            password: null,

        }
    },
    methods: {
       
        async memberLogin(){
             try{
            const data = { email: this.email, password:this.password};
            const result =await axios.post(`${process.env.VUE_APP_API_BASE_URL}/member/doLogin`,data);
            const accessToken = result.data.accessToken;
            const refreshToken = result.data.refreshToken;
            localStorage.setItem("refreshToken",refreshToken);
            localStorage.setItem("accessToken",accessToken);
            window.location.href="/";
            // this.$router.push("/");
            
            }catch(e){
                console.log(e)
                alert(e.response.data.error_message)
            }
        },
    }
}
</script>