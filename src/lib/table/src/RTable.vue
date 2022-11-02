<template>
    <div
        class="rtable-wrapper"
        :class="[d_options.class, s_fullscreen ? 'rtable-fullscreen' : '']"
        ref="ref_rtableWrapper"
    >
        <!-- 表格 caption -->
        <div class="rtable-title">
            <slot :name="'title'"></slot>
        </div>
        <RTableCard v-if="c_card">
            <template
                v-for="(_, name) in $slots"
                v-slot:[name]="{ value, field, index, row, _row, rows, _rows }"
            >
                <slot
                    :name="name"
                    :value="value"
                    :field="field"
                    :index="index"
                    :row="row"
                    :_row="_row"
                    :rows="rows"
                    :_rows="_rows"
                ></slot>
            </template>
        </RTableCard>
        <RTableGrid v-else>
            <template
                v-for="(_, name) in $slots"
                v-slot:[name]="{ value, field, index, row, _row, rows, _rows }"
            >
                <slot
                    :name="name"
                    :value="value"
                    :field="field"
                    :index="index"
                    :row="row"
                    :_row="_row"
                    :rows="rows"
                    :_rows="_rows"
                ></slot>
            </template>
        </RTableGrid>

        <RTableFooter v-bind="$attrs" />

        <div v-if="s_loading" class="rtable-loading-wrapper">
            <div class="loadingEffect">
                <span></span>
            </div>
        </div>
        <div v-else-if="d_rows.length == 0" class="rtable-nodata-wrapper">
            <div>无数据</div>
        </div>

        <slot :name="'append'" :rows="c_rows"></slot>
        <slot></slot>
    </div>
</template>

<script>
import { toRefs, provide } from "vue";

import initTable from "./initTable";

import { props } from "./default";

import RTableCard from "./RTableCard.vue";
import RTableGrid from "./RTableGrid.vue";
import RTableFooter from "./RTableFooter.vue";

import { useMethods } from "./useMethods";

export default {
    name: "RTable",
    components: {
        RTableGrid,
        RTableCard,
        RTableFooter,
    },
    props: props,

    emits: [
        "DblClickBody",
        "ClickBody",
        "UpdateRows",
        "Checked",
        "Unchecked",
        "CheckedAll",
        "UnCheckedAll",
        "CheckedChged",
        "LoadSuccess",
        "checkedChange",
    ],

    setup(props, ctx) {
        const { dataInfo, fn } = initTable();

        const methods = useMethods();

        //为所有的子组件提供共享的数据
        provide("dataInfo", dataInfo);
        provide("fn", fn);
        provide("methods", methods);
        provide("props", props);

        return {
            ...toRefs(dataInfo),
            ...methods,
        };
    },
};
</script>

<style lang="scss" scoped>
@import "./style.scss";

.rtable-fullscreen {
    position: fixed !important;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: white;
}
.rtable-wrapper {
    display: flex;
    flex-direction: column;
    min-height: 15em;
    flex-grow: 1;
    flex-shrink: 0;
    position: relative;

    border: $border;
    background-color: white;

    .rtable-title {
        background-color: $header-color;
    }
}

//////////////////////////////////////

.rtable-loading-wrapper,
.rtable-nodata-wrapper {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
}
.loadingEffect {
    border: 0.15em solid currentcolor;
    border-bottom-color: transparent;
    border-radius: 50%;
    -webkit-animation: 1s loadingEffect linear infinite;
    animation: 1s loadingEffect linear infinite;
    position: relative;
    font-size: 1.5em;
    color: #409eff;
    padding: 1em;
    margin: auto;
}

@-webkit-keyframes loadingEffect {
    0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }

    100% {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
    }
}

@keyframes loadingEffect {
    0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }

    100% {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
    }
}
</style>
