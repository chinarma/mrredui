/*
 * @Project: Mr.red
 * @Author: chinarma@qq.com
 * @Date: 2022-08-18 18:00:14
 * @LastEditTime: 2022-08-25 13:42:08
 */
export const defaultOptions = {
    height: "10em",
    class: undefined,
    expand: false,
    rowno: true,
    radio: false,
    checkbox: false,
    selected: false,
    selectDisable: false,
    undefinedText: "-",

    rowStyle(row, index) {
        return {};
    },
    cols: [{ title: "cols options error", filed: "error" }],
    // rows: [],
    url: undefined,
    params: null,
    pageSize: 10,
    initRow(row) {
        return row;
    },
    handleDownloadRow(row) {
        return row;
    },
    more: true,
    border: true,
    // card: window.innerWidth < 1024, //TODO 准备迁移出去
};
export const defaultColumnOptions = {
    field: undefined,
    title: undefined,
    width: false,
    class: null, //string
    style: null, //string
    minWidth: "0px",
    print: true,
    formatter: undefined,
    events: undefined,
    sort: false,
    sortNumber: false, //是否已数字排序，内部做数字转换
};

export const props = {
    columns: {
        type: Array,
        required: true,
    },
    query: {
        type: String,
        default: null,
    },
    rows: {
        type: Array,
        default: function () {
            return [];
        },
    },
    options: {
        type: Object,
        default: function () {
            return defaultOptions;
        },
    },

    layout: {
        type: String,
        default: "auto", //card gridview auto
    },
};
