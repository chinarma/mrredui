<template>
    <div
        class="rtable-card-wrapper"
        :class="d_rows.length == 0 ? 'border-0' : ''"
        ref="ref_cardWrapper"
        @wheel="m_handleWheelScrollEvent($event, ref_cardWrapper)"
        @touchstart="m_handleTouchStartEvent($event, ref_cardWrapper)"
        @touchmove="m_handleTouchMoveEvent($event, ref_cardWrapper)"
        @touchend="m_handleWheelScrollEvent($event, ref_cardWrapper)"
    >
        <table>
            <tbody>
                <tr
                    v-for="(row, rowIndex) in d_rows"
                    :key="row._uuid"
                    v-bind="rowStyle(row, rowIndex)"
                    style="border-bottom: 1px solid"
                    @click.stop="m_clickCheck(rowIndex)"
                >
                    <td>
                        <div class="rtable-card-rowinfo-wrapper">
                            <div class="rtable-card-rowno">
                                {{ rowIndex + 1 }}
                            </div>
                            <div v-if="d_options.radio || d_options.checkbox">
                                <input
                                    :type="
                                        d_options.radio ? 'radio' : 'checkbox'
                                    "
                                    :disabled="row._selectDisable"
                                    :checked="row['_selected']"
                                    class="cursor-pointer"
                                />
                            </div>
                        </div>

                        <slot
                            :name="'row'"
                            :row="c_rows[rowIndex]"
                            :rows="c_rows"
                            :_row="d_rows[rowIndex]"
                            :_rows="d_rows"
                            :index="rowIndex"
                        >
                            <div
                                class="rtable-card-column-wrapper"
                                :key="row._uuid + '_' + colIndex"
                                v-for="({ field }, colIndex) in d_columns"
                                @dblclick="
                                    rootEmit('DblClickBody', {
                                        row: c_rows[rowIndex],
                                        rowIndex: rowIndex,
                                        field: field,
                                    })
                                "
                            >
                                <span class="rtable-card-cell-label">
                                    {{
                                        d_columns[colIndex]["title"]
                                            ? `${d_columns[colIndex]["title"]} :`
                                            : ""
                                    }}
                                </span>

                                <span
                                    class="rtable-card-cell-value"
                                    :class="d_columns[colIndex]['class']"
                                    :style="d_columns[colIndex]['style']"
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
                                </span>
                            </div>
                        </slot>
                    </td>
                </tr>
            </tbody>
        </table>
        <RTableScrollNext
            v-if="s_scrollLoadMode && d_rows.length < d_totalRows"
            @click="m_scrollLoadNextPage"
            ref="ref_scrollTip"
        />
    </div>
</template>

<script>
import { toRefs, inject } from "vue";
import { useScrollLoad } from "./useScrollLoad";
import RTableScrollNext from "./RTableScrollNext";

export default {
    components: {
        RTableScrollNext,
    },
    setup() {
        const dataInfo = inject("dataInfo");
        const fn = inject("fn");

        const {
            m_handleWheelScrollEvent,
            m_scrollLoadNextPage,
            m_handleTouchStartEvent,
            m_handleTouchMoveEvent,
        } = useScrollLoad();

        return {
            ...toRefs(dataInfo),
            m_clickCheck: fn.clickCheck,
            rootEmit: fn.emit,
            rowStyle: fn.rowStyle,
            m_handleWheelScrollEvent,
            m_scrollLoadNextPage,
            m_handleTouchStartEvent,
            m_handleTouchMoveEvent,
        };
    },
};
</script>

<style lang="scss" scoped>
@import "./style.scss";

.rtable-card-wrapper {
    flex: 1 0 0%;

    .rtable-card-rowinfo-wrapper {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0.5em;
    }

    .rtable-card-rowno {
        width: 1.5em;
        height: 1.5em;
        display: flex;
        justify-content: center;
        align-items: center;

        line-height: 1;
        border-radius: 9999px;
        background-color: rgba(209, 213, 218, 0.5);
    }

    .rtable-card-column-wrapper {
        display: flex;
        align-items: center;

        .rtable-card-cell-label {
            font-weight: bold;
            flex: 0 0 30%;
            padding-left: 0.5em;
            text-align: left;
            color: lightgray;
            text-align: right;
            padding-right: 15px;
        }

        .rtable-card-cell-value {
            margin-top: 5px;
            padding-right: 0.5em;
            flex: 1;
            text-align: left;
        }
    }
}
</style>
