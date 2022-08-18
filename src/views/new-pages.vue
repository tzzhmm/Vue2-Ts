<template>
    <div class="about">
        <div>
            <h1>{{ message }}</h1>
            <button @click="hello">来点我啊</button>
            <input type="text" v-model="name">
        </div>
        <br/><br/>

        <!--引用组件-->
        <test msg="我是组件xxxxxx~~~~~~"></test>
        <br/><br/>

        <!-- AboutSec 组件 -->
        <h3 class="">下面是 AboutSec 组件</h3>
        <AboutSec name="李拜拜" @add-to-count="addToCount"></AboutSec>

        <br/><br/>
        <button @click="goRouterParams">这里直接去 routerParams, 通过【router.params】传参</button>

        <br/><br/>
        <button @click="goRouterQuery">这里直接去 routerQuery, 通过【router.query】传参</button>
    </div>
</template>
<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'
    import test from "@/components/test.vue";
    import AboutSec from "@/views/AboutSec.vue";

    @Component({
        components: {
            test,
            AboutSec
        }
    })
    export default class HelloWorld extends Vue {
        message = 'My bro';
        firstName = "尼古拉斯";
        lastName = "赵四";

        hello() {
            console.log(this.message);
        }

        get name() : string {
            return this.firstName + '~' + this.lastName;
        }
        set name(val) {
            console.log(val)
            const splitted = val.split(' ');
            this.firstName = splitted[0];
            this.lastName = splitted[1] || '';
        }

        addToCount(val:number){ // 沿用子组件内返回的值
            console.log(val)
        }

        goRouterParams() {
            // !!!!!!!!!!!!!!!!!!!!!注意 router 的 path 参数和 params 参数不能共用，后者会被忽略

            // 字符串路径
            // this.$router.push('/serve/这里通过 params 传参-1');

            // 带路径的对象
            // this.$router.push({path: '/serve/这里通过 params 传参-2'});

            // 命名路由，路由配置，需要 name 字段
            this.$router.push({name: 'Serve', params: {myRouterParams: '这里通过 params 传参-3'}})
        }

        goRouterQuery() {
            // this.$router.push('/routerQuery?myQuery=url传参-1');
// 
            // this.$router.push({path: '/routerQuery', query: {myQuery: 'url传参-2'}});

            this.$router.push({name: 'RouterQuery', query: {myQuery: 'url传参-3'}});
        }

        created(): void {
            console.log("created")
        }

        beforeCreate(): void {
            console.log("beforeCreate")
        }

        mounted(): void {
            console.log("mounted")
        }

        beforeMount(): void {
            console.log("beforeMount")
        }

        destroyed(): void {
            console.log("destroyed")
        }

        beforeDestroy(): void {
            console.log("beforeDestroy")
        }

    }

</script>