<preview>为 Alert 设置图标</preview>
<template>
    <r-alert title="Default 类型">
        <template #icon>
            <r-icon class="r-alert-icon" :size="22">
                <IosAirplane />
            </r-icon>
        </template>
    </r-alert>
    <r-alert title="Info 类型" type="info" show-icon />
    <r-alert title="Success 类型" type="success" show-icon />
    <r-alert title="Warning 类型" type="warning" show-icon />
    <r-alert title="Error 类型" type="error" show-icon />
</template>
<script setup lang="ts">
import { IosAirplane } from "@vicons/ionicons4";
</script>
