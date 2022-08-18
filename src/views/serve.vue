<template>
    <div @click="toNewPage">我自己的Serve，子组件 --- {{$route.params.myRouterParams}}</div>
</template>
<script>
export default {
    data() {
        return {

        }
    },
    components: {
    },
    watch: {
        
    },
    mounted() {
        console.log(this.$route.params)
        console.log('这里是 mounted')
    },
    computed: {
        
    },
    methods: {
        toNewPage() {
            console.log('3231')
        }
    }

}
</script>