import Table from "./table.vue";
import TableHeader from './table_header.vue';
import TableBody from './table_body.vue';
import { PropType, ExtractPropTypes } from 'vue'

export type MyTable = typeof Table;
export type MyTableHeader = typeof TableHeader;
export type MyTableBody = typeof TableBody

export enum DIRECTION {
    desc = 'DESC',
    asc = 'ASC',
    none = ''
}

export const tableProps = {
    data: {
        type: Array as PropType<any[]>,
        default: () => [],
    },
    columns: {
        type: Array as PropType<colunmItemConfig[]>,
        default: () => []
    },
    defaultHeight: {
        type: Number as PropType<number>,
        require: false,
        default: 200
    },
    pageAble: {
        type: Boolean as PropType<boolean>,
        require: false,
        default: true
    },
}

export const tableHeaderProps = {
    columns: {
        type: Array as PropType<colunmItemConfig[]>,
        default: () => []
    }
}

export const tableBodyProps = {
    dataLength: {
        type: Number as PropType<number>,
        default: 0,
    },
    defaultHeight: {
        type: Number as PropType<number>,
        require: false,
        default: 200
    },
}

export interface colunmItemConfig {
    title: string;
    key: string;
    // 是否开启排序
    sort?: boolean;
    // 排序类型 '' | 'DESC' | 'ASC'
    direction: DIRECTION;
}

export type TableProps = ExtractPropTypes<typeof tableProps>
export type TableHeaderProps = ExtractPropTypes<typeof tableHeaderProps>
export type TableBodyProps = ExtractPropTypes<typeof tableBodyProps>