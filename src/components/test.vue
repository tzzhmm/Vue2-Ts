<template>
    <div class="test">{{msg}}</div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component

export default class test extends Vue {
  @Prop() private msg!: string;
}
</script>