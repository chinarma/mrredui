<preview>基本使用</preview>
<template>
    <r-page-header content="detail" @back="goBack" />
</template>

<script setup lang="ts">
const goBack = () => {
    console.log("go back");
};
</script>
