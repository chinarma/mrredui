<preview>不同状态</preview>
<template>
    <r-button @click="open1">Info</r-button>
    <r-button @click="open2">success</r-button>
    <r-button @click="open3">Warning</r-button>
    <r-button @click="open4">Error</r-button>
</template>

<script setup lang="ts">
import RMessage from "@/lib/message/index.ts";

const open1 = () => {
    RMessage("this is a message.");
};
const open2 = () => {
    RMessage({
        message: "Congrats, this is a success message.",
        type: "success",
    });
};
const open3 = () => {
    RMessage({
        message: "Warning, this is a warning message.",
        type: "warning",
    });
};
const open4 = () => {
    RMessage.error("Oops, this is a error message.");
};
</script>
