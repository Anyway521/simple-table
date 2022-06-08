import { shallowMount } from "@vue/test-utils";
import { describe, expect, test } from "vitest";
import { nextTick } from "vue";
import Pagination from "../src/components/pagination/index.vue";

describe("mount table", () => {
    const wrapper = shallowMount(Pagination, {
        props: {
            total: 10,
            pageSize: 10,
        },
    });
    // 不配置pageAble默认为true
    test('pagable', () => {
        expect(wrapper.props().enable).toBe(true)
    });

    test('click', async () => {
        wrapper.setProps({
            total: 20,
            pageSize: 10,
        })
        await nextTick();
        let preBtn = wrapper.findAll('.pagination__btn')[0];
        let nextBtn =  wrapper.findAll('.pagination__btn')[1];
        expect(preBtn).toBeTruthy();
        expect(nextBtn).toBeTruthy();
        // 初始化上一页不可点击
        expect(preBtn.classes().includes('pagination__btn--active')).toBe(false)
        // 下一页可点击
        expect(nextBtn.classes().includes('pagination__btn--active')).toBe(true)
        nextBtn.trigger('click');
        await nextTick();
        // 到尾页，下一页置灰，上一页active
        expect(nextBtn.classes().includes('pagination__btn--active')).toBe(false);
        expect(preBtn.classes().includes('pagination__btn--active')).toBe(true)
    })

    test('input', async () => {
        let input = wrapper.find('.pagination__input');
        expect(input).toBeTruthy();
        await input.setValue(1);
        await nextTick();
        expect(wrapper.vm.curIndex).toEqual('1');
        let curIndex = wrapper.find('.pagination__curr');
        expect(curIndex).toBeTruthy();
        expect(curIndex.text()).toEqual('当前第1页')
    })


});
