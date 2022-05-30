<template>
    <div class="demo">
        <h1>基础场景，加载数据,开启分页，不开启排序</h1>
        <MyTable :data="data" :columns="columns">
            <template #a="{ record }">
                <div style="background-color: red;">
                    {{ record.a }}
                </div>
            </template>
            <template #b="{ record }">
                {{ record.b }}
            </template>
            <template #c="{ record }">
                {{ record.c }}
            </template>
            <template #d="{ record }">
                {{ record.d }}
            </template>
            <template #e="{ record }">
                {{ record.e }}
            </template>
            <template #f="{ record }">
                {{ record.f }}
            </template>
            <template #g="{ record }">
                {{ record.g }}
            </template>
            <template #h="{ record }">
                {{ record.h }}
            </template>
            <template #i="{ record }">
                {{ record.i }}
            </template>
        </MyTable>
        <button @click="changeData">点我加载新数据</button>
        <h1>不配置分页，默认数据全部展示。 </h1>
        <MyTable :data="data" :columns="columns2" :page-able="false">
            <template #a="{ record }">
                {{ record.a }}
            </template>
            <template #b="{ record }">
                {{ record.b }}
            </template>
            <template #c="{ record }">
                {{ record.c }}
            </template>
            <template #d="{ record }">
                {{ record.d }}
            </template>
            <template #e="{ record }">
                {{ record.e }}
            </template>
            <template #f="{ record }">
                {{ record.f }}
            </template>
            <template #g="{ record }">
                {{ record.g }}
            </template>
            <template #h="{ record }">
                {{ record.h }}
            </template>
            <template #i="{ record }">
                {{ record.i }}
            </template>
        </MyTable>
        <h1>不配分页，配置表格高度 </h1>
        <MyTable :data="data" :columns="columns" :page-able="false" :default-height="500">
            <template #a="{ record }">
                {{ record.a }}
            </template>
            <template #b="{ record }">
                {{ record.b }}
            </template>
            <template #c="{ record }">
                {{ record.c }}
            </template>
            <template #d="{ record }">
                {{ record.d }}
            </template>
            <template #e="{ record }">
                {{ record.e }}
            </template>
            <template #f="{ record }">
                {{ record.f }}
            </template>
            <template #g="{ record }">
                {{ record.g }}
            </template>
            <template #h="{ record }">
                {{ record.h }}
            </template>
            <template #i="{ record }">
                {{ record.i }}
            </template>
        </MyTable>
        <button @click="changeData">点我加载新数据</button>
        <h1>开启排序(支持部分开启)。 在colums的元素中声明sort:true</h1>
        <MyTable :data="data" :columns="columns2">
            <template #a="{ record }">
                {{ record.a }}
            </template>
            <template #b="{ record }">
                {{ record.b }}
            </template>
            <template #c="{ record }">
                {{ record.c }}
            </template>
            <template #d="{ record }">
                {{ record.d }}
            </template>
            <template #e="{ record }">
                {{ record.e }}
            </template>
            <template #f="{ record }">
                {{ record.f }}
            </template>
            <template #g="{ record }">
                {{ record.g }}
            </template>
            <template #h="{ record }">
                {{ record.h }}
            </template>
            <template #i="{ record }">
                {{ record.i }}
            </template>
        </MyTable>
        <button @click="changeData">点我加载新数据</button>
    </div>
</template>

<script setup lang="ts">
import MyTable from '@components/table/index.vue'
import { ref } from "vue";
/**
* @file
*/
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

const columns = [
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
]

const columns2 = [
    {
        title: '数据1',
        key: 'a',
        sort: true
    }, {
        title: '数据2',
        key: 'b',
        sort: true
    }, {
        title: '数据3',
        key: 'c',
        sort: true
    }, {
        title: '数据4',
        key: 'd',
        sort: true
    }, {
        title: '数据5',
        key: 'e',
        sort: false
    }, {
        title: '数据6',
        key: 'f',
        sort: false
    }, {
        title: '数据7',
        key: 'g',
        sort: false
    }, {
        title: '数据8',
        key: 'h',
        sort: false
    }, {
        title: '数据9',
        key: 'i',
        sort: false
    }
]

const changeData = () => {
    let num = Math.floor(Math.random() * 100 + 5)
    setTimeout(() => {
        data.value = Array.from(Array(num)).map(function (v, i) {
            let t = i & 1 ? Math.ceil(num / 10) + 1 : Math.ceil(num / 10) - 1
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
        })
    }, 1000)
}
</script>
<style lang="less" scoped>
.demo {
    text-align: center;
}
</style>