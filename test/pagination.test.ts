import { shallowMount } from "@vue/test-utils";
import { describe, expect, test } from "vitest";
import Pagination from "../src/components/pagination/index.vue";
import { usePagination } from '../src/components/pagination/usePagination';

describe("mount table", () => {
    const wrapper = shallowMount(Pagination, {
        props: {
            total: 5,
            pageSize: 10,
        },
    });
    // 不配置pageAble默认为true
    test('pagable', () => {
        expect(wrapper.props().enable).toBe(true)
    });

    test('total', () => {
        expect(wrapper.props().total).toBe(5)
    })
});
