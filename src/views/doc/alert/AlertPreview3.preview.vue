<preview>使文字居中</preview>
<template>
    <r-alert title="Default 类型" center>
        <template #icon>
            <r-icon class="r-alert-icon" :size="22">
                <IosAirplane />
            </r-icon>
        </template>
    </r-alert>
    <r-alert title="Info 类型" type="info" show-icon center />
    <r-alert title="Success 类型" type="success" show-icon center />
    <r-alert title="Warning 类型" type="warning" show-icon center />
    <r-alert title="Error 类型" type="error" show-icon center />
</template>
<script setup lang="ts">
import { IosAirplane } from "@vicons/ionicons4";
</script>
