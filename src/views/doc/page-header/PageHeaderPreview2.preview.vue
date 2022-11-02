<preview>自定义图标</preview>
<template>
    <r-page-header
        content="detail"
        @back="goBack"
        :icon="ArrowBackIosNewOutlined"
    />
</template>

<script setup lang="ts">
import { ArrowBackIosNewOutlined } from "@vicons/material";
const goBack = () => {
    console.log("go back");
};
</script>
