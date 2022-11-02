<preview>
基础用法
</preview>
<template>
    <r-tabs v-model="selected">
        <r-tab title="干嘛">干嘛</r-tab>
        <r-tab title="听">听</r-tab>
        <r-tab title="苦情歌">苦情歌</r-tab>
        <r-tab title="以为多烂漫">以为多烂漫</r-tab>
    </r-tabs>
</template>
<script setup lang="ts">
import { ref } from "vue";

const selected = ref("干嘛");
</script>
