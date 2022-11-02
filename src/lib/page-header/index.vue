<template>
    <div class="r-page-header">
        <div class="r-page-header-left">
            <slot name="icon">
                <r-icon
                    class="r-page-header-icon"
                    :size="18"
                    @click="handleBack"
                >
                    <component :is="icon" />
                </r-icon>
            </slot>
            <slot name="title">
                <div class="r-page-header-title">{{ title }}</div>
            </slot>
        </div>
        <r-divider direction="vertical" />
        <slot name="content">
            <div class="r-page-header-content">{{ content }}</div>
        </slot>
    </div>
</template>

<script setup lang="ts">
import { ArrowBack } from "@vicons/ionicons5";
const props = defineProps({
    icon: {
        type: Object,
        default: ArrowBack,
    },
    title: {
        type: String,
        default: "Back",
    },
    content: {
        type: String,
        default: "",
    },
});

const emits = defineEmits(["back"]);

const handleBack = () => {
    emits("back");
};
</script>
<script lang="ts">
export default {
    name: "jwPageHeader",
};
</script>

<style lang="scss">
.r-page-header {
    display: flex;
    line-height: 24px;
    height: 24px;

    align-items: center;
    font-size: 18px;

    .r-page-header-left {
        height: 100%;
        display: flex;
        cursor: pointer;
        margin-right: 10px;
        position: relative;

        .r-page-header-icon {
            height: 100%;
            display: flex;
            align-items: center;
            margin-right: 5px;
        }
    }

    .r-page-header-content {
        margin-left: 10px;
        font-size: 18px;
    }
}
</style>
