<!--
 * @Project: Mr.red
 * @Author: chinarma@qq.com
 * @Date: 2020-11-23 02:12:51
 * @LastEditTime: 2022-08-25 12:14:49
-->
<template>
    <div class="rpagination-wrapper">
        <span
            class="rpagination-item"
            style="margin-right: 2px"
            @click="currentPage > 1 && $emit('update:currentPage', currentPage - 1)"
            :style="currentPage == 1 ? { color: 'gray', 'font-weight': 100 } : null"
            >&lt;</span
        >

        <span
            class="rpagination-item"
            :class="
                currentPage == 1
                    ? 'rpagination-item-selected'
                    : 'rpagination-item-unselected'
            "
            @click="$emit('update:currentPage', 1)"
            >1</span
        >

        <template v-for="pageNo in pages > 1 ? pages - 2 : pages - 1" :key="pageNo + 1">
            <span
                class="rpagination-item"
                v-if="pageNo == currentPage - 4"
                @click="$emit('update:currentPage', Math.max(1, currentPage - 5))"
            >
                ...
            </span>
            <span
                class="rpagination-item"
                :class="
                    currentPage == pageNo + 1
                        ? 'rpagination-item-selected'
                        : 'rpagination-item-unselected'
                "
                v-if="currentPage == pageNo || Math.abs(currentPage - pageNo - 1) <= 2"
                @click="$emit('update:currentPage', pageNo + 1)"
                >{{ pageNo + 1 }}</span
            >

            <span
                class="rpagination-item"
                v-if="pageNo == currentPage + 2"
                @click="$emit('update:currentPage', Math.min(pages, currentPage + 5))"
            >
                ...
            </span>
        </template>

        <span
            v-if="pages > 1"
            class="rpagination-item"
            :class="
                currentPage == pages
                    ? 'rpagination-item-selected'
                    : 'rpagination-item-unselected'
            "
            @click="$emit('update:currentPage', pages)"
        >
            {{ pages }}
        </span>

        <span
            class="rpagination-item font-bold"
            style="margin-left: 2px"
            :style="currentPage == pages ? { color: 'gray', 'font-weight': 100 } : null"
            @click="currentPage < pages && $emit('update:currentPage', currentPage + 1)"
            >&gt;</span
        >

        <select class="rpagination-item" v-model="d_currentPageSize">
            <template
                v-for="pageNum in [5, 10, 50, 100, 1000]"
                :key="`pageNum-${pageNum}}`"
            >
                <option :value="pageNum">
                    {{ `${pageNum}条/页` }}
                </option>
            </template>
        </select>
    </div>
</template>

<script>
import { ref, watch } from "vue";
export default {
    props: ["pages", "currentPage", "pageSizeList", "currentPageSize"],
    emits: ["update:currentPageSize", "update:currentPage"],
    setup(props, ctx) {
        const d_currentPageSize = ref(props.currentPageSize);

        watch(d_currentPageSize, (newValue) => {
            ctx.emit("update:currentPageSize", newValue);
        });

        return {
            d_currentPageSize,
        };
    },
};
</script>

<style lang="scss" scoped>
.rpagination-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 1;

    .rpagination-item {
        padding: 0.2em 0.5em;

        border-width: 1px;
        margin-right: -1px;

        --bg-opacity: 1;

        cursor: pointer;
        // margin-left: 0.2rem;
        // margin-right: 0.2rem;
    }

    .rpagination-item-unselected {
        background-color: #e2e8f0;
        background-color: rgba(226, 232, 240, var(--bg-opacity));
    }

    .rpagination-item-selected {
        color: white;
        font-weight: 700;

        background-color: #f56565;
        background-color: rgba(245, 101, 101, var(--bg-opacity));
    }
}
</style>
