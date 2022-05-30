<template>
    <div :style="tableStyle" class="table_body__contaniner">
        <table class="table_body" border="1" cellspacing="0" cellpadding="0">
            <slot></slot>
        </table>
        <div v-if="!dataLength">
            <h2>数据为空</h2>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, toRefs } from 'vue';
import { tableBodyProps } from "./types";
export default defineComponent({
    name: 'TableBody',
    props: tableBodyProps,
    setup(props) {
        const { dataLength, defaultHeight } = toRefs(props);
        const tableStyle = computed(() => ({ height: `${defaultHeight.value}px` }));
        return {
            tableStyle,
            dataLength
        }
    }
})

</script>
<style lang="less" scoped>
.table_body {
    width: 100%;

    &__contaniner {
        overflow-y: scroll;
        border: 1px solid;
    }
}

</style>