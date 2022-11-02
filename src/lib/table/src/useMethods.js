import { getCurrentInstance } from "vue";
import { jsonToExcelConvertor } from "./utils/download";
export const useMethods = () => {
    let { proxy } = getCurrentInstance();

    let emit = proxy.$emit;

    const [props, dataInfo, fn] = [proxy.$props, proxy.dataInfo, proxy.fn];

    const methods = {
        refresh() {
            fn.initData();
        },

        getData() {
            return JSON.parse(JSON.stringify(dataInfo.c_rows));
        },
        //在指定位置插入行 i 为行号 0 --
        appendRow(row, last = true) {
            dataInfo.d_rows.splice(
                last == true ? dataInfo.d_rows.length : i,
                0,
                fn.initRow(row)
            );
        },
        appendRows(rows) {
            for (const row of rows) {
                methods.appendRow(row);
            }
        },
        prependRow(row) {
            dataInfo.d_rows.unshift(fn.initRow(row));
        },
        prependRows(rows) {
            for (const row of rows) {
                methods.prependRow(row);
            }
        },
        removeByIndex(index) {
            dataInfo.d_rows.splice(index, 1);
        },
        removeByCol(colname, colvalue) {
            for (let index = dataInfo.d_rows.length - 1; index > -1; index--) {
                if (dataInfo.d_rows[index][colname] == colvalue) {
                    dataInfo.d_rows.splice(index, 1);
                }
            }
        },
        removeAll() {
            dataInfo.d_rows = [];
        },

        updateCell(index, field, value) {
            dataInfo.d_rows[index][field] = value;
        },

        /* -------------------------------------------------------------------------- */

        checkByIndex(index, value = true) {
            dataInfo.d_rows[index]["_selected"] = Boolean(value);
        },

        checkAll(checked = true) {
            for (let row of dataInfo.d_rows) {
                if (!row["_selectDisable"]) {
                    row["_selected"] = Boolean(checked);
                }
            }
        },

        disableCheckByIndex(row, value = true) {
            dataInfo.d_rows[index]["_selectDisable"] = Boolean(value);
        },

        getSelections() {
            return dataInfo.d_rows.reduce((rst, row, index) => {
                if (row._selected) {
                    rst.push(fn.getRawRow(row));
                }
                return rst;
            }, []);
        },

        getRawRow(row) {
            return fn.getRawRow(row);
        },

        /* -------------------------------------------------------------------------- */
        downloadExcel: async () => {
            try {
                let rst = dataInfo.d_options.url
                    ? await fn.getRemote({
                          offset: 0,
                          limit: 10000,
                      })
                    : dataInfo.d_rows.map((row) =>
                          Object.keys(row).reduce((filterRow, key) => {
                              if (
                                  ![
                                      "_selected",
                                      "_selectDisable",
                                      "_expand",
                                      "_uuid",
                                  ].includes(key)
                              ) {
                                  filterRow[key] = row[key];
                              }
                              return filterRow;
                          }, {})
                      );

                /////////////////////////////////////////

                rst = rst.map((row) =>
                    dataInfo.d_options.handleDownloadRow(row)
                );
                let colsArr = rst.reduce((rst, row) => {
                    let tmp = rst.concat(Object.keys(row));

                    return Array.from(new Set(tmp));
                }, []);

                /////////////////////////////////////////

                jsonToExcelConvertor(rst, "下载表格", colsArr, "xls");
            } catch (error) {
                console.log(error);
            }
        },
    };

    return methods;
};
