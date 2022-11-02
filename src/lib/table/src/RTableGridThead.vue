<!--
 * @Project: Mr.red
 * @Author: chinarma@qq.com
 * @Date: 2022-08-23 14:40:47
 * @LastEditTime: 2022-08-25 00:01:53
-->
<template>
    <thead :class="d_options.border ? 'rtable-grid-border' : ''">
        <tr ref="ref_TheadTr">
            <!-- expand 占位 -->
            <th v-if="d_options.expand" style="width: 1em"></th>
            <th v-if="d_options.checkbox || d_options.radio" style="width: 1em">
                <input
                    v-if="d_options.checkbox"
                    class="cursor-pointer"
                    type="checkbox"
                    :disabled="!d_rows.length || d_options.selectDisable"
                    :checked="c_checkedCount"
                    :indeterminate="
                        c_checkedCount && c_checkedCount != d_rows.length
                    "
                    @change="checkAll(!c_checkedCount)"
                />
            </th>
            <th v-if="d_options.rowno" style="width: 1em">No</th>
            <th
                v-for="{ title, print, sort, field } in d_columns"
                :key="field"
                :class="print ? '' : 'print-hidden'"
            >
                <div class="column-wrap">
                    <div></div>
                    <div style="text-align: center">{{ title }}</div>
                    <div
                        v-if="sort"
                        class="sort-warp"
                        @click="m_chgColSort(field)"
                    >
                        <div
                            class="triangle-up"
                            :style="
                                d_columnSort?.sort == field &&
                                d_columnSort?.order == 'asc'
                                    ? 'border-bottom-color:green'
                                    : 'border-bottom-color:lightgray'
                            "
                        ></div>
                        <div
                            class="triangle-down"
                            :style="
                                d_columnSort?.sort == field &&
                                d_columnSort?.order == 'desc'
                                    ? 'border-top-color:green'
                                    : 'border-top-color:lightgray'
                            "
                        ></div>
                    </div>
                </div>
            </th>
            <th v-if="d_options.more" class="print-hidden"></th>
        </tr>
    </thead>
</template>

<script>
import { ref, watch, toRefs, inject, computed } from "vue";

export default {
    props: [
        "refTheadTr", //把本地传送给父组件
        "hidden",
    ],
    setup(props, { emit }) {
        const dataInfo = inject("dataInfo");
        const fn = inject("fn");
        const { checkAll } = inject("methods");

        const c_checkedCount = computed(() => {
            return dataInfo.d_rows.reduce(
                (acc, row) => acc + (row._selected ? 1 : 0),
                0
            );
        });
        watch(c_checkedCount, () => {
            //RTable主组件发送事件
            if (!props.hidden) {
                fn.emit("checkedChange");
            }
        });

        const ref_TheadTr = ref(null);
        watch(ref_TheadTr, (newValue) => {
            emit("update:refTheadTr", newValue);
        });

        const m_chgColSort = (field) => {
            dataInfo.d_columnSort =
                dataInfo.d_columnSort?.sort != field
                    ? { sort: field, order: "asc" }
                    : dataInfo.d_columnSort?.order == "asc"
                    ? { sort: field, order: "desc" }
                    : null;
        };

        return {
            ...toRefs(dataInfo),
            ref_TheadTr,
            m_chgColSort,
            c_checkedCount,
            checkAll,
        };
    },
};
</script>

<style lang="scss" scoped>
@import "./style.scss";
th {
    padding: 0.5em;
    white-space: nowrap;
    line-height: 1.5;
}

th:last-child {
    border-right: 0 !important;
    padding-right: 15px !important; //为滚动条预留空间
}

.rtable-grid-border {
    th {
        border-right: $border;
    }
}

.column-wrap {
    display: grid;

    grid-template-columns: repeat(3, minmax(0, 1fr));

    font-weight: bolder;

    .sort-warp {
        display: flex;
        flex-direction: column;
        justify-items: center;
        cursor: pointer;
        margin-left: 1px;
        transform: scale(0.5);
    }

    .triangle-up {
        border-color: transparent;
        border-bottom-color: lightgray;
        border-style: solid;
        border-width: 0 0.6em 0.8em 0.6em;
        height: 0;
        width: 0;
        margin-bottom: 0.1em;
    }

    .triangle-down {
        border-color: transparent;
        border-top-color: lightgray;
        border-style: solid;
        border-width: 0.8em 0.6em 0 0.6em;
        height: 0;
        width: 0;
        margin-top: 0.1em;
    }
}
</style>
