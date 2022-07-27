<template>
    <div class="test">我是其他组件xxx</div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component

export default class test extends Vue {
  @Prop() private msg!: string;
}
</script>