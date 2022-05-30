<template>
    <td class="table_body__item">
        <slot></slot>
    </td>
</template>
    
<script setup lang='ts'>
import { defineComponent } from 'vue';
defineComponent({
    name: 'TableCell',
})

</script>
    
<style lang="less" scoped>
.table_body__item {
    min-width: 80px;
}
</style>