<preview>形状</preview>
<template>
    <r-avatar :src="imgUrl" shape="square" size="small" />
    <r-avatar :src="imgUrl" shape="square" size="default" />
    <r-avatar :src="imgUrl" shape="square" size="large" />
    <r-avatar :src="imgUrl" shape="square" :size="100" />
</template>
<script setup lang="ts">
import imgUrl from "/src/assets/image/avator.png";
</script>
