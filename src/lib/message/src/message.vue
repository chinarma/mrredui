<template>
    <transition
        :duration="300"
        leave-active-class="animate__zoomOut"
        enter-active-class="animate__zoomIn"
        @before-leave="onClose"
        @after-leave="$emit('destroy')"
    >
        <div
            class="r-message animate__animated"
            v-show="visible"
            :style="customStyle"
            :id="id"
            :class="{
                'is-close': close,
                'is-center': center,
            }"
            @mouseenter="clearTimer"
            @mouseleave="startTimer"
        >
            <r-icon
                class="r-message-icon"
                :size="22"
                v-if="type === 'info'"
                color="#3f7ee8"
            >
                <Info24Filled />
            </r-icon>
            <r-icon
                class="r-message-icon"
                :size="22"
                v-if="type === 'success'"
                color="#4b9e5f"
            >
                <IosCheckmarkCircle />
            </r-icon>
            <r-icon
                class="r-message-icon"
                :size="22"
                v-if="type === 'warning'"
                color="#e4a341"
            >
                <WarningFilled />
            </r-icon>
            <r-icon
                class="r-message-icon"
                :size="22"
                v-if="type === 'error'"
                color="#bf3f53"
            >
                <CloseCircle />
            </r-icon>
            <slot>
                {{ message }}
            </slot>
            <r-icon
                v-if="showClose"
                :size="18"
                class="r-close-icon"
                @click.stop="close"
            >
                <Close />
            </r-icon>
        </div>
    </transition>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, onUnmounted } from "vue";
import { messageProps, messageEmits } from "./message";
import RIcon from "@/lib/icon/index.vue";
import { Info24Filled } from "@vicons/fluent";
import { IosCheckmarkCircle } from "@vicons/ionicons4";
import { WarningFilled } from "@vicons/carbon";
import { CloseCircle, Close } from "@vicons/ionicons5";
const props = defineProps(messageProps);
const emits = defineEmits(messageEmits);

const visible = ref(false);
let stopTimer = undefined;

const customStyle = computed(() => ({
    top: `${props.offset}px`,
    zIndex: props.zIndex,
}));

function startTimer() {
    if (props.duration > 0) {
        stopTimer = setTimeout(() => {
            if (visible.value) close();
        }, props.duration);
    }
}

function clearTimer() {
    clearTimeout(stopTimer);
    stopTimer = undefined;
}

function close() {
    visible.value = false;
}

function keydown({ code }: KeyboardEvent) {
    if (code === "Escape") {
        // press esc to close the message
        if (visible.value) {
            close();
        }
    } else {
        startTimer(); // resume timer
    }
}

onMounted(() => {
    startTimer();
    visible.value = true;

    document.addEventListener("keydown", keydown);
});

onUnmounted(() => {
    document.removeEventListener("keydown", keydown);
});
</script>
<script lang="ts">
export default {
    name: "RMessage",
};
</script>

<style lang="scss">
.r-message {
    --r-bezier: cubic-bezier(0.4, 0, 0.2, 1);
    position: fixed;
    z-index: 1000;
    left: calc(50% - 190px);
    background-color: #fff;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    padding: 15px 15px 15px 20px;
    flex-wrap: nowrap;
    overflow: hidden;
    width: 380px;
    color: rgb(51, 54, 57);
    box-shadow: 0 3px 6px -4px rgba(0, 0, 0, 0.12),
        0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
    transition: color 0.3s var(--r-bezier), box-shadow 0.3s var(--r-bezier),
        background-color 0.3s var(--r-bezier), opacity 0.3s var(--r-bezier),
        transform 0.3s var(--r-bezier), margin-bottom 0.3s var(--r-bezier),
        top 0.3s var(--r-bezier);

    &.is-close {
        padding-right: 38px;
    }
    &.is-center {
        justify-content: center;
    }
    .r-message-icon {
        margin-right: 10px;
    }
    .r-close-icon {
        position: absolute;
        right: 20px;
        top: calc(50% - 10px);
        cursor: pointer;
    }
}
</style>
