export function sortByKey(data: any[], key: string, type: number) {
    // 奇数升序，偶数降序
    if (type & 1) {
        return data.sort((a: { [x: string]: any }, b: { [x: string]: any }) => {
            // sort内的排序函数：字符串不能直接运算
            return a[key] === b[key] ? 0 : (a[key] > b[key] ? 1 : -1)
        })
    } else {
        return data.sort((a: { [x: string]: any }, b: { [x: string]: any }) => {
            return a[key] === b[key] ? 0 : (a[key] > b[key] ? -1 : 1)
        })
    }
}
