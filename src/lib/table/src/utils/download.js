/*
 * @Project: Mr.red
 * @Author: chinarma@qq.com
 * @Date: 2022-08-18 18:22:58
 * @LastEditTime: 2022-08-18 18:23:18
 */
export const jsonToExcelConvertor = (JSONData, FileName, ShowLabel, type) => {
    type = type ? type : "xls";
    var application =
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    if (type == "xls") {
        application = "application/vnd.ms-excel";
    }

    // 先转化json
    var arrData = typeof JSONData != "object" ? JSON.parse(JSONData) : JSONData;

    var excel = "<table>";

    // 设置表头
    var rr = "<tr>";
    for (var j = 0, l = ShowLabel.length; j < l; j++) {
        rr += "<td>" + ShowLabel[j] + "</td>";
    }

    // 换行
    excel += rr + "</tr>";

    // 设置数据
    for (var i = 0; i < arrData.length; i++) {
        var row = "<tr>";

        for (var index = 0; index < ShowLabel.length; index++) {
            var value = arrData[i][ShowLabel[index]];

            value =
                value === null || value === "." || typeof value == "undefined"
                    ? ""
                    : typeof value != "object"
                    ? value + ""
                    : JSON.stringify(value);

            row +=
                "<td style='vnd.ms-excel.numberformat:@;'>" + value + "</td>";
        }

        excel += row + "</tr>";
    }

    excel += "</table>";

    var excelFile =
        "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:x='urn:schemas-microsoft-com:office:excel' xmlns='http://www.w3.org/TR/REC-html40'>";
    excelFile +=
        '<meta http-equiv="content-type" content="' +
        application +
        '; charset=UTF-8">';
    excelFile += '<meta http-equiv="content-type" content="' + application;
    excelFile += '; charset=UTF-8">';
    excelFile += "<head>";
    excelFile += "<!--[if gte mso 9]>";
    excelFile += "<xml>";
    excelFile += "<x:ExcelWorkbook>";
    excelFile += "<x:ExcelWorksheets>";
    excelFile += "<x:ExcelWorksheet>";
    excelFile += "<x:Name>";
    excelFile += "{worksheet}";
    excelFile += "</x:Name>";
    excelFile += "<x:WorksheetOptions>";
    excelFile += "<x:DisplayGridlines/>";
    excelFile += "</x:WorksheetOptions>";
    excelFile += "</x:ExcelWorksheet>";
    excelFile += "</x:ExcelWorksheets>";
    excelFile += "</x:ExcelWorkbook>";
    excelFile += "</xml>";
    excelFile += "<![endif]-->";
    excelFile += "</head>";
    excelFile += "<body>";
    excelFile += excel;
    excelFile += "</body>";
    excelFile += "</html>";

    var uri =
        "data:" +
        application +
        ";charset=utf-8," +
        encodeURIComponent(excelFile);

    var link = document.createElement("a");
    link.href = uri;
    //TODO Cannot set property style of #<HTMLElement> which has only a getter
    link.style = "visibility:hidden";
    link.download = FileName + "." + type;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};
