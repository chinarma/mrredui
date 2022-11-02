<preview>
尺寸
</preview>
<template>
    <r-switch v-model="checked" size="small" />
    <r-switch v-model="checked" size="default" />
    <r-switch v-model="checked" size="large" />
</template>

<script setup lang="ts">
import { ref } from "vue";
const checked = ref(false);
</script>
