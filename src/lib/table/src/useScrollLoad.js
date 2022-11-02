/*
 * @Project: Mr.red
 * @Author: chinarma@qq.com
 * @Date: 2022-08-25 16:16:05
 * @LastEditTime: 2022-08-27 09:55:10
 */
import { ref, watch, inject } from "vue";

export const useScrollLoad = () => {
    const dataInfo = inject("dataInfo");
    const props = inject("props");
    const fn = inject("fn");

    // ----------------------------------------------------------------
    //ref grid 数据wrapper
    const ref_gridBodyWrapper = ref(null);
    dataInfo.ref_gridBodyWrapper = ref_gridBodyWrapper;

    //ref card 数据wrapper
    const ref_cardWrapper = ref(null);
    dataInfo.ref_cardWrapper = ref_cardWrapper;

    //滚动提示栏
    const ref_scrollTip = ref(null);
    dataInfo.ref_scrollTip = ref_scrollTip;

    const ref_footerWrapper = ref(null);
    dataInfo.ref_footerWrapper = ref_footerWrapper;

    // ----------------------------------------------------------------

    //当前是否之用滚动加载模式
    const s_scrollLoadMode = ref(false);
    dataInfo.s_scrollLoadMode = s_scrollLoadMode;

    const d_scrollCurrentPage = ref(1);
    dataInfo.d_scrollCurrentPage = d_scrollCurrentPage;

    watch(s_scrollLoadMode, async (newValue) => {
        //分页模式-> 滚动模式
        if (newValue) {
            dataInfo.d_currentPage = 1;
            d_scrollCurrentPage.value = 1;
            return;
        }
        //滚动模式-> 分页模式

        if (d_scrollCurrentPage.value != 1) {
            //触发重新加载第一页
            fn.updateRemoteData();
        }
    });

    //滚动缓冲次数
    const d_scrollCounter = ref(0);
    dataInfo.d_scrollCounter = d_scrollCounter;

    watch(d_scrollCounter, (newValue) => {
        if (newValue > 0) {
            resetScrollCounter();

            if (newValue == 6) {
                console.log("准备加载数据");
                //取下一页数据
                m_scrollLoadNextPage();
            }
        }
    });

    // ----------------------------------------------------------------
    // 处理已滚动后返回滚动第一页
    watch([() => props.query, () => dataInfo.d_columnSort], () => {
        if (s_scrollLoadMode) {
            d_scrollCurrentPage.value = 1;
        }
    });
    // ----------------------------------------------------------------

    const m_scrollLoadNextPage = async () => {
        d_scrollCurrentPage.value++;
        let newRows = await fn.getRemote({
            offset:
                (d_scrollCurrentPage.value - 1) * dataInfo.d_currentPageSize,
        });

        newRows.forEach((row) => {
            dataInfo.d_rows.push(fn.initRow(row));
        });
    };

    let resetScrollCounterTimer = null;
    const resetScrollCounter = () => {
        if (resetScrollCounterTimer) {
            clearTimeout(resetScrollCounterTimer);
        }

        resetScrollCounterTimer = setTimeout(() => {
            d_scrollCounter.value = 0;
            clearTimeout(resetScrollCounterTimer);
        }, 3000);
    };

    // ----------------------------------------------------------------
    let startY, endY, diff;

    const m_handleTouchStartEvent = (e, captureEL) => {
        diff = 0;
        let touch = e.touches[0];
        startY = touch.pageY;
    };

    //处理touchmove 计算滚动距离 判断是否 停止冒泡
    const m_handleTouchMoveEvent = (e) => {
        let touch = e.touches[0];
        endY = touch.pageY;
        diff = endY - startY;
    };

    // ----------------------------------------------------------------
    const isScrollLoadReady = (captureEL) => {
        if (!s_scrollLoadMode.value) {
            return false;
        }
        //判断是否有需要加载的
        if (!dataInfo.d_options.url) {
            return false;
        }
        if (
            dataInfo.d_totalRows <=
            d_scrollCurrentPage.value * dataInfo.d_currentPageSize
        ) {
            return false;
        }

        //判断是否有滚动条

        //有滚动条
        if (captureEL.clientHeight !== captureEL.scrollHeight) {
            //没有有滚动到底部
            if (
                captureEL.scrollTop + captureEL.clientHeight <
                captureEL.scrollHeight
            ) {
                d_scrollCounter.value = 0;

                return false;
            }
        }

        return true;
    };
    const m_handleWheelScrollEvent = (e, captureEL) => {
        // 非滚动模式直接返回

        if (!isScrollLoadReady(captureEL)) {
            return;
        }

        if (dataInfo.s_loading) {
            e.preventDefault(); //停止冒泡
            return;
        }
        //向下滚动

        // console.log(e);

        if (e.type == "wheel" && e.deltaY > 0) {
            e.preventDefault(); //停止冒泡
            d_scrollCounter.value++;

            return;
        }

        if (e.type == "touchend") {
            if (Math.abs(diff) > 150) {
                if (diff < 0) {
                    // 向上

                    if (diff < -500) {
                        d_scrollCounter.value = 6;
                    } else {
                        d_scrollCounter.value = d_scrollCounter.value + 3;
                    }

                    console.log("向上", diff);
                    // e.preventDefault(); //停止冒泡
                }
            }
        }
    };

    return {
        m_handleWheelScrollEvent,
        m_scrollLoadNextPage,
        m_handleTouchStartEvent,
        m_handleTouchMoveEvent,
    };
};
