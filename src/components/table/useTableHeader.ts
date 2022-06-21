import { type colunmItemConfig, DIRECTION } from './types'

export interface HeaderContext {
    onSort: (columns: colunmItemConfig[], key: string, direction: DIRECTION, sortAble?: boolean ) => void;
}

export function useTableHeader(): HeaderContext {

    // 点击切换排序规则
    const onSort = (columns: colunmItemConfig[], key: string, direction: DIRECTION, sortAble?: boolean ) => {
        if (!sortAble) {
            return;
        }
        direction = direction ? (direction === DIRECTION.asc ? DIRECTION.desc : DIRECTION.none) : DIRECTION.asc
        columns.forEach(ele => { ele.direction = ele.key === key ? direction : DIRECTION.none });
    }

    return {
        onSort
    }
}