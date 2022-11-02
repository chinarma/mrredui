<template>
    <div class="affix-doc-wrapper">
        <h1>表格 Table</h1>
        <p>可支持cardview模式,可选择远程数据。</p>
        <div class="preview-wrapper">
            <Preview :component="TablePreview1" />
            <!-- <Preview :component="TablePreview2" />
            <Preview :component="TablePreview3" /> -->
            <Doc title="属性" type="prop" :body="propsDoc" />
            <Doc title="属性 columns" type="prop" :body="propsDoc_columns" />
            <Doc title="属性 options" type="prop" :body="propsDoc_options" />
            <Doc title="事件" type="event" :body="eventDoc" />
            <Doc title="方法" type="methods" :body="methodsDoc" />
            <Doc title="插槽" type="slot" :body="slotDoc" />
            <PrevAndNext
                :prev="{ path: '/doc/message', name: '信息 Message' }"
                :next="{ path: '/doc/backtop', name: '回到顶部 Backtop' }"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import Preview from "@/components/Preview.vue";
import TablePreview1 from "./TablePreview1.preview.vue";
// import TablePreview2 from "./TablePreview2.preview.vue";
// import TablePreview3 from "./TablePreview3.preview.vue";
import PrevAndNext from "@/components/PrevAndNext.vue";
import Doc from "@/components/Doc.vue";

const propsDoc = [
    ["columns", "列信息", "Array", "[String] | [Object]", "-"],
    ["query", "SQL查询子语句", "String", "-", "NULL"],
    ["rows", "指定容器（CSS 选择器）", "Arrary", "-", "-"],
    ["options", "选项", "Object", "-", "NULL"],
    ["layout", "布局模式", "String", "auto / grid / card", "auto"],
];

const propsDoc_columns = [
    ["field", "字段名称", "String", "-", "-"],
    ["title", "表头显示列名", "String", "field", "-"],
    ["width", "列宽度", "String", "auto", "2em,10px"],
    ["class", "css class", "string", "-", "全局class"],
    ["style", "css style", "String", "-", "-"],
    ["minWidth", "最小宽度", "String", "auto", "2em,10px"],
    ["print", "是否打印", "Boolean", "true", "-"],
    ["formatter", "格式化显示", "Function", "-", "-"],
    ["sort", "排序", "String", "null", "order : asc,desc"],
    ["sortNumber", "是否转换为数字再排序", "Boolean", "false", "-"],
];
const propsDoc_options = [
    ["border", "字段名称", "Boolean", "true", "-"],
    ["expand", "字段名称", "Boolean", "-", "-"],
    ["rowno", "字段名称", "Boolean", "-", "-"],
    ["selectDisable", "Boolean", "String", "-", "-"],
    ["selected", "Boolean", "Boolean", "-", "-"],

    ["more", "字段名称", "Boolean", "-", "-"],
    ["checkbox", "字段名称", "Boolean", "-", "-"],
    ["radio", "字段名称", "Boolean", "-", "-"],

    ["height", "字段名称", "String", "-", "-"],
    ["class", "字段名称", "String", "-", "-"],
    ["undefinedText", "字段名称", "String", "-", "-"],
    ["cols", "字段名称", "String", "-", "-"],
    ["url", "字段名称", "String", "-", "-"],
    ["params", "字段名称", "String", "-", "-"],
    ["pageSize", "字段名称", "String", "-", "-"],
    ["initRow", "字段名称", "String", "-", "-"],
    ["rowStyle", "字段名称", "String", "-", "-"],

    ["handleDownloadRow", "字段名称", "String", "-", "-"],
];

const eventDoc = [
    ["checkedChange", "选择数量改变了", "-"],
    ["Checked", "选择了某行	", "Event"],
    ["Unchecked", "取消选择了某行	", "Event"],
];
const methodsDoc = [["update", "手动更新固钉状态", "-"]];
const slotDoc = [
    ["title", "表格标题caption"],
    ["[field]", "替代列显示"],
    ["row", "代替行项显示,要用 <td colspan='1000'></td>  包裹"],
    ["detail", "行扩展显示"],
];
</script>

<style lang="scss">
.r-affix {
    margin-right: 8px;
}
</style>
