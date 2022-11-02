import { createPopper } from "@popperjs/core";
import "./rtooltip.scss";

//v-rtooltip:arg.modifiers1.modifiers2"value"
//binding.arg=bottom
// binding.value=value  值或者函数
// binding.modifiers= {modifiers1:true,modifiers2:true} // dark light
// biding.instance  当前的组件
// binding.dir the directive definition object

export default {
    name: "rtooltip",
    //  v-rtooltip:bottom
    mounted: (el, binding, vnode) => {
        let _tooltip, _timer, _timer_show;

        const show = () => {
            _timer_show = setTimeout(() => {
                if (el._pp) {
                    clearTimeout(_timer);
                    return;
                }

                if (
                    !binding.value ||
                    !["function", "string", "number"].includes(
                        typeof binding.value
                    )
                ) {
                    return false;
                }
                //创建显示内容

                _tooltip = document.createElement("div");
                _tooltip.className = "popover-content";

                if (binding.modifiers?.light) {
                    _tooltip.style.backgroundColor = "white";

                    _tooltip.style.color = "gray";
                } else {
                    _tooltip.style.backgroundColor = "black";
                    _tooltip.style.opacity = "0.5";

                    _tooltip.style.color = "white";
                }

                // _tooltip.style.maxWidth = "50px";

                document.body.appendChild(_tooltip);
                if (typeof binding.value === "function") {
                    let content = binding.value();
                    if (content && typeof content.then === "function") {
                        _tooltip.innerHTML =
                            '加载中..<div data-popper-arrow class="popover-content-arrow"></div>';

                        content
                            .then((asyncResult) => {
                                _tooltip.innerHTML =
                                    asyncResult +
                                    '<div data-popper-arrow class="popover-content-arrow"></div>';

                                el._pp && el._pp.update();
                            })

                            .catch();
                    } else {
                        _tooltip.innerHTML =
                            content +
                            '.<div data-popper-arrow class="popover-content-arrow"></div>';
                    }
                } else {
                    _tooltip.innerHTML =
                        binding.value +
                        '<div data-popper-arrow class="popover-content-arrow"></div>';
                }

                el._tooltip = _tooltip;

                el._pp = createPopper(
                    el,
                    _tooltip,

                    {
                        // placement: "bottom" + loc,
                        placement: binding.arg ?? "bottom",

                        modifiers: [
                            {
                                name: "offset",
                                options: {
                                    offset: [5, 8],
                                },
                            },
                        ],
                    }
                );
                el._pp.update();

                // tooltip内容
                _tooltip.addEventListener("mouseenter", show);
                _tooltip.addEventListener("mouseleave", hide);
            }, 500);
        };
        const hide = () => {
            clearTimeout(_timer_show);

            _timer = setTimeout(() => {
                el._tooltip && el._tooltip.remove();
                el._tooltip = null;
                el._pp && el._pp.destroy();
                el._pp = null;
            }, 1000);
        };

        el.addEventListener("mouseenter", show);
        el.addEventListener("mouseleave", hide);
    },
    unmounted(el) {
        el._tooltip && el._tooltip.remove();
        el._tooltip = null;

        el._pp && el._pp.destroy();
        el._pp = null;
    },
};
