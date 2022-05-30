import { PropType, ExtractPropTypes, Ref } from "vue";
import Pagination from './index.vue';

export type PagiNation = typeof Pagination;
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

export type PageProps = ExtractPropTypes<typeof pageProps>;