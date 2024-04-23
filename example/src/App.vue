<script setup lang="ts">
import VsCodeSlider from '../../packages';
import {ref} from 'vue';

const arr = ref([
    'vue/node_modules/add/c.js',
    'vue/node_modules/b.js',
    'vue/node_modules/add/a.js',
    'vue/class/add/dd.js',
    'vue/test/product/project/22/ass/vsCodeSlider.json',
    'vue/module/add/b.ts',
    'vue/test/add/dd.jsx',
    'vue/package/add/c.c',
    'vue/package/b.cpp',
    'vue/package/add/a.cs',
    'vue/package/add/dd.scss',
    'vue/package/product/project/22/ass/vsCodeSlider.less',
    'vue/package/add/b.dd',
    'vue/package/add/dd.txt',
    'vue/d.js',
    'vue/test2/',
    'vue/README.md',
    'vue/12.vue',
    'vue/CHANGELOG',
    'vue/CHANGELOG.ms',
    'vue/test.txt'
]);

function fileClick(obj, node, TreeNode, event) {
    console.log(obj)
}

</script>

<template>
    <el-container class="container">
        <el-header>demo</el-header>
        <el-container class="content-main">
            <el-main>
                <VsCodeSlider
                    theme="light"
                    :files="arr"
                    @fileClick="fileClick"
                />
            </el-main>
        </el-container>
    </el-container>
</template>

<style scoped>
.el-header {
    height: 50px;
    display: flex;
    align-items: center;
}

.el-main {
    padding: 0;
}

.container {
    height: 100%;
}

.content-main {
    height: calc(100% - 50px);
}

</style>
