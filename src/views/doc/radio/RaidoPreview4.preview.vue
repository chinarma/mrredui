<preview>单选框组</preview>
<template>
    <r-radio-group v-model="radio" size="large">
        <r-radio label="1">选项 A</r-radio>
        <r-radio label="2">选项 B</r-radio>
        <r-radio label="3" disabled>选项 C</r-radio>
    </r-radio-group>
</template>

<script setup lang="ts">
import { ref } from "vue";

const radio = ref("1");
</script>
