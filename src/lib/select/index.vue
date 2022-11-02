<template>
    <div
        class="r-select"
        :tabindex="disabled ? '' : -1"
        ref="selectRef"
        :class="{
            'is-disabled': disabled,
        }"
    >
        <div
            v-if="!multiple"
            class="r-base-select"
            :tabindex="disabled ? '' : -1"
        >
            <div v-show="modelLabel" class="r-select-label">
                {{ modelLabel }}
            </div>
            <div v-show="!modelLabel" class="r-select-placeholder">
                {{ placeholder }}
            </div>
            <r-icon
                :size="18"
                class="r-select-suffix"
                @mousemove="clearable ? (closeVisible = true) : ''"
                @mouseleave="clearable ? (closeVisible = false) : ''"
                color="rgba(194, 194, 194, 1)"
            >
                <CloseCircleOutline
                    v-if="closeVisible && modelLabel"
                    @click="handleClear"
                />
                <IosArrowDown v-else />
            </r-icon>
        </div>
        <div class="r-base-select r-select-tags" v-if="multiple">
            <r-tag
                closeable
                v-for="(item, index) in modelLabel"
                :key="index"
                @close="handleClear(item)"
                >{{ item }}</r-tag
            >
            <div v-show="modelLabel.length === 0" class="r-select-placeholder">
                {{ placeholder }}
            </div>

            <r-icon
                :size="18"
                class="r-select-suffix"
                @mousemove="clearable ? (closeVisible = true) : ''"
                @mouseleave="clearable ? (closeVisible = false) : ''"
                color="rgba(194, 194, 194, 1)"
            >
                <CloseCircleOutline
                    v-if="closeVisible && modelLabel"
                    @click="handleClear"
                />
                <IosArrowDown v-else />
            </r-icon>
        </div>
        <div class="r-select-dropdown">
            <div class="no-options" v-show="options.length === 0">无选项</div>
            <span
                class="r-select-option"
                :class="{
                    'is-active': multiple
                        ? modelValue.includes(item.value)
                        : modelValue === item.value,
                    'is-disabled': item.disabled,
                    'is-multiple': multiple,
                }"
                v-for="item in options"
                :key="item.value"
                @click="handleOptionClick(item)"
            >
                <r-ellipsis>{{ item.label }}</r-ellipsis>
                <r-icon
                    :size="18"
                    class="r-select-option-suffix-icon"
                    v-if="multiple && modelValue.includes(item.value)"
                >
                    <Check />
                </r-icon>
            </span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from "vue";
import { IosArrowDown } from "@vicons/ionicons4";
import { CloseCircleOutline } from "@vicons/ionicons5";
import { Check } from "@vicons/tabler";
import { selectProps, selectEmits, useSelect } from "./index.ts";
const props = defineProps(selectProps);
const emits = defineEmits(selectEmits);

const selectRef = ref();
const {
    options,
    modelValue,
    modelLabel,
    disabled,
    placeholder,
    clearable,
    classes,
    closeVisible,
    multiple,
} = useSelect(props, emits);

const handleOptionClick = (item) => {
    if (!item.disabled) {
        if (multiple.value) {
            const isRemove = modelValue.value.includes(item.value);
            isRemove
                ? modelValue.value.splice(
                      modelValue.value.indexOf(item.value),
                      1
                  )
                : modelValue.value.push(item.value);
            emits("update:modelValue", modelValue.value);
            emits("change", modelValue.value);
        }

        if (!multiple.value) {
            selectRef.value.blur();
            emits("update:modelValue", item.value);
            emits("change", item.value);
        }
    }
};

const handleClear = (e) => {
    if (!multiple.value) {
        emits("update:modelValue", "");
        emits("clear", "");
    }
    if (multiple.value) {
        const value = options.value.find((v) => v.label === e)?.value;
        if (modelValue.value.indexOf(value) > -1) {
            modelValue.value.splice(modelValue.value.indexOf(value), 1);
        } else {
            modelValue.value.splice(0, modelValue.value.length);
        }
        emits("update:modelValue", modelValue.value);
        emits("clear", modelValue.value);
    }
};
</script>

<script lang="ts">
export default {
    name: "RSelect",
};
</script>
<style lang="scss">
.r-select {
    width: 100%;
    position: relative;
    cursor: pointer;

    .r-select-placeholder {
        color: rgba(194, 194, 194, 1);
    }

    .r-select-label,
    .r-select-placeholder {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }
    .r-base-select {
        width: 100%;
        line-height: 34px;
        min-height: 34px;
        background-color: #fff;
        background-image: none;
        border-radius: 4px;
        border: 1px solid #dcdfe6;
        box-sizing: border-box;
        color: #606266;
        display: inline-block;
        font-size: inherit;
        outline: none;
        padding: 0 30px 0 15px;
        color: rgb(51, 54, 57);
        transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
        position: relative;

        &:hover {
            border-color: #c0c4cc;
        }
        &:active,
        &:focus {
            outline: none;
            border-color: #18a058;
            box-shadow: 0 0 0 2px rgba(24, 160, 88, 0.3);
        }

        .r-select-suffix {
            position: absolute;
            right: 5px;
            top: 0;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }

    .r-select-dropdown {
        z-index: 10000;
        position: absolute;
        border-radius: 3px;
        padding: 0;
        top: calc(100% + 5px);
        width: 100%;
        opacity: 0;
        height: 0px;
        width: 100%;
        pointer-events: none;
        background-color: #fff;
        transition: all 250ms ease-in-out;
        box-shadow: rgba(0, 0, 0, 0.12) 0px 3px 6px -4px,
            rgba(0, 0, 0, 0.08) 0px 6px 16px 0px,
            rgba(0, 0, 0, 0.05) 0px 9px 28px 8px;
        overflow-y: auto;
        overflow-x: hidden;
        text-overflow: ellipsis;

        .no-options {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .r-select-option {
            z-index: 10000;
            display: inline-block;
            cursor: pointer;
            min-width: 100%;
            width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            height: 32px;
            padding: 0 10px;
            line-height: 32px;
            overflow: visible;
            background-color: #fff;
            position: relative;

            .r-select-option-suffix-icon {
                position: absolute;
                height: 100%;
                display: flex;
                align-items: center;
                width: 30px;
                right: 0;
                top: 0;
            }

            &:hover,
            &.is-active {
                background-color: #f3f3f5;
                color: #25a561;
            }

            &.is-disabled {
                cursor: not-allowed;
                background-color: #fff;
                color: #c2cddd;
            }

            &.is-disabled.is-active {
                background-color: #f9f9fa;
                color: #a5ceaf;
            }

            &.is-multiple {
                padding-right: 30px;
            }
        }
    }

    &:hover .r-select-dropdown {
        pointer-events: auto;
    }
    &:focus-within .r-select-dropdown {
        opacity: 1;
        height: 300px;
        width: 100%;
        pointer-events: auto;
    }

    &:focus-within .r-base-select {
        outline: none;
        border-color: #18a058;
        box-shadow: 0 0 0 2px rgba(24, 160, 88, 0.3);
    }

    &.is-disabled {
        cursor: not-allowed;
    }
    &.is-disabled .r-base-select {
        cursor: not-allowed;
        background-color: #fafafc;
        color: rgba(194, 194, 194, 1);

        &:hover,
        &:focus,
        &:active {
            border: 1px solid #dcdfe6;
            box-shadow: none;
        }
    }
}
</style>
