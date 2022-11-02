<template>
    <div
        class="rtable-grid-wrapper"
        :class="d_options.border ? 'rtable-grid-border' : ''"
    >
        <!-- 固定头 -->
        <div
            class="rtable-grid-fixheader-wrapper"
            ref="ref_gridFixHeaderWrapper"
        >
            <table class="rtable-grid-fixheader-tbl">
                <RTableGridThead
                    v-model:refTheadTr="ref_gridFixHeaderTheadTr"
                    class="rtable-title"
                />
            </table>
        </div>
        <div
            class="rtable-grid-body-wrapper"
            :style="{ height: d_options.height }"
            ref="ref_gridBodyWrapper"
            @wheel="m_handleWheelScrollEvent($event, ref_gridBodyWrapper)"
            @touchstart="m_handleTouchStartEvent($event, ref_gridBodyWrapper)"
            @touchmove="m_handleTouchMoveEvent($event, ref_gridBodyWrapper)"
            @touchend="m_handleWheelScrollEvent($event, ref_gridBodyWrapper)"
            @scroll="m_fitHeaderScrollX($event)"
        >
            <table
                ref="ref_gridBodyTbl"
                :class="d_options.classes"
                class="rtable-grid-body-tbl"
            >
                <!-- 隐藏头部 -->
                <RTableGridThead
                    v-model:refTheadTr="ref_gridBodyHeaderTheadTr"
                    :hidden="true"
                />

                <tbody>
                    <!-- 业务数据 -->
                    <template
                        v-for="(row, rowIndex) in d_rows"
                        :key="row._uuid"
                    >
                        <tr
                            v-bind="rowStyle(row, rowIndex)"
                            @click.stop="clickCheck(rowIndex)"
                        >
                            <td
                                v-if="d_options.expand"
                                class="cursor-pointer"
                                @click.stop="row['_expand'] = !row['_expand']"
                            >
                                <i
                                    v-html="
                                        row['_expand']
                                            ? icons.square_minus
                                            : icons.square_plus
                                    "
                                ></i>
                            </td>
                            <td v-if="d_options.radio || d_options.checkbox">
                                <input
                                    :type="
                                        d_options.radio ? 'radio' : 'checkbox'
                                    "
                                    :disabled="row._selectDisable"
                                    :checked="row['_selected']"
                                    class="cursor-pointer"
                                />
                            </td>
                            <td v-if="d_options.rowno">
                                {{ rowIndex + 1 }}
                            </td>

                            <slot
                                :name="'row'"
                                :row="c_rows[rowIndex]"
                                :rows="c_rows"
                                :_row="d_rows[rowIndex]"
                                :_rows="d_rows"
                                :index="rowIndex"
                            >
                                <template
                                    v-for="(
                                        { field, width, print }, colIndex
                                    ) in d_columns"
                                    :key="`cell_${rowIndex}_${colIndex}`"
                                >
                                    <td
                                        :style="{ width: width }"
                                        :class="!print ? 'print-hidden' : ''"
                                        @dblclick="
                                            rootEmit('DblClickBody', {
                                                row: c_rows[rowIndex],
                                                rowIndex: rowIndex,
                                                field: field,
                                            })
                                        "
                                    >
                                        <div
                                            class="rtable-grid-cell-value-wrapper"
                                            :class="
                                                d_columns[colIndex]['class']
                                            "
                                            :style="
                                                d_columns[colIndex]['style']
                                            "
                                        >
                                            <slot
                                                :name="field"
                                                :value="c_rows[rowIndex][field]"
                                                :row="c_rows[rowIndex]"
                                                :_row="d_rows[rowIndex]"
                                                :index="rowIndex"
                                                :field="field"
                                                :rows="c_rows"
                                                :_rows="d_rows"
                                                >{{ row[field] }}</slot
                                            >
                                        </div>
                                    </td>
                                </template>
                            </slot>

                            <td
                                v-if="d_options.more"
                                style="width: 2em"
                                class="print-hidden"
                                @click.stop
                            >
                                <span
                                    class="cursor-pointer"
                                    v-rtooltip.light="getMoreHtml(row)"
                                >
                                    <i v-html="icons.more"> </i>
                                </span>
                            </td>
                        </tr>
                        <tr v-if="row['_expand']">
                            <td style="position: relative">
                                <div class="rtable-grid-body-tbl-expand"></div>
                            </td>

                            <td colspan="1000">
                                <slot
                                    :name="'detail'"
                                    :row="c_rows[rowIndex]"
                                    :_row="d_rows[rowIndex]"
                                    :index="rowIndex"
                                    :rows="c_rows"
                                    :_rows="d_rows"
                                >
                                </slot>
                            </td>
                        </tr>
                    </template>
                </tbody>
            </table>

            <RTableScrollNext
                v-if="s_scrollLoadMode && d_rows.length < d_totalRows"
                class="cursor-pointer"
                @click="m_scrollLoadNextPage"
                ref="ref_scrollTip"
            />
        </div>
    </div>
</template>

<script>
import { toRefs, inject } from "vue";
import icons from "./icons";
import RTableGridThead from "./RTableGridThead.vue";
import RTableScrollNext from "./RTableScrollNext.vue";
import { getMoreHtml } from "./utils.js";

import { useScrollLoad } from "./useScrollLoad";

import rtooltip from "../../rtooltip/rtooltip";

export default {
    components: {
        RTableGridThead,
        RTableScrollNext,
    },
    directives: {
        rtooltip: rtooltip,
    },
    setup() {
        const dataInfo = inject("dataInfo");
        dataInfo["ref_gridFixHeaderWrapper"] = null;
        const fn = inject("fn");

        const {
            m_handleWheelScrollEvent,
            m_scrollLoadNextPage,
            m_handleTouchStartEvent,
            m_handleTouchMoveEvent,
        } = useScrollLoad();

        const m_fitHeaderScrollX = (e) => {
            dataInfo.ref_gridFixHeaderWrapper.scrollLeft =
                e.srcElement.scrollLeft;
        };

        return {
            icons,
            ...toRefs(dataInfo),
            clickCheck: fn.clickCheck,
            rootEmit: fn.emit,
            rowStyle: fn.rowStyle,
            m_handleWheelScrollEvent,
            m_scrollLoadNextPage,
            m_handleTouchStartEvent,
            m_handleTouchMoveEvent,
            m_fitHeaderScrollX,
            getMoreHtml,
        };
    },
};
</script>

<style lang="scss" scoped>
@import "./style.scss";
table {
    display: table;
    border-collapse: collapse;
    border-spacing: 0;
    border-color: grey;
    border: 0;
    margin: 0;
    min-width: 100%;
}

tr {
    text-align: center;
}

tbody td {
    padding: 0.5em;
}
td:last-child {
    border-right: 0 !important;
    padding-right: 15px !important;
}

@media print {
    .print-hidden {
        display: none;
    }
}
.rtable-grid-border {
    td {
        border-bottom: $border;
        border-right: $border;
    }
}

.rtable-grid-wrapper {
    flex: auto;
    border-bottom: $border;
    display: flex;
    flex-direction: column;
    background-color: white;

    .rtable-title {
        background-color: $header-color;
    }

    .rtable-grid-fixheader-wrapper {
        background-color: $header-color;
        border-bottom: $border;
        color: gray;
        overflow-x: hidden;
        .rtable-grid-fixheader-tbl {
            table-layout: fixed;
        }
    }

    .rtable-grid-body-wrapper {
        // min-width: 100%;
        flex: auto;
        flex-shrink: 0;
        display: flex;
        position: relative;
        flex-direction: column;

        overflow-y: overlay;
        overflow-x: overlay;

        .rtable-grid-body-tbl {
            // width: calc(100% - 18px);
            margin-top: -4em;

            .rtable-grid-body-tbl-expand {
                position: absolute;
                right: 0;
                top: 0;
                bottom: 50%;
                left: 50%;
                border-right: 0;
                border-bottom: 1px solid lightblue;
                border-left: 1px solid lightblue;
            }
        }

        .rtable-grid-cell-value-wrapper {
            //word-break: break-all;
            // white-space: pre-wrapper;
            // word-wrapper: break-word;

            // white-space: nowrap;
            margin: auto;
        }

        tr:hover {
            background-color: $header-color;
        }
    }
}
</style>
