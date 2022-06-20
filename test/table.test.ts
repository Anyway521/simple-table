import { mount } from "@vue/test-utils";
import { nextTick } from "vue";
import { describe, expect, it } from "vitest";
import MyTable from "../src/components/table/index.vue";
import TableBody from "../src/components/table/table_body.vue";
import TableRow from "../src/components/table/table_row.vue";
import TableCell from "../src/components/table/table_cell.vue";
import TableHeader from "../src/components/table/table_header.vue";
import EmptyBox from "../src/components/table/empty_box.vue";
import Pagination from "../src/components/pagination/index.vue";
import { useTable } from "../src/components/table/useTable";
import { useTableHeader } from "../src/components/table/useTableHeader";
import { generateData, generateColumns, generateSlots } from '../src/utils/test';
import _ from 'lodash';
import { DIRECTION, colunmItemConfig } from "../src/components/table/types";


function getWrapper(options: Record<string, any>) {
    // shallowMount会把组件隔离，这里用mount
    return mount(MyTable, options);
}

/**
 * 生成V(行) H(列)数据
*/
function generateDataTable(V: number, H: number) {
    return {
        data: generateData(V, H),
        columns: generateColumns(H),
        slots: generateSlots(H)
    }
}

describe("mount table", () => {

    it('data length', async () => {
        const wrapper1 = getWrapper({
            props: {
                data: [],
                columns: []
            }
        })
        const {
            data,
            columns,
            slots
        } = generateDataTable(9, 3);
        // 空状态
        expect(wrapper1.findComponent(EmptyBox).exists()).toBe(true);
        expect(wrapper1.findComponent(Pagination).exists()).toBe(false);
        expect(wrapper1.findComponent(TableBody).exists()).toBe(false);
        expect(wrapper1.findAllComponents(TableRow)).toHaveLength(0);
        expect(wrapper1.findAllComponents(TableCell)).toHaveLength(0)

        const wrapper2 = getWrapper({
            props: {
                data,
                columns
            },
            slots,
            // stubs: {
            //     'table-body': TableBody,
            //     'table-header': TableHeader,
            //     'table-row': TableRow,
            //     'table-cell': TableCell,
            //     'empty-box': EmptyBox
            // }
        })
        expect(wrapper2.findComponent(EmptyBox).exists()).toBe(false);
        expect(wrapper2.findComponent(TableHeader).exists()).toBe(true);
        expect(wrapper2.findComponent(Pagination).exists()).toBe(true);
        expect(wrapper2.findComponent(TableBody).exists()).toBe(true);
        expect(wrapper2.findAllComponents(TableRow)).toHaveLength(9);
        expect(wrapper2.findAllComponents(TableCell)).toHaveLength(27)
    });

    it('set height', async () => {
        const {
            data,
            columns,
            slots
        } = generateDataTable(9, 3);
        const wrapper = getWrapper({
            props: {
                data,
                columns
            },
            slots,
        })
        expect(wrapper
            .find('.table_body__contaniner')
            .attributes('style'))
            .toContain('200px');
        wrapper.setProps({
            defaultHeight: 500
        });
        await nextTick();
        expect(wrapper
            .find('.table_body__contaniner')
            .attributes('style'))
            .toContain('500px');
    });
    it('pageNation', async () => {
        const {
            data,
            columns,
            slots
        } = generateDataTable(50, 9);
        const wrapper = getWrapper({
            props: {
                data,
                columns
            },
            slots,
        })
        const input = wrapper.find('input[type="text"].pagination__input')
        expect(input.exists()).toBe(true);
        input.setValue(3);

        await nextTick();
        const pageNation = wrapper.findComponent(Pagination)
        expect(pageNation.exists()).toBe(true);
        expect(pageNation.vm.curIndex).toBe('3');
    });
    it('sort-func', async () => {
        const {
            data,
            columns,
            slots
        } = generateDataTable(50, 5);
        const wrapper = getWrapper({
            props: {
                data,
                columns
            },
            slots,
        });

        // 第一列的headerItem
        const firstHeaderItem = wrapper.find('.table_header__item');
        expect(firstHeaderItem.exists()).toBe(true);
        expect(firstHeaderItem.attributes('title')).toBe('数据a');

        const returnRowText = () => {
            let tableBoryRows = wrapper.findAllComponents(TableRow);
            let rowText = '';
            tableBoryRows.forEach(row => {
                rowText += row.findAll('td')[0].element.textContent + ','
            });
            return rowText
        }
        let rowText = returnRowText()
        // let tableBoryRows = wrapper.findAllComponents(TableRow);
        // let rowText = '';
        // tableBoryRows.forEach(row => {
        //     rowText += row.findAll('td')[0].element.textContent + ','
        // })
        // 第一列默认的顺序
        expect(rowText).toBe('0,3,2,5,4,7,6,9,8,11,10,13,12,15,14,17,16,19,18,21,');

        // 点击排序 - 升序
        await firstHeaderItem.trigger('click');

        // tableBoryRows = wrapper.findAllComponents(TableRow);
        // rowText = '';
        // tableBoryRows.forEach(row => {
        //     rowText += row.findAll('td')[0].element.textContent + ','
        // })
        rowText = returnRowText()
        // 升序结果
        expect(rowText).toBe('0,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,21,');

        // 点击排序 - 降序
        await firstHeaderItem.trigger('click');
        rowText = returnRowText()
        // tableBoryRows = wrapper.findAllComponents(TableRow);
        // rowText = '';
        // tableBoryRows.forEach(row => {
        //     rowText += row.findAll('td')[0].element.textContent + ','
        // })
        // 降序结果
        expect(rowText).toBe('21,19,18,17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,0,');

        // 点击排序 - 恢复原序
        await firstHeaderItem.trigger('click');
        rowText = returnRowText()
        // tableBoryRows = wrapper.findAllComponents(TableRow);
        // rowText = '';
        // tableBoryRows.forEach(row => {
        //     rowText += row.findAll('td')[0].element.textContent + ','
        // })
        // 原序结果
        expect(rowText).toBe('0,3,2,5,4,7,6,9,8,11,10,13,12,15,14,17,16,19,18,21,');

    });

    it('table-hook', () => {
        const { sortByKey } = useTable();
        expect(_.isFunction(sortByKey)).toBe(true);
        const data = generateData(10, 3);
        let text = '';
        data.forEach(item => {
            text += item.a + ','
        })
        expect(text).toBe('0,3,2,5,4,7,6,9,8,11,')
        let res = sortByKey(data, 'a', DIRECTION.none);
        text = '';
        res.forEach(item => {
            text += item.a + ','
        })
        expect(text).toBe('0,3,2,5,4,7,6,9,8,11,');

        res = sortByKey(data, 'a', DIRECTION.asc);
        text = '';
        res.forEach(item => {
            text += item.a + ','
        })
        expect(text).toBe('0,2,3,4,5,6,7,8,9,11,');

        res = sortByKey(data, 'a', DIRECTION.desc);
        text = '';
        res.forEach(item => {
            text += item.a + ','
        })
        expect(text).toBe('11,9,8,7,6,5,4,3,2,0,')
    });

    it('table-header-hook', () => {
        const { onSort } = useTableHeader();
        expect(_.isFunction(onSort)).toBe(true);
        let columns = generateColumns(5) as colunmItemConfig[];
        columns.forEach(item => item.direction = DIRECTION.none)

        // 不开启排序，不改变columns
        onSort(columns, 'a', false, DIRECTION.none);
        expect(columns[0].direction).toBe(DIRECTION.none);

        onSort(columns, 'a', false, DIRECTION.desc);
        expect(columns[0].direction).toBe(DIRECTION.none);

        onSort(columns, 'a', false, DIRECTION.asc);
        expect(columns[0].direction).toBe(DIRECTION.none);

        // 开启排序：none -> asc
        onSort(columns, 'a', true, DIRECTION.none);
        expect(columns[0].direction).toBe(DIRECTION.asc);
        // asc -> desc
        onSort(columns, 'a', true, DIRECTION.asc);
        expect(columns[0].direction).toBe(DIRECTION.desc);
        // desc -> none
        onSort(columns, 'a', true, DIRECTION.desc);
        expect(columns[0].direction).toBe(DIRECTION.none);
    })
});


