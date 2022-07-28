<template>
    <div class="about">
        {{count}}
        <button @click="addCount">数字递增</button>
		<br/>
		{{strings}}
        <button @click="setString">设置文本</button>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
    watch: {
        count: {
			/**
			 * 定义一个监听属性，handler 就是处理监听变动时的函数
			 */
            handler: 'doSomething',
			/**
			 * 当watch的是一个 Object 类型的数据，如果这个对象内部的某个值发生了改变，并不会触发 watch 动作！
			 * 也就是说，watch 默认情况下，不监测内部嵌套数据的变动。但是很多情况下，我们是需要监测的！
			 */
            deep: true,
			/**
			 * watch 的 handler 函数通常情况下只有在监听的【属性发生改变时】才会触发。
			 * 但有些时候，我们希望在组件创建后，或者说 watch 被声明和绑定的时候，立刻执行一次 handler 函数，
			 * 这就需要使用 immediate 属性了，它默认为false，改为true后，就会立刻执行 handler。
			 */
            immediate: true
        }

		// 同时执行多个方法 - 使用数组可以设置多项，形式包括字符串、函数、对象
		// 你可以传入回调数组，它们会被逐一调用
		// strings: [
		// 	'handle1',
		// 	function handle2 (val, oldVal) {
		// 		console.log( val, oldVal )
		// 	},
		// 	{
		// 		handler: function handle3 (val, oldVal) {
		// 			console.log(  val , oldVal )
		// 		},
		// 	}
	
		// ],

    }
})
export default class HelloWorld extends Vue {
    count = 0;
	strings = '这里是初始化';
    addCount() {
        this.count++;
    }
	setString() {
		this.strings += '今天';
	}
    doSomething(nv: number, ov: number) {
		console.log(nv, ov);
    }
}



</script>