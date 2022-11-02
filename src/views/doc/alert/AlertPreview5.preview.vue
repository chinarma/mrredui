<preview>可以关闭</preview>
<template>
    <r-alert title="Default 类型" closeable description="这是一段描述">
        <template #icon>
            <r-icon class="r-alert-icon" :size="22">
                <IosAirplane />
            </r-icon>
        </template>
    </r-alert>
    <r-alert
        title="Info 类型"
        type="info"
        show-icon
        closeable
        description="这是一段描述"
    />
    <r-alert
        title="Success 类型"
        type="success"
        show-icon
        closeable
        description="这是一段描述"
    />
    <r-alert
        title="Warning 类型"
        type="warning"
        show-icon
        closeable
        description="这是一段描述"
    />
    <r-alert
        title="Error 类型"
        type="error"
        show-icon
        closeable
        description="这是一段描述"
    />
</template>
<script setup lang="ts">
import { IosAirplane } from "@vicons/ionicons4";
</script>
