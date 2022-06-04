import { DIRECTION } from "./types";

export interface TableContext {
    sortByKey: <T extends Record<string, unknown> = Record<string, unknown>>(data: T[], key: string, type: DIRECTION) => T[]
}

export function useTable(): TableContext {

    // 根据columns里的key，对表格数据进行排序
    const sortByKey = <T extends Record<string, unknown> = Record < string, unknown>> (data: T[], key: string, type: DIRECTION) => {
        if (type === DIRECTION.none) {
            return data;
        }
        if (type === DIRECTION.asc) {
            return data.slice().sort((a: { [x: string]: any }, b: { [x: string]: any }) => {
                // sort内的排序函数：字符串不能直接运算
                return a[key] === b[key] ? 0 : (a[key] > b[key] ? 1 : -1)
            })
        } else {
            return data.slice().sort((a: { [x: string]: any }, b: { [x: string]: any }) => {
                return a[key] === b[key] ? 0 : (a[key] > b[key] ? -1 : 1)
            })
        }
    }

    return {
        sortByKey
    }
}