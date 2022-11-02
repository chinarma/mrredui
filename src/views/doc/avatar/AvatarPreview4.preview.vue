<preview>图片加载失败的回滚行为</preview>
<template>
    <r-avatar src="empty" size="large" @error="handleError">
        <img src="/src/assets/image/avator.png" alt="" />
    </r-avatar>
</template>
<script setup lang="ts">
const handleError = () => {
    console.log("图片加载失败");
    return false;
};
</script>
