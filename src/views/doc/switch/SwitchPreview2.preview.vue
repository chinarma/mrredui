<preview>
自定义颜色
</preview>
<template>
    <r-switch v-model="checked" active-color="red" inactive-color="pink" />
</template>

<script setup lang="ts">
import { ref } from "vue";
const checked = ref(false);
</script>
