<preview>基础</preview>
<template>
    <div style="margin: 10px 0px; width: 100%">
        <RButton theme="default">默认按钮</RButton>
        <RButton theme="primary">主要按钮</RButton>
        <RButton theme="info">信息按钮</RButton>
        <r-button theme="success">成功按钮</r-button>
        <r-button theme="warning">警告按钮</r-button>
        <r-button theme="error">危险按钮</r-button>
    </div>

    <div style="margin: 10px 0px; width: 100%">
        <r-button theme="default" dashed>默认按钮</r-button>
        <r-button theme="primary" dashed>主要按钮</r-button>
        <r-button theme="info" dashed>信息按钮</r-button>
        <r-button theme="success" dashed>成功按钮</r-button>
        <r-button theme="warning" dashed>警告按钮</r-button>
        <r-button theme="error" dashed>危险按钮</r-button>
    </div>

    <div style="margin: 10px 0px; width: 100%">
        <r-button theme="default" round>默认按钮</r-button>
        <r-button theme="primary" round>主要按钮</r-button>
        <r-button theme="info" round>信息按钮</r-button>
        <r-button theme="success" round>成功按钮</r-button>
        <r-button theme="warning" round>警告按钮</r-button>
        <r-button theme="error" round>危险按钮</r-button>
    </div>

    <div style="margin: 10px 0px; width: 100%">
        <r-button theme="default" circle>
            <r-icon size="16">
                <Add16Regular />
            </r-icon>
        </r-button>
        <r-button theme="primary" circle>
            <r-icon size="16">
                <Add16Regular />
            </r-icon>
        </r-button>
        <r-button theme="info" circle>
            <r-icon size="16">
                <Add16Regular />
            </r-icon>
        </r-button>
        <r-button theme="success" circle>
            <r-icon size="16">
                <Add16Regular />
            </r-icon>
        </r-button>
        <r-button theme="warning" circle>
            <r-icon size="16">
                <Add16Regular />
            </r-icon>
        </r-button>
        <r-button theme="error" circle>
            <r-icon size="16">
                <Add16Regular />
            </r-icon>
        </r-button>
    </div>
</template>

<script setup lang="ts">
import { Add16Regular } from "@vicons/fluent";
</script>
