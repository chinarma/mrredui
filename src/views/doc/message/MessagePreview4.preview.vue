<preview>居中</preview>
<template>
    <r-button @click="open1">Info</r-button>
    <r-button @click="open2">success</r-button>
    <r-button @click="open3">Warning</r-button>
    <r-button @click="open4">Error</r-button>
</template>

<script setup lang="ts">
import RMessage from "@/lib/message/index.ts";

const open1 = () => {
    RMessage({
        message: "this is a message.",
        showClose: true,
        center: true,
    });
};
const open2 = () => {
    RMessage({
        message: "Congrats, this is a success message.",
        type: "success",
        showClose: true,
        center: true,
    });
};
const open3 = () => {
    RMessage({
        message: "Warning, this is a warning message.",
        type: "warning",
        showClose: true,
        center: true,
    });
};
const open4 = () => {
    RMessage({
        type: "error",
        message: "Oops, this is a error message.",
        showClose: true,
        duration: 0,
        center: true,
    });
};
</script>
