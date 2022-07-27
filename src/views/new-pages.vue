<template>
    <div class="about">
        <div>
            <h1>{{ message }}</h1>
            <button @click="hello">来点我啊</button>
            <input type="text" v-model="name">
        </div>
        <!--引用组件-->
        <test></test>
    </div>
</template>
<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'
    import test from "@/components/test.vue";

    @Component({
        components: {
            test
        }
    })
    export default class HelloWorld extends Vue {
        message = 'HelloWorld TypeScript';
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