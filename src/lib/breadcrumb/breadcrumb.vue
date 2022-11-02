<template>
    <div class="r-breadcrumb">
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
import { provide } from "vue";
const props = defineProps({
    separator: {
        type: String,
        default: "/",
    },
    separatorIcon: {
        type: Object,
    },
});
provide("RBreadcrumbKey", props);
</script>
<script lang="ts">
export default {
    name: "RBreadcrumb",
};
</script>

<style lang="scss">
.r-breadcrumb {
    display: flex;
    width: 100%;
    font-size: 14px;
    line-height: 1;
}
</style>
