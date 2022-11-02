import rtooltip from "./rtooltip";

export default {
    install: function (Vue, option) {
        Vue.directive("rtooltip", rtooltip);
    },
};
