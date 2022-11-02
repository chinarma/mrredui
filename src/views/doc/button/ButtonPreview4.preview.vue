<preview>图标</preview>
<template>
    <r-button theme="primary" icon-placement="right">
        <template #icon>
            <r-icon size="20">
                <VehicleBicycle24Filled />
            </r-icon>
        </template>
        默认按钮
    </r-button>
    <r-button theme="primary">
        <template #icon>
            <r-icon size="20">
                <VehicleBicycle24Filled />
            </r-icon>
        </template>
        默认按钮
    </r-button>
</template>
<script setup lanng="scss">
import { VehicleBicycle24Filled } from "@vicons/fluent";
</script>
