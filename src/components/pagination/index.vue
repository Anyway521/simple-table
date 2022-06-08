<template>
    <div class="pagination" v-if="enable">
        共{{ total }}条记录
        每页{{ pageSize }}条
        共{{ endPage }}页
        <span class="pagination__curr">当前第{{ curIndex }}页</span>
        <span @click="prevPage" class="pagination__btn" :class="{ 'pagination__btn--active': !isFirstOrInvalid }">
            上一页
        </span>
        <span @click="nextPage" class="pagination__btn" :class="{ 'pagination__btn--active': !isLastOrInvalid }">
            下一页
        </span>
        前往第
        <input type="text" class="pagination__input" :class="{ 'pagination__input--error' : !isValid }"
            v-model="curIndex" @input="setVal($event, 1, endPage)" /> 页
    </div>
</template>
    
<script lang='ts'>
import { computed, defineComponent, ref, toRefs } from 'vue';
import { pageProps } from './types';
import { usePagination } from './usePagination';
import _ from 'lodash';

export default defineComponent({
    name: 'Pagination',
    props: pageProps,
    setup(props) {

        const curIndex = ref(1)
        const isValid = ref(true);
        const { pageSize, total } = toRefs(props);

        const {
            stepRange,
            resetIndex,
            setValue
        } = usePagination(pageSize, { curIndex, isValid });

        // 首页或非法输入
        const isFirstOrInvalid = computed(() => {
            if (!isValid.value) {
                window.console.error('输入非法')
            }
            if (curIndex.value == 1) {
                window.console.warn('已经是首页了')
            }
            return !isValid.value || curIndex.value == 1
        })
        // 尾页或非法输入
        const isLastOrInvalid = computed(() => {
            if (!isValid.value) {
                window.console.error('输入非法')
            }
            if (curIndex.value == endPage.value) {
                window.console.warn('已经是尾页了')
            }
            return !isValid.value || curIndex.value == endPage.value
        })
        // 尾页
        const endPage = computed(() => Math.ceil(total.value / pageSize.value))
        // 上一页
        const prevPage = () => !isFirstOrInvalid.value && curIndex.value--;
        // 下一页
        const nextPage = () => !isLastOrInvalid.value && curIndex.value++;

        const setVal = _.debounce((event: Event, start: number, end: number) => {
            return setValue(event, start, end)
        })

        return {
            prevPage,
            nextPage,
            isFirstOrInvalid,
            isLastOrInvalid,
            curIndex,
            isValid,
            setVal,
            stepRange,
            endPage,
            resetIndex
        }
    }
})

</script>
    
<style lang="less">
.pagination {
    text-align: end;

    &__input {
        width: 20px;
        text-align: center;
        margin: 0 5px;

        &--error:focus-visible {
            outline: none;
            border: 2px solid red;
            color: red;
        }
    }

    &__btn {
        color: gray;

        &--active {
            cursor: pointer;
            color: black;
        }
    }
}
</style>