<preview>图标分隔符</preview>
<template>
    <r-breadcrumb :separator-icon="ArrowForwardIosSharp">
        <r-breadcrumb-item :to="{ path: '/' }">homepage</r-breadcrumb-item>
        <r-breadcrumb-item
            ><a href="/">promotion management</a></r-breadcrumb-item
        >
        <r-breadcrumb-item>promotion list</r-breadcrumb-item>
        <r-breadcrumb-item>promotion detail</r-breadcrumb-item>
    </r-breadcrumb>
</template>

<script setup lang="ts">
import { ArrowForwardIosSharp } from "@vicons/material";
</script>
