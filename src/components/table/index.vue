<template>
    <div class="table">
        <TableHeader ref="tableheader" :columns="columns" />
        <TableBody :default-height="defaultHeight" v-if="sortedData.length">
            <TableRow v-for="(item, index) in sortedData" :key="index" class="table_body__row">
                <TableCell v-for="(ele, idx) in Object.keys($slots)" class="table_body__item">
                    <slot :record="item" :name="ele" :key="idx">
                    </slot>
                </TableCell>
            </TableRow>
        </TableBody>
        <EmptyBox v-else />
    </div>
    <Pagination ref="pagination" v-if="sortedData.length" :total="data.length" :enable="pageAble"
        :page-size="pageSize" />
</template>

<script lang="ts">
import { computed, ref, defineComponent, watch, toRefs } from 'vue';
import Pagination from '@components/pagination/index.vue';
import TableHeader from '@components/table/table_header.vue';
import TableBody from '@components/table/table_body.vue';
import TableRow from '@components/table/table_row.vue';
import TableCell from '@components/table/table_cell.vue';
import type { PagiNation, StepItem } from '../pagination/types';
import { tableProps, DIRECTION, type MyTableHeader, type colunmItemConfig } from './types';
import EmptyBox from './empty_box.vue';
import { useTable } from './useTable';
export default defineComponent({
    name: 'MyTable',
    props: tableProps,
    components: {
        TableHeader,
        Pagination,
        TableBody,
        TableRow,
        TableCell,
        EmptyBox
    },
    setup(props) {
        const { data, pageAble } = toRefs(props);
        const { sortByKey } = useTable();

        const tableheader = ref<MyTableHeader | null>(null);
        const pagination = ref<PagiNation | null>(null);
        const pageSize = 20

        const stepRange = computed<StepItem>(() => pagination.value?.stepRange ?? { start: 0, end: pageSize });
        const columnList = computed<colunmItemConfig[]>(() => tableheader.value?.columnList ?? []);

        // 根据分页器的步长过滤表格数据
        const filterByStepData = computed(() => {
            const { start, end } = stepRange.value;
            // 未开启分页则返回原始数据
            return pageAble.value ? data.value.slice(start, end) : data.value
        })

        const sortedData = computed(() => {
            let filterData = filterByStepData.value;
            // 遍历colunmList，排序
            columnList.value.length && columnList.value.find(item => {
                item.sort && item.direction && (filterData = sortByKey(filterData, item.key, item.direction))
            })
            return filterData
        })

        // 原始数据变化，重置回第一页
        watch(data, () => {
            pagination.value?.resetIndex()
        })

        return {
            pagination,
            DIRECTION,
            sortedData,
            filterByStepData,
            tableheader,
            columnList,
            pageSize
        }
    }
})

</script>