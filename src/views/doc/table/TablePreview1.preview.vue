<preview>基础用法</preview>
<template>
    <r-affix :offset="80" position="top" style="width: 100%">
        <r-table
            theme="primary"
            :columns="[
                { field: 'x', title: 'x', sort: true },
                { field: 'y', title: 'y', sort: true },
                { field: 'z', title: 'z', sort: true },
            ]"
            :options="{
                checkbox: true,
                expand: true,
            }"
            :rows="[
                { x: 1, y: 10, z: 100 },
                { x: 2, y: 20, z: 200 },
            ]"
            class="w-full"
            @checkedChange="test($event)"
        >
            <template #x="obj">
                <span style="width: 900px">{{ obj }}</span>
            </template>
            <template #y="obj">
                <span>{{ obj }}</span></template
            >
            <template #z="obj"> {{ obj }}</template>
            <template #detail="obj"> {{ obj }}</template>
        </r-table>
    </r-affix>
</template>

<script setup>
const test = (e) => {
    console.log(e);
};
</script>
