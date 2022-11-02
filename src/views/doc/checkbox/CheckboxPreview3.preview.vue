<preview>多选框组</preview>
<template>
    <r-checkbox-group v-model="checkList" size="large">
        <r-checkbox label="选项A" />
        <r-checkbox label="选项B" />
        <r-checkbox label="选项C" />
    </r-checkbox-group>
</template>

<script setup lang="ts">
import { ref } from "vue";

const checkList = ref(["选项A"]);
</script>
