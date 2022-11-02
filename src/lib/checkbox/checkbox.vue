<template>
    <label
        class="r-checkbox"
        :class="classes"
        @click="handleChange"
        tabindex="0"
    >
        <span class="r-checkbox-input" :class="classes">
            <r-icon :color="iconColor" :size="iconSize">
                <Subtract12Filled v-if="indeterminate" />
                <Check v-else />
            </r-icon>
        </span>
        <span class="r-checkbox-label" :class="classes">
            <slot>{{ label }}</slot>
        </span>
    </label>
</template>

<script setup lang="ts">
import { Check } from "@vicons/fa";
import { Subtract12Filled } from "@vicons/fluent";
import { checkboxProps, checkboxEmits, useCheckbox } from "./checkbox";

const props = defineProps(checkboxProps);
const emits = defineEmits(checkboxEmits);

const {
    modelValue,
    label,
    classes,
    iconSize,
    disabled,
    iconColor,
    isGroup,
    indeterminate,
} = useCheckbox(props, emits);
const handleChange = () => {
    if (!disabled.value) {
        if (isGroup.value) {
            const index = modelValue.value.indexOf(label.value);
            if (index > -1) {
                modelValue.value.splice(index, 1);
            } else {
                modelValue.value.push(label.value);
            }
            modelValue.value = [...modelValue.value];
        } else {
            modelValue.value = !modelValue.value;
        }
    }
};
</script>

<script lang="ts">
export default {
    name: "RCheckbox",
};
</script>

<style lang="scss">
$primary-color: #4b9e5f;

$large-size: 16px;
$default-size: 14px;
$small-size: 12px;

$large-height: 40px;
$default-height: 32px;
$small-height: 24px;

.r-checkbox {
    display: inline-flex;
    align-items: center;
    cursor: pointer;
    height: $default-height;

    &.is-disabled {
        cursor: not-allowed;
    }

    &.r-checkbox-large {
        height: $large-height;
    }

    &.r-checkbox-small {
        height: $small-height;
    }

    &:not(.is-disabled):hover .r-checkbox-input {
        border: 1px solid #4b9e5f;
    }
    &:not(.is-disabled):focus .r-checkbox-input {
        box-shadow: 0 0 0 2px rgba(24, 160, 88, 0.3);
        border: 1px solid #4b9e5f;
    }

    &.is-border {
        border: 1px solid #c2c2c2;
        border-radius: 4px;
        padding: 0 8px;

        &.is-checked:not(.is-disabled),
        &.is-indeterminate:not(.is-disabled) {
            color: $primary-color;
            border: 1px solid #18a058;
        }

        &.r-checkbox-large {
            padding: 0 12px;
        }

        &.r-checkbox-small {
            padding: 0 8px;
        }
    }

    > .r-checkbox-input {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: $default-size;
        height: $default-size;
        border-radius: 2px;
        background-color: #fff;
        border: 1px solid rgb(224, 224, 230);

        &.is-checked {
            background-color: $primary-color;
            box-shadow: 0 0 0 2px rgba(24, 160, 88, 0.3);
            border: 1px solid #18a058;
            transition: all 0.3s ease-in-out;
        }

        &.r-checkbox-large {
            width: $large-size;
            height: $large-size;
        }

        &.r-checkbox-small {
            width: $small-size;
            height: $small-size;
        }

        &.is-disabled {
            border: 1px solid rgb(224, 224, 230);
            box-shadow: none;
            background: #fafafc;
        }

        &.is-indeterminate {
            background-color: $primary-color;
            border: 1px solid #18a058;
            box-shadow: 0 0 0 2px rgba(24, 160, 88, 0.3);
        }
    }
    > .r-checkbox-label {
        padding: 0 10px;
        user-select: none;
        color: rgb(51, 54, 57);
        font-size: $default-size;

        &.r-checkbox-large {
            font-size: $large-size;
        }

        &.r-checkbox-small {
            font-size: $small-size;
        }

        &.is-disabled {
            color: #c2c2c2ff;
        }
    }
}
</style>
