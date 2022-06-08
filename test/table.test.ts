import { shallowMount } from "@vue/test-utils";
import { nextTick } from "vue";
import { describe, expect, it, test } from "vitest";
import { ref } from 'vue';
import MyTable from "../src/components/table/index.vue";

function getWrapper(options: Record<string, any>) {
    return shallowMount(MyTable, options);
}

describe("mount table", () => {
    const wrapper = shallowMount(MyTable, {
        props: {
            data: ref([
                { 'a': 1 },
                { 'a': 2 }
            ]),
            columns: [
                {
                    title: 'a',
                    key: 'a'
                }
            ],
            defaultHeight: 500
        },
    });
    test('data length', () => {
        expect(wrapper.props().data.value.length).toBe(2)
    });

    test('set height', () => {
        let tableBody = wrapper.find('.table_body__contaniner');
        expect(tableBody).toBeTruthy();
        expect(tableBody.element.getBoundingClientRect().height).toBe(502)
    });

    // 不配置pageAble默认为true
    test('pagable', () => {
        expect(wrapper.props().pageAble).toBe(true)
    });
});


describe('load data', () => {
    let data = ref(Array.from(Array(427)).map(function (v, i) {
        let t = i & 1 ? 2 : 0
        return {
            a: 'a' + (i + t),
            b: 'b' + (i + t),
            c: (i + t),
            d: 'd' + (i + t),
            e: 'e' + (i + t + 9),
            f: 'f' + (i + t),
            g: 'g' + (i + t),
            h: 'g' + (i + t),
            i: 'g' + (i + t),
        };
    }))

    it('normal loadData', async () => {
        const wrapper = getWrapper({
            props: {
                data,
                columns: [
                    {
                        title: '数据1',
                        key: 'a'
                    }, {
                        title: '数据2',
                        key: 'b'
                    }, {
                        title: '数据3',
                        key: 'c'
                    }, {
                        title: '数据4',
                        key: 'd'
                    }, {
                        title: '数据5',
                        key: 'e'
                    }, {
                        title: '数据6',
                        key: 'f'
                    }, {
                        title: '数据7',
                        key: 'g'
                    }, {
                        title: '数据8',
                        key: 'h'
                    }, {
                        title: '数据9',
                        key: 'i'
                    }
                ],
                defaultHeight: 500
            },
            
        });
        await nextTick()

        const el = wrapper.find('input[type="text"].pagination__input')
        expect(el).toBeTruthy();
        const body = wrapper.find('.table_body__contaniner')
        expect(body).toBeTruthy()
        expect(body.element.getBoundingClientRect().height).toBe(0)
        await el.setValue(3);
        await nextTick()
        const pager = wrapper.find('.pagination')[0]
        expect(pager).toBeTruthy();
        expect(pager.text).toContain('当前第3页')
        await wrapper.setProps({
            data: [{}]
        })

    })
})
