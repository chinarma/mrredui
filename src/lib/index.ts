import { App } from "vue";

import RAvatar from "./avatar/index.vue";
import RButton from "./button/index.vue";
import RDivider from "./divider/index.vue";
import REllipsis from "./ellipsis/index.vue";
import RGradientText from "./gradient-text/index.vue";
import RIcon from "./icon/index.vue";
import RLink from "./link/index.vue";
import RTag from "./tag/index.vue";

import RCheckbox from "./checkbox/checkbox.vue";
import RCheckboxGroup from "./checkbox/checkbox-group.vue";
import RInput from "./input/index.vue";
import RRadio from "./radio/radio.vue";
import RRadioGroup from "./radio/radio-group.vue";
import RSelect from "./select/index.vue";
import RSwitch from "./switch/index.vue";

import RAlert from "./alert/index.vue";
import RDialog from "./dialog/index.vue";
import RMessage from "./message/index.ts";
import { openDialog } from "./dialog/openDialog";

import RAffix from "./affix/index.vue";
import RBacktop from "./backtop/index.vue";
import RBreadcrumb from "./breadcrumb/breadcrumb.vue";
import RBreadcrumbItem from "./breadcrumb/breadcrumb-item.vue";
import jwPageHeader from "./page-header/index.vue";
import RTabs from "./tabs/index.vue";
import RTab from "./tab/index.vue";
import RTable from "./table";

import RTooltip from "./rtooltip/rtooltip";

export {
    /* 通用组件 */
    RAvatar,
    RButton,
    RDivider,
    REllipsis,
    RGradientText,
    RIcon,
    RLink,
    RTag,
    /* 数据录入组件 */
    RCheckbox,
    RCheckboxGroup,
    RInput,
    RRadio,
    RRadioGroup,
    RSelect,
    RSwitch,
    /* 反馈组件 */
    RAlert,
    RDialog,
    RMessage,
    openDialog,
    /* 导航组件 */
    RAffix,
    RBacktop,
    RBreadcrumb,
    RBreadcrumbItem,
    jwPageHeader,
    RTabs,
    RTab,
    /* 已使用组件 */
    RTable,
};

const components = [
    RAvatar,
    RButton,
    RDivider,
    REllipsis,
    RGradientText,
    RIcon,
    RLink,
    RTag,

    RCheckbox,
    RCheckboxGroup,
    RInput,
    RRadio,
    RRadioGroup,
    RSelect,
    RSwitch,

    RAlert,
    RDialog,

    RAffix,
    RBacktop,
    RBreadcrumb,
    RBreadcrumbItem,
    jwPageHeader,
    RTabs,
    RTab,
    RTable,
];

const directives = [RTooltip];

export function registerRUi(app: App): void {
    for (const component of components) {
        app.component(component.name, component);
    }

    for (const directive of directives) {
        app.directive(directive.name, directive);
    }
}

export default registerRUi;
