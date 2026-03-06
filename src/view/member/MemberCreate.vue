<template>
    <v-container>
            <v-row justify="center">
                <v-col cols="6">
                <v-card>
                <v-card-title calss="text-h5 text-center"> 
                    회원가입
                </v-card-title>
                <v-card-text>
                    <v-form>
                        <v-text-field 
                        label="이름"
                        type="name"
                        v-model="name"
                        />
                        <v-text-field
                        label="이메일"
                        type="email"
                        v-model="email"
                        />
                        <v-text-field
                        label="비밀번호"
                        type="password"
                        v-model="password"
                        />
                        <v-row>
                            <v-col>
                                <v-btn color="secaondary" block @click="memberCreate()">
                                    등록
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
            name: null,
            email: null,
            password: null,

        }
    },
    methods: {
       
        async memberCreate(){
            // 객체를 조립하여 axios.post할 경우 json자동형변환
             try{
            const data = {name:this.name, email: this.email, password:this.password};
            console.log(`${process.env.VUE_APP_API_BASE_URL}/member/create`);
            console.log(data);
            await axios.post(`${process.env.VUE_APP_API_BASE_URL}/member/create`,data);
            this.$router.push("/");
            
            }catch(e){
                console.log(e)
                alert(e.response.data.error_message)
            }
        },
    }
}
</script>