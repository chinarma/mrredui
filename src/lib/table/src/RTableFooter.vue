<template>
    <div class="rtable-footer-wrapper" ref="ref_footerWrapper">
        <div class="rtable-footer-left-wrapper rtable-column-gap">
            <div class="rtable-footer-toolarea-wrapper rtable-column-gap">
                <span
                    v-if="d_rows.length"
                    title="全屏显示"
                    v-html="icons.full_screen"
                    @click="s_fullscreen = !s_fullscreen"
                >
                </span>
                <span
                    v-if="d_rows.length"
                    @click="downloadExcel()"
                    title="下载所有数据"
                    v-html="icons.excel"
                >
                </span>

                <span
                    v-if="d_options.url"
                    @click="
                        refresh();
                        d_scrollCurrentPage = 1;
                    "
                    v-html="icons.restore"
                >
                </span>
            </div>
            <div class="rtable-footer-setuparea-wrapper rtable-column-gap">
                <span></span>
                <span
                    v-if="d_options.url"
                    style="cursor: pointer"
                    @click="s_scrollLoadMode = !s_scrollLoadMode"
                    title="切换加载远程数据模式"
                    v-html="s_scrollLoadMode ? icons.wheel : icons.page_nav"
                >
                </span>
            </div>

            <span></span>

            <span>
                {{
                    d_options.url
                        ? `显示 ${
                              (d_currentPage - 1) * d_currentPageSize + 1
                          } 到 ${
                              (d_currentPage - 1) * d_currentPageSize +
                              d_rows.length
                          }`
                        : ""
                }}

                {{ ` 共 ${d_options.url ? d_totalRows : d_rows.length} 行` }}
            </span>
        </div>

        <template v-if="d_options.url">
            <RPagination
                v-if="!s_scrollLoadMode"
                v-model:currentPage="d_currentPage"
                :pages="c_pages"
                v-model:currentPageSize="d_currentPageSize"
            />
        </template>
    </div>
</template>

<script>
import { toRefs, inject, watch, onMounted } from "vue";
import RPagination from "./RPagination.vue";

import icons from "./icons";
import { getMaxZIndex } from "./utils";

export default {
    components: {
        RPagination,
    },
    setup() {
        const dataInfo = inject("dataInfo");
        const fn = inject("fn");
        const { downloadExcel, refresh } = inject("methods");

        dataInfo["s_fullscreen"] = false;
        dataInfo["d_nowZindex"] = null;

        onMounted(() => {
            document.addEventListener("keydown", function (e) {
                //此处填写你的业务逻辑即可
                if (e.keyCode == 27) {
                    dataInfo.s_fullscreen = false;
                }
            });
        });

        watch(
            () => dataInfo.s_fullscreen,
            (newValue) => {
                if (newValue) {
                    //添加 fullscreen class  添加新的z-index

                    dataInfo.d_nowZindex =
                        dataInfo.ref_rtableWrapper.style.zIndex;

                    dataInfo.ref_rtableWrapper.style.zIndex =
                        getMaxZIndex() + 100;
                    fn.fitHeader();
                    return;
                }
                //删除fullscreen class  恢复z-index;

                dataInfo.ref_rtableWrapper.style.zIndex = dataInfo.d_nowZindex;

                fn.fitHeader();
            }
        );

        return {
            ...toRefs(dataInfo),
            icons,
            downloadExcel,
            refresh,
        };
    },
};
</script>

<style lang="scss" scoped>
@import "./style.scss";

.rtable-footer-wrapper {
    > * {
        margin: 0.5em;
    }

    .rtable-column-gap > * + * {
        //对应前面有元素的元素
        margin-left: 5px;
    }

    @media (min-width: 1024px) {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .rtable-footer-left-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        // margin-bottom: 2px;
        > .rtable-footer-toolarea-wrapper {
            display: flex;
            > * {
                cursor: pointer;
            }
        }
        > .rtable-footer-setuparea-wrapper {
            display: flex;
            > * {
                cursor: pointer;
            }
        }
    }
}
</style>
