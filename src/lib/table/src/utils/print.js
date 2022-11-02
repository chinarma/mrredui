/*
 * @Project: Mr.red
 * @Author: chinarma@qq.com
 * @Date: 2022-08-18 18:22:51
 * @LastEditTime: 2022-08-18 18:56:41
 */
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
