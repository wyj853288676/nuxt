<template>
    <div>
        <main id="login-card">
            <form action="/api/login" method="post" id="login-form" v-show="formType === PAGE_TYPES.LOGIN">
                <h1 class="login-title">
                    Sign in
                </h1>
                <br>
                <br>
                <div class="input-container">
                    <h3 class='input-title text-muted'>Name</h3>
                    <el-container>
                        <el-input name="username" v-model="username" size="large" prefix-icon="el-icon-user"></el-input>
                    </el-container>
                </div>

                <div class="input-container">
                    <h3 class='input-title  text-muted'>Password</h3>
                    <el-container>
                        <el-input type="password" name="password" v-model="password" size="large" prefix-icon="el-icon-lock"></el-input>
                    </el-container>
                </div>

                <div class="input-container">
                    <el-button @click="submit()" class="btn-main btn-sign-in" type="primary">SIGN IN</el-button>
                </div>
                <div class="input-container" style="margin-top:1.5em;text-align:center">
                    <el-link :underline="false" @click="switchType(1)"> Register an Account </el-link>
                </div>
            </form>
            <form action="/api/user" method="post" id="register-form" v-show="formType === PAGE_TYPES.REGISTER">
                <h1 class="login-title">
                    Sign Up
                </h1>
                <br>
                <br>
                <div class="input-container">
                    <h3 class='input-title text-muted'>Name</h3>
                    <el-container>
                        <el-input name="username" v-model="registerUsername" size="large" prefix-icon="el-icon-user"></el-input>
                    </el-container>
                </div>

                <div class="input-container">
                    <h3 class='input-title  text-muted'>Password</h3>
                    <el-container>
                        <el-input type="password" name="password" v-model="registerPassword" size="large" prefix-icon="el-icon-lock"></el-input>
                    </el-container>
                </div>
                <div class="input-container">
                    <h3 class='input-title  text-muted'>Confirm Password</h3>
                    <el-container>
                        <el-input type="password" name="confirmPassword" v-model="confirmPassword" size="large" prefix-icon="el-icon-lock"></el-input>
                    </el-container>
                </div>

                <div class="input-container">
                    <el-button @click="register()" class="btn-main btn-sign-up" type="primary">SIGN UP</el-button>
                </div>
                <div class="input-container" style="margin-top:1.5em;text-align:center">
                    <el-link @click="switchType(0)" :underline="false"> Return to Sign in </el-link>
                </div>
            </form>
        </main>
    </div>
</template>
<script>
const axios = require("axios");
const PAGE_TYPES = {
    LOGIN: 0,
    REGISTER: 1,
};
export default {
    data: () => {
        return {
            username: "wyj",
            password: "wyj",
            registerUsername: "",
            registerPassword: "",
            confirmPassword: "",
            formType: PAGE_TYPES.LOGIN,
            PAGE_TYPES,
        }
    },
    methods: {
        submit() {
            document.getElementById("login-form").submit();
        },
        switchType(type) {
            if (Object.values(PAGE_TYPES).indexOf(type) < 0) {
                return;
            }
            this.formType = type;
        },
        async register() {
            let res = await axios({
                method: "POST",
                url: "/api/user",
                data: {
                    username: this.registerUsername,
                    password: this.registerPassword,
                }
            });
            console.log(res);
        },
    },
    mounted: function () {
    },
};
</script>
<style lang="scss">
@import "../assets/css/login.scss";
</style>
