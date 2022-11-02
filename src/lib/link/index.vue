<template>
    <a class="r-link" :class="classes">
        <r-icon
            v-if="icon && iconPlacement === 'left'"
            :size="iconSize"
            class="r-icon-left"
        >
            <component :is="icon" />
        </r-icon>
        <slot></slot>
        <r-icon
            v-if="icon && iconPlacement === 'right'"
            :size="iconSize"
            class="r-icon-right"
        >
            <component :is="icon" />
        </r-icon>
    </a>
</template>

<script setup lang="ts">
import { computed } from "vue";
const props = defineProps({
    type: {
        type: String,
        default: "default",
    },
    underline: {
        type: Boolean,
        default: true,
    },
    disabled: {
        type: Boolean,
        deafult: false,
    },
    icon: {
        type: [String, Object],
    },
    iconPlacement: {
        type: String,
        default: "left",
    },
    iconSize: {
        type: [Number, String],
        default: "18px",
    },
});

const { type, underline, disabled } = props;

const classes = computed(() => {
    return {
        [`r-link-${type}`]: type,
        ["r-link-underline"]: underline,
        ["r-link-disabled"]: disabled,
    };
});
</script>
<script lang="ts">
export default {
    name: "RLink",
};
</script>

<style lang="scss">
$default-color: #333;
$primary-color: #36ad6a;
$info-color: #4098fc;
$success-color: #85ce61;
$warning-color: #f0a020;
$error-color: #d03050;

$font-size: 16px;
.r-link {
    font-size: $font-size;
    position: relative;
    display: flex;
    align-items: center;
    height: calc($font-size + 5px);
    > span {
        padding-bottom: 5px;
    }

    &.r-link-default {
        color: $default-color;
        &:hover {
            color: $primary-color;
        }
        &.r-link-underline:hover:after {
            border-bottom: 1px solid $primary-color;
        }

        &.r-link-disabled {
            color: lighten($default-color, 50%);

            &.r-link-underline:hover:after {
                border-bottom: none;
            }
        }
    }

    &.r-link-primary {
        color: $primary-color;
        &:hover {
            color: lighten($primary-color, 20%);
        }
        &.r-link-underline:hover:after {
            border-bottom: 1px solid lighten($primary-color, 20%);
        }

        &.r-link-disabled {
            color: lighten($primary-color, 30%);

            &.r-link-underline:hover:after {
                border-bottom: none;
            }
        }
    }

    &.r-link-info {
        color: $info-color;
        &:hover {
            color: lighten($info-color, 20%);
        }
        &.r-link-underline:hover:after {
            border-bottom: 1px solid lighten($info-color, 20%);
        }

        &.r-link-disabled {
            color: lighten($info-color, 20%);

            &.r-link-underline:hover:after {
                border-bottom: none;
            }
        }
    }

    &.r-link-success {
        color: $success-color;
        &:hover {
            color: lighten($success-color, 20%);
        }
        &.r-link-underline:hover:after {
            border-bottom: 1px solid lighten($success-color, 20%);
        }

        &.r-link-disabled {
            color: lighten($success-color, 20%);

            &.r-link-underline:hover:after {
                border-bottom: none;
            }
        }
    }

    &.r-link-warning {
        color: $warning-color;
        &:hover {
            color: lighten($warning-color, 20%);
        }
        &.r-link-underline:hover:after {
            border-bottom: 1px solid lighten($warning-color, 20%);
        }

        &.r-link-disabled {
            color: lighten($warning-color, 20%);

            &.r-link-underline:hover:after {
                border-bottom: none;
            }
        }
    }

    &.r-link-error {
        color: $error-color;
        &:hover {
            color: lighten($error-color, 20%);
        }
        &.r-link-underline:hover:after {
            border-bottom: 1px solid lighten($error-color, 20%);
        }

        &.r-link-disabled {
            color: lighten($error-color, 30%);

            &.r-link-underline:hover:after {
                border-bottom: none;
            }
        }
    }

    &.r-link-underline:hover:after {
        content: "";
        position: absolute;
        left: 0;
        right: 0;
        height: 0;
        bottom: 0;
    }

    &.r-link-disabled {
        cursor: not-allowed;
    }

    .r-icon-right {
        margin-left: 5px;
    }

    .r-icon-left {
        margin-right: 5px;
    }
}
</style>
