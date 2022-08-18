<template>
    <div @click="toNewPage">我自己的 RouterQuery，子组件 --- {{$route.query.myQuery}}</div>
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
        "$route.query": {
            immediate: true, // 第一次的数据，也要当做是一种变化
            // 处理函数（不能修改名字） handler('新的值'，'旧的值')
            handler(new_value, old_value) {
                console.log( arguments )
                console.log('这里 ----------- ',new_value, old_value)
            },
        }
    },
    created() {
        // console.log( this.$route )
        // console.log( this )
        // this.$watch(
        //     () => this.$route.query,
        //     (toParams, previousParams) => {
        //         debugger;
        //         console.log( toParams, previousParams )
        //     }
        // )
    },
    mounted() {
        console.log(this.$route.params)
        console.log('这里是 RouterQuery，子组件 mounted')
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