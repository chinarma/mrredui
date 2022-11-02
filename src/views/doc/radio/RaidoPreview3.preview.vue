<preview>尺寸</preview>
<template>
    <r-radio v-model="radio" label="1" size="small">选项1</r-radio>
    <r-radio v-model="radio" label="2">选项2</r-radio>
    <r-radio v-model="radio" label="3" size="large">选项3</r-radio>
</template>

<script setup lang="ts">
import { ref } from "vue";

const radio = ref("1");
</script>
