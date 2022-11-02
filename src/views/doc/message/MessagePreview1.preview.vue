<preview>基础使用</preview>
<template>
    <r-button @click="open">Show Message</r-button>
    <r-button @click="openVn">Vnode</r-button>
</template>

<script setup lang="ts">
import { h } from "vue";
import RMessage from "@/lib/message/index.ts";

const open = () => {
    RMessage("This is a Message");
};

const openVn = () => {
    RMessage({
        message: h("p", null, [
            h("span", null, "Message can be "),
            h("i", { style: "color: teal" }, "VNode"),
        ]),
    });
};
</script>
