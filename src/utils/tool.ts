// import { ref } from 'vue';
export function generateData(num: number, bit: number) {
    return Array.from(Array(num)).map(function (v, i) {
        let t = i & 1 ? 2 : 0;
        return Array.from(Array(bit).fill({})).reduce((pre, cur, index) => {
            let z = String.fromCharCode('a'.charCodeAt(0) + index);
            let num = index === 0 ? 0 : z;
            cur[z] = num + (i + t);
            return cur
        }, {})
    })
}

export function generateColumns(bit: number, sort = true) {
    return Array.from(Array(bit)).map((item, index) => {
        let key = String.fromCharCode('a'.charCodeAt(0) + index);
        let title = `数据${key}`
        return {
            title,
            key,
            sort
        }
    })
}

export function generateSlots(bit: number) {
    return Array.from(Array(bit).fill({})).reduce((pre, cur, index) => {
        let el = String.fromCharCode('a'.charCodeAt(0) + index);
        cur[el] = `<template #${el}="{record}">{{ record.${el} }}</template>`
        return cur
    }, {})
}