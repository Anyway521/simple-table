<template>
    <tr class="table_body__row">
        <slot></slot>
    </tr>
</template>
    
<script setup lang='ts'>
import { defineComponent } from 'vue';
defineComponent({
    name: 'TableRow'
})

</script>
    
<style lang="less" scoped>
.table_body__row {
    &:first-of-type {
        border-top: none;
    }

    &:nth-of-type(2n) {
        background-color: #d9ecff;
    }

    &:last-of-type {
        border-bottom: none;
    }
}
</style>