/*
 * @Project: Mr.red
 * @Author: chinarma@qq.com
 * @Date: 2022-08-18 21:38:01
 * @LastEditTime: 2022-08-26 13:22:16
 */

//初始化组件基础数据和fn
import {
    computed,
    reactive,
    watch,
    nextTick,
    toRaw,
    getCurrentInstance,
} from "vue";

import axios from "axios";
import { orderBy } from "lodash";

import { defaultOptions, defaultColumnOptions } from "./default";
import { useWindowSize } from "@vueuse/core";

const { width } = useWindowSize();

const initColumns = (columnsFromProps) =>
    columnsFromProps.map((col) => {
        return {
            ...defaultColumnOptions,
            ...(typeof col === "object" ? col : { title: col, field: col }),
        };
    });
const initTable = () => {
    let { proxy } = getCurrentInstance();

    let props = proxy.$props;
    let emit = proxy.$emit;

    const dataInfo = reactive({
        d_uuid: 0, //唯一的行号

        d_options: { ...defaultOptions, ...props.options },
        d_columns: initColumns(props.columns),
        d_rows: [],

        ref_rtableWrapper: null,
        ref_gridBodyTbl: null,
        ref_gridBodyHeaderTheadTr: null,
        ref_gridFixHeaderTheadTr: null,

        s_loading: false,
        s_fullscreen: false,

        d_totalRows: 0,
        d_currentPage: 1,
        d_currentPageSize: props?.options?.pageSize ?? 10,

        d_columnSort: null, //当前排序

        s_InfiniteScroll: false, //是否无限滚动加载

        c_pages: computed(() => {
            return dataInfo.d_options.url
                ? Math.max(
                      Math.ceil(
                          dataInfo.d_totalRows / dataInfo.d_currentPageSize
                      ),
                      1
                  )
                : 1;
        }),

        c_rows: computed(() => dataInfo.d_rows.map((row) => fn.getRawRow(row))),
        c_card: computed(() => {
            return props.layout == "card"
                ? true
                : props.layout == "gridview"
                ? false
                : width.value < 1024;
        }),
        width: width, //当前表格宽度
    });

    let getRemoteDataTimer = null;
    let fitHeaderTimer = null;

    const fn = {
        emit,

        clickCheck(index) {
            if (
                (dataInfo.d_options.checkbox || dataInfo.d_options.radioBox) &&
                !dataInfo.d_rows[index]["_selectDisable"]
            ) {
                dataInfo.d_rows[index]["_selected"] =
                    !dataInfo.d_rows[index]["_selected"];

                emit(
                    dataInfo.d_rows[index]["_selected"]
                        ? "Checked"
                        : "Unchecked",
                    fn.getRawRow(dataInfo.d_rows[index])
                );
            }
        },

        rowStyle(row, rowIndex) {
            return {
                ...(rowIndex % 2 == 1 ? { class: ["rtable-even-row"] } : null),

                ...dataInfo.d_options.rowStyle(row, rowIndex),
                ...(row._selected
                    ? { class: ["rtable-even-selected-row "] }
                    : null),
            };
        },

        getRemote: async (extparam, chg_totalRows = true) => {
            // table colname search uniqueID filter sort order limit offset where
            try {
                dataInfo.s_loading = true;

                let [where1, where2] = [
                    dataInfo.d_options?.params?.where ?? "",
                    props.query ?? "",
                ];

                let postData = {
                    ...toRaw(dataInfo.d_options.params),
                    ...toRaw(dataInfo.d_columnSort),
                    where: where1 + (where1 && where2 ? " AND " : "") + where2,
                    offset:
                        (dataInfo.d_currentPage - 1) *
                        dataInfo.d_currentPageSize,
                    limit: dataInfo.d_currentPageSize,
                    ...toRaw(extparam),
                };

                //无法使用qs  必须使用toRaw 否则数据会丢失
                let rst = await axios.post(
                    dataInfo.d_options.url,

                    postData
                );

                if (typeof rst.data !== "object") {
                    //TODO 是否标准各
                    throw "获取数据失败";
                }

                dataInfo.s_loading = false;

                chg_totalRows && (dataInfo.d_totalRows = rst.data.total);

                emit("LoadSuccess");
                return rst.data.rows;
            } catch (error) {
                return [];
            }
        },
        updateRemoteData: async () => {
            if (getRemoteDataTimer) {
                clearTimeout(getRemoteDataTimer);
            }

            getRemoteDataTimer = setTimeout(async () => {
                dataInfo.d_rows = fn.initRows(await fn.getRemote());
                emit("LoadSuccess");
                clearTimeout(getRemoteDataTimer);
            }, 500);
        },

        initRow: (row) => {
            return {
                _selected: false,
                _selectDisable: dataInfo.d_options.selectDisable,
                _expand: false,
                _uuid: dataInfo.d_uuid++,
                ...dataInfo.d_options.initRow(row),
            };
        },
        getRawRow: (row) => {
            return Object.keys(row).reduce((rst, key) => {
                if (
                    ![
                        "_selected",
                        "_selectDisable",
                        "_expand",
                        "_uuid",
                        "_",
                    ].includes(key)
                ) {
                    rst[key] = row[key];
                }

                return rst;
            }, {});
        },
        initRows: (rows) => rows.map((row) => fn.initRow(row)),

        initData: async () => {
            if (dataInfo.d_options.url) {
                dataInfo.d_currentPage = 1;
                fn.updateRemoteData();

                return;
            }

            dataInfo.d_rows = fn.initRows(
                JSON.parse(JSON.stringify(props.rows))
            );
        },

        /* -------------------------------------------------------------------------- */
        fitHeader: async () => {
            if (dataInfo.c_card) {
                return;
            }
            await nextTick();

            dataInfo.ref_gridBodyTbl.style.setProperty(
                "margin-top",
                -dataInfo.ref_gridBodyHeaderTheadTr.getBoundingClientRect()
                    .height -
                    1 +
                    "px"
            );

            for (
                let i = 0;
                i < dataInfo.ref_gridFixHeaderTheadTr.children.length;
                i++
            ) {
                dataInfo.ref_gridFixHeaderTheadTr.children[i].style.setProperty(
                    "width",
                    dataInfo.ref_gridBodyHeaderTheadTr.children[
                        i
                    ].getBoundingClientRect().width + "px"
                );
            }
        },

        fitHeaderDelay: () => {
            if (fitHeaderTimer) {
                clearTimeout(fitHeaderTimer);
            }
            fitHeaderTimer = setTimeout(() => {
                fn.fitHeader();
            }, 500);
        },
    };

    // ----------------------------------------------------------------

    watch(
        () => dataInfo.c_rows,
        (newRows) => {
            fn.fitHeader();
            emit("UpdateRows", newRows);
        },
        {
            deep: true,
        }
    );

    // ----------------------------------------------------------------

    watch(width, (nn) => {
        fn.fitHeaderDelay();
    });

    watch(
        () => props.query,
        () => dataInfo.d_currentPageSize,
        () => {
            dataInfo.d_currentPage = 1;
        }
    );

    watch([() => dataInfo.d_currentPage], () => {
        fn.updateRemoteData();
    });

    watch(
        [
            // () => dataInfo.d_currentPage,
            () => dataInfo.d_currentPageSize,

            () => props.query,
            () => dataInfo.d_columnSort,
        ],
        () => {
            if (!dataInfo.d_options.url) {
                dataInfo.d_rows = orderBy(
                    dataInfo.d_rows,
                    function (row) {
                        return dataInfo.d_columnSort
                            ? dataInfo.d_columnSort.sortNumber
                                ? +row[dataInfo.d_columnSort.sort]
                                : row[dataInfo.d_columnSort.sort]
                            : row["_uuid"];
                    },
                    [dataInfo.d_columnSort.order]
                );
                return;
            }

            fn.updateRemoteData();
        }
    );

    // ----------------------------------------------------------------
    // ----------------------------------------------------------------

    proxy.dataInfo = dataInfo;
    proxy.fn = fn;
    fn.initData();

    return { dataInfo, fn };
};
export default initTable;
