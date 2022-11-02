<template>
    <div ref="radioGroupRef" class="r-radio-group" role="radiogroup">
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
import { provide, reactive, toRefs } from "vue";
import { radioGroupProps, radioGroupEmits } from "./radio-grop";
const props = defineProps(radioGroupProps);
const emits = defineEmits(radioGroupEmits);

const changeEvent = (value) => {
    emits("update:modelValue", value);
    emits("change", value);
};

provide(
    "radioGroupKey",
    reactive({
        ...toRefs(props),
        changeEvent,
    })
);
</script>
<script lang="ts">
export default {
    name: "RRadioGroup",
};
</script>

<style scoped></style>
