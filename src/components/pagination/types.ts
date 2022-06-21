import { PropType, Ref } from 'vue';
export interface StepItem {
    start: number,
    end: number
}

export const pageProps = {
    enable: {
        type: Boolean as PropType<boolean>,
        default: true
    },
    total: {
        type: Number as PropType<number>,
        default: 0
    },
    pageSize: {
        type: Number as PropType<number>,
        default: 10
    }
}

export interface PageConfig {
    curIndex: Ref<number>,
    isValid: Ref<boolean>
}
