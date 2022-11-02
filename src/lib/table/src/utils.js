/*
 * @Project: Mr.red
 * @Author: chinarma@qq.com
 * @Date: 2022-08-18 18:09:44
 * @LastEditTime: 2022-08-24 20:58:23
 */
export const getMoreHtml = (row) => {
    let html = `
            <div style="font-size: 1.2em;font-weight: bold;padding-bottom: 0.2em;border-bottom: 1px solid lightgray;">详细信息</div>
            <div style="max-height: 300px;overflow-y: auto;padding: 0.5em;">
            <table style="margin:0;padding:0;border:0">`;
    for (const key of Object.keys(row)) {
        if (
            row[key] &&
            key != "_uuid" &&
            (typeof row[key] == "string" || typeof row[key] == "number") &&
            row[key][0] != "{" &&
            row[key][0] != "["
        ) {
            html += `<tr>
                        <td style="margin:0;padding:0;border:0">${key}</td>
                        <td style="margin:0;padding:0;border:0;width:1px">:</td>
                        <td style="margin:0;padding:0;border:0;max-width:100px">${row[key]}</td>
                    </tr>`;
        }
    }

    html += `</table></div>`;

    return html;
};

export const chgColSort = (d_columns, field) => {
    for (const key in d_columns) {
        if (d_columns[key].field == field) {
            d_columns[key].order =
                d_columns[key].order == null
                    ? "asc"
                    : d_columns[key].order == "asc"
                    ? "desc"
                    : null;
        } else {
            d_columns[key].order = null;
        }
    }
};

export const printHtml = (html) => {
    let divTemp = document.createElement("div");

    divTemp.style.position = "fixed";

    divTemp.style.top = "0";
    divTemp.style.left = "0";
    divTemp.style.right = "0";

    divTemp.innerHTML = html;

    document.body.appendChild(divTemp);

    nextTick(() => {
        window.print();
        document.body.removeChild(divTemp);
    });
};

export const getMaxZIndex = () => {
    var eles = document.querySelectorAll("*");
    for (var i = 0, maxZindex = 0; i < eles.length; i++) {
        maxZindex = Math.max(maxZindex, eles[i].style.zIndex || 0);
    }
    return maxZindex;
};
