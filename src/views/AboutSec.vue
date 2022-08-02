<template>
    <div class="about">
		<!--引用组件-->
        <test msg="我是组件xxxxxx~~~~~~"></test>
		<br/><br/>

		<!-- watch 监听 -->
        {{count}}
        <button @click="addCount">数字递增</button>
		<br/><br/>
		
		<!-- props -->
		<div class="box">
			{{name}}
		</div>
		<br/><br/>
		
		<div class="box">
			{{countsd}}
		</div>
        <button @click="addToCount(2)">添加累加2</button>
		
    </div>
</template>

<script lang="ts">

import {Vue, Component, Watch, Prop, Emit} from 'vue-property-decorator'
import test from "@/components/test.vue";

@Component({
	components: {
		test
	}
})


export default class HelloWorld extends Vue {
    count = 2;
	countsd = 100;
	strings = '这里是初始化';
	aname = "这里是 computed 的文字";

	addCount() {
        this.count++;
    }
	
	// @Watch('count', {deep: true, immediate: true})
    @Watch('count')
    countWatch(nv: number, ov: number) {
        console.log('watch:',nv, ov);
    }

	@Prop({type: String, required: false, default: '张三9090'})
        // @Prop({default: '张三'})
        // @Prop(Number)
    name: string;


	/**
	 * @Emit(event?: string): (_target: Vue, propertyKey: string, descriptor: any) => void
	 * @Emit 装饰器接收一个可选参数，该参数是[公式]Emit 会将回调函数名的 camelCase 转为 kebab-case，并将其作为事件名
	 * @Emit 会将回调函数的返回值作为第二个参数，如果返回值是一个 Promise 对象，$emit 会在 Promise 对象被标记为 resolved 之后触发
	 * @Emit 的回调函数的参数，会放在其返回值之后，一起被$emit 当做参数使用
	 * 
	 * 注意：
		如果使用@Emit(event?: string) 没有传递事件名称,父类中事件名称会被转为小写用-连接，如例子中的 @add-to-count。
		也有人不太喜欢用小写的这种,如例子中的 @add-to-count,那在子类@Emit中传递事件名,父类用传递的事件名接收。如：子类中@Emit("addToCount") 父类@addToCount="addToCount"
	 * 
	 * 
	**/
	@Emit()
    addToCount(n: number) {
        return this.countsd += n
    }

}
</script>