<template>
    <table class="table_header" border="1" cellspacing="0" cellpadding="0">
        <tr class="table_header__row">
            <td v-for="item in columnList" :key="item.key"
                @click="onSort(columnList, item.key, item.sort, item.direction)" class="table_header__item"
                :title="item.title">
                {{ item.title }}
                <span v-if="item.sort" class="table_header__item_up"
                    :class="{ 'table_header__item_up--active': item.direction === DIRECTION.asc }"></span>
                <span v-if="item.sort" class="table_header__item_down"
                    :class="{ 'table_header__item_down--active': item.direction === DIRECTION.desc }"></span>
            </td>
        </tr>
    </table>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, toRefs } from 'vue';
import { tableHeaderProps, DIRECTION, colunmItemConfig } from "./types";
import { useTableHeader } from './useTableHeader';
import _ from 'lodash';
export default defineComponent({
    name: 'TableHeader',
    props: tableHeaderProps,
    setup(props) {
        const { columns } = toRefs(props)
        const { onSort } = useTableHeader();
        const columnList = ref<colunmItemConfig[]>(columns.value.map((v) => {
            v.direction = DIRECTION.none;
            return v;
        }));

        onMounted(() => {
            if(!columns.value.length) {
                window.console.error('colunms为空')
            }
            if (_.uniq(columns.value).length !== columns.value.length) {
                window.console.error('columns中key值有重复')
            }
            if (columns.value.find(item => item.key === undefined)) {
                window.console.error('columns中有值为undefined')
            }
        })

        return {
            onSort,
            columnList,
            DIRECTION
        }
    }
})

</script>
<style lang="less" scoped>
.table {

    &_header {
        width: 100%;

        &__row {
            font-weight: bold;
            background: #d9ecff;
            border-bottom: none;
        }

        &__item {
            position: relative;
            min-width: 80px;

            &_up {
                position: absolute;
                cursor: pointer;
                border: 4px solid transparent;
                border-bottom-color: white;
                top: 1px;
                right: 4px;

                &--active {
                    border-bottom-color: black;
                }
            }

            &_down {
                position: absolute;
                cursor: pointer;
                border: 4px solid transparent;
                bottom: 1px;
                right: 4px;
                border-top-color: white;

                &--active {
                    border-top-color: black;
                }
            }
        }
    }
}
</style>