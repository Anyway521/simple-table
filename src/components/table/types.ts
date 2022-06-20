import { PropType, ExtractPropTypes } from 'vue'

export enum DIRECTION {
    desc = 'DESC',
    asc = 'ASC',
    none = ''
}

export const tableProps = {
    data: {
        type: Array as PropType<Record<string, unknown>[]>,
        default: () => [],
    },
    columns: {
        type: Array as PropType<colunmItemConfig[]>,
        default: () => []
    },
    defaultHeight: {
        type: Number as PropType<number>,
        default: 200
    },
    pageAble: {
        type: Boolean as PropType<boolean>,
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