import { shallowMount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { ref, nextTick } from 'vue';
import _ from 'lodash';
import Pagination from '../src/components/pagination/index.vue';
import { usePagination } from '../src/components/pagination/usePagination';

describe('mount table', () => {
    const wrapper = shallowMount(Pagination, {
        props: {
            total: 10,
            pageSize: 10,
        },
    });

    // 不配置pageAble默认为true
    it('pagable', () => {
        expect(wrapper.props().enable).toBe(true);
    });

    it('click', async () => {

        wrapper.setProps({
            total: 20,
            pageSize: 10,
        })
        await nextTick();
        let preBtn = wrapper.findAll('.pagination__btn')[0];
        let nextBtn = wrapper.findAll('.pagination__btn')[1];
        expect(preBtn.exists()).toBe(true);
        expect(nextBtn.exists()).toBe(true);
        // 初始化上一页不可点击
        expect(preBtn.classes().includes('pagination__btn--active')).toBe(false);
        // 下一页可点击
        expect(nextBtn.classes().includes('pagination__btn--active')).toBe(true);
        nextBtn.trigger('click');
        await nextTick();
        // 到尾页，下一页置灰，上一页active
        expect(nextBtn.classes().includes('pagination__btn--active')).toBe(false);
        expect(preBtn.classes().includes('pagination__btn--active')).toBe(true);
    })

    it('input', async () => {
        const input = wrapper.find('input[type="text"]');
        expect(input.exists()).toBe(true);
        await input.setValue(1);
        await nextTick();
        // 输入框的值变成1
        expect(wrapper.find('input[type="text"]').element.value).toBe('1');
        // 输入合法
        expect(wrapper.vm.isValid).toEqual(true);
        // curIndex更新
        expect(wrapper.vm.curIndex).toEqual('1');
        let curIndex = wrapper.find('.pagination__curr');
        expect(curIndex.exists()).toBe(true);
        expect(curIndex.text()).toEqual('当前第1页');

        await input.setValue(8);
        await nextTick()
        expect(wrapper.find('input[type="text"]').element.value).toBe('8');
        // curIndex更新
        expect(wrapper.vm.curIndex).toEqual('8');
    })

    it('hooks', () => {
        const pageSize = ref(10);
        const curIndex = ref(1);
        const isValidDefault = ref(true);
        const {
            resetIndex,
            stepRange,
            setValue,
            isValid
        } = usePagination(pageSize, { curIndex, isValid: isValidDefault });

        // curIndex
        expect(_.isFunction(resetIndex)).toBe(true);
        expect(curIndex.value).toBe(1);
        curIndex.value++;
        expect(curIndex.value).toBe(2);
        resetIndex();
        expect(curIndex.value).toBe(1);


        // stepRange
        expect(stepRange.value.start).toBe(0);
        expect(stepRange.value.end).toBe(10);
        expect(curIndex.value).toBe(1);
        curIndex.value++;
        expect(curIndex.value).toBe(2);
        expect(stepRange.value.start).toBe(10);
        expect(stepRange.value.end).toBe(20);

        // setValue
        expect(_.isFunction(setValue)).toBe(true);

        // 合法输入
        let [start, end] = [1, 42];
        let ev = {
            target: {
                value: 3
            }
        };

        setValue(ev, start, end);
        expect(isValid.value).toBe(true);
        expect(curIndex.value).toBe(3);
        expect(stepRange.value.start).toBe(20);
        expect(stepRange.value.end).toBe(30);

        // 非法汉字输入
        ev = {
            target: {
                value: 'hahah'
            }
        };

        setValue(ev, start, end);
        expect(ev.target.title).toBe('该输入项不是一个有效的数字');
        expect(isValid.value).toBe(false);
    })

});
