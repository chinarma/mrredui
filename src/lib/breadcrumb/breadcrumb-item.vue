<template>
    <span class="r-breadcrumb-item">
        <span
            class="r-breadcrumb-inner"
            :class="{
                'is-link': to,
            }"
            @click="handleClick"
        >
            <slot></slot>
        </span>
        <r-icon
            v-if="parent?.separatorIcon"
            class="r-breadcrumb-separator"
            :size="12"
        >
            <component :is="parent.separatorIcon" />
        </r-icon>
        <span v-else class="r-breadcrumb-separator">{{
            parent.separator
        }}</span>
    </span>
</template>

<script setup lang="ts">
import { inject } from "vue";
import { useRouter } from "vue-router";
const props = defineProps({
    to: {
        type: Object,
        default: () => {},
    },
    replace: {
        type: Boolean,
        default: false,
    },
});
const router = useRouter();
const parent = inject("RBreadcrumbKey", undefined);

const handleClick = () => {
    if (!props.to || !router) return;
    props.replace ? router.replace(props.to) : router.push(props.to);
};
</script>
<script lang="ts">
export default {
    name: "RBreadcrumbItem",
};
</script>
<style lang="scss">
.r-breadcrumb-item {
    float: left;
    display: flex;
    align-items: center;
    color: #606266;
    .r-breadcrumb-separator {
        margin: 0 9px;
        font-weight: 700;
        color: #c0c4cc;
    }

    .r-breadcrumb-inner.is-link,
    .r-breadcrumb-inner a {
        font-weight: 700;
        text-decoration: none;
        color: #303133;
        transition: color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
        cursor: pointer;

        &:hover {
            color: #36ad6a;
        }
    }

    &:last-child .r-breadcrumb-separator {
        display: none;
    }
}
</style>
