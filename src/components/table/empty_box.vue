<template>
    <div class="empty_box">
        <h2>数据为空</h2>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'EmptyBox',
})

</script>
<style lang="less" scoped>
.empty_box {
    height: 100%;
}

</style>