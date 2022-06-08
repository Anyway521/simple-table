import { Ref, computed, toRefs, ComputedRef } from "vue";
import type { StepItem, PageConfig } from "./types";

export interface PagingContext {
    resetIndex: () => void;
    stepRange: ComputedRef<StepItem>,
    setValue: (e: any, start: number, end: number) => void;
}

export function usePagination(
    pageSize: Ref<number>,
    config: PageConfig
): PagingContext {
    const { curIndex, isValid } = toRefs(config);
    // 重置页码
    const resetIndex = () => curIndex.value = 1;

    // 返回当前start,end
    const stepRange = computed(() => {
        if(pageSize.value <= 0) {
            window.console.error('pageSize非法');
            return;
        }
        let start = (curIndex.value - 1) * pageSize.value
        return {
            start,
            end: start + pageSize.value
        }
    });

    // 判断输入内容是否非法
    const judgeInputValid = (input: string, start: number, end: number, valid: Ref<boolean>) => {
        let reg = /^[1-9]\d*$/;
        let num = Number(input)
        if (reg.test(input)) {
            if (num < start) {
                valid.value = false
                return `该输入项的最小值是${start}`
            } else if (num > end) {
                valid.value = false
                return `该输入项的最大值是${end}`
            } else {
                valid.value = true
                return input
            }
        } else {
            valid.value = false
            return '该输入项不是一个有效的数字'
        }

    }

    // 输入框input事件
    const setValue = (e: Event, start: number, end: number) => {
        curIndex.value = e.target.value;
        e.target.title = judgeInputValid(e.target.value, start, end, isValid)
    }

    return {
        resetIndex,
        stepRange,
        setValue
    }
}