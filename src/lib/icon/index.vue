<template>
    <Icon class="r-icon" :size="size" :style="{ opacity: `${depth / 10}` }">
        <slot></slot>
    </Icon>
</template>

<script setup lang="ts">
import { useAttrs } from "vue";
import { Icon } from "@vicons/utils";
defineProps({
    depth: Number,
    size: {
        type: [Number, String],
        default: "40px",
    },
});
const attrs = useAttrs();
</script>
<script lang="ts">
export default {
    name: "RIcon",
};
</script>

<style lang="scss">
.r-icon {
    display: inline-block;
    > span {
        display: inline-block;
    }
}
</style>
