<preview>尺寸</preview>
<template>
    <r-avatar :src="imgUrl" size="small" />
    <r-avatar :src="imgUrl" size="default" />
    <r-avatar :src="imgUrl" size="large" />
    <r-avatar :src="imgUrl" :size="100" />
</template>
<script setup lang="ts">
import imgUrl from "/src/assets/image/avator.png";
</script>
