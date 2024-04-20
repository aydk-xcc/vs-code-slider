<script
    setup
    lang="ts"
>
import {computed, ref} from 'vue';
import {dealFilePath, fileSorts} from './utils/utils';
import Vue from 'vue';
import { ElTree } from 'element-plus';
import {ArrowRightBold} from '@element-plus/icons-vue';

declare interface FileData {
    name: string;
    path: string;
    isDir: boolean;
    children?: Array<FileData>;
};

let props = defineProps<{
    baseDir: string,
    theme: string,
    width: number,
    files: string[],
    defaultOpen: string,
    currentFile: string,
}>();

const elTreeRef = ref(null);

const width = ref(props.width || 280);
const openAllState = ref(false);
const defaultExpandKeys = ref([]);
const defaultProps = {
    children: 'children',
    label: 'name',
}

let fileList = computed((): Array<FileData> => {
    let list = dealFilePath(props.files);
    fileSorts(list);
    console.log(list);
    return list;
})

let baseDirName = computed(() => {
    console.log(fileList);
    if (!props.baseDir && fileList.value.length === 1) {
        return fileList.value[0].name;
    } else if (props.baseDir) {
        return props.baseDir;
    } else {
        return '未命名';
    }
})

function  handleNodeClick() {

}

function getFileIcon(fileName) {
    let arr = fileName.split('.');
    let type = (arr.pop() || '').toLowerCase();
    switch (type) {
        case 'vue':
            return 'iconfont vs-vue icon-g';
        case 'js':
            return 'iconfont vs-js icon-y';
        case 'go':
            return 'iconfont vs-go icon-b';
        case 'ts':
            return 'iconfont vs-ts icon-b';
        case 'tpl':
            return 'iconfont vs-tpl icon-y';
        case 'xml':
            return 'iconfont vs-xml icon-r';
        case 'png':
        case 'jpg':
        case 'jpeg':
        case 'gif':
            return 'iconfont vs-image icon-purple';
        case 'c':
            return 'iconfont vs-c icon-b';
        case 'jsx':
            return 'iconfont vs-react icon-b';
        case 'license':
            return 'iconfont vs-license icon-y';
        case 'setting':
            return 'iconfont vs-setting';
        case 'changelog':
            return 'iconfont vs-log';
        case 'java':
        case 'jar':
            return 'iconfont vs-java icon-b';
        case 'py':
            return 'iconfont vs-python icon-b';
        case 'git':
        case 'gitignore':
            return 'iconfont vs-git';
        case 'less':
            return 'iconfont vs-less icon-purple';
        case 'scss':
        case 'sass':
            return 'iconfont vs-scss icon-wine-red';
        case 'css':
            return 'iconfont vs-css icon-b';
        case 'md':
            if (fileName.toLowerCase() === 'readme.md') {
                return 'iconfont vs-readme icon-b';
            }
            return 'iconfont vs-md icon-b';
        case 'json':
            if (fileName === 'tsconfig.json') {
                return 'iconfont vs-tsconfig icon-b';
            }
            return 'iconfont vs-json icon-y';
        case 'html':
            return 'iconfont vs-html icon-pink';
        case 'yaml':
            return 'iconfont vs-yaml icon-purple';
        case 'cs':
            return 'iconfont vs-c3 icon-b';
        case 'cpp':
            return 'iconfont vs-c2 icon-b';
        case 'svg':
            return 'iconfont vs-svg icon-purple';
        case 'npmrc':
            return 'iconfont vs-npm icon-r';
        case 'cjs':
            return 'iconfont vs-cjs icon-cyan';
        default:
            return 'iconfont vs-default icon-w';
    }
}

function  openAll() {
    openAllState.value = true;
    expandRecursive(elTreeRef.value.store.root, openAllState.value);
}

function  closeAll() {
    openAllState.value = false;
    expandRecursive(elTreeRef.value.store.root, openAllState.value);
}

function expandRecursive(node, value) {
    if (node.childNodes && node.childNodes.length > 0) {
        node.childNodes.forEach(child => {
            child.expanded = value;
            expandRecursive(child, value);
        });
    }
}

</script>

<template>
    <div
        class="vs-slider"
        :style="{
            width: `${width}px`,
        }"
    >
        <div class="header">
            <span class="base-dir">{{ baseDirName }}</span>
            <div>
                <i class="icon iconfont vs-find cursor-pointer" title="查找文件"></i>
                <i class="icon iconfont vs-add-file cursor-pointer" title="添加文件"></i>
                <i class="icon iconfont vs-add-folder cursor-pointer" title="添加目录文件"></i>
                <i class="icon iconfont vs-target cursor-pointer" title="定位文件"></i>
                <i
                    v-if="!openAllState"
                    class="icon iconfont vs-open-all cursor-pointer"
                    title="展开所有文件"
                    @click="openAll"
                ></i>
                <i
                    v-else
                    class="icon iconfont vs-close-all cursor-pointer"
                    title="关闭所有文件"
                    @click="closeAll"
                ></i>
            </div>
        </div>
        <div class="el-tree-view">
            <el-tree
                ref="elTreeRef"
                :data="fileList"
                :default-expanded-keys="defaultExpandKeys"
                :draggable="true"
                :icon="ArrowRightBold"
                node-key="name"
                :highlight-current="true"
                :props="defaultProps"
                @node-click="handleNodeClick"
            >
                <template #default="{ node, data }">
                <span class="custom-tree-node">
                    <i
                        v-if="!data.isDir"
                        :class="getFileIcon(data.name)"
                    ></i>
                    <span class="name">{{ data.name }}</span>
                    <span></span>
                </span>
                </template>
            </el-tree>
        </div>
    </div>
</template>

<style lang="scss" scoped>

.base-dir {
    font-weight: bold;
}

.vs-slider {
    background-color: #2d3047;
    color: #fff;
    height: 100%;
    padding: 5px 10px;
}

.header {
    display: flex;
    flex-direction: row;
    height: 30px;
    justify-content: space-between;

}

.header .icon {
    margin: 0 4px;
}
::v-deep .el-tree {
    background-color: inherit;
    color: inherit;
}

::v-deep .is-current {
    opacity: .8;
}

::v-deep .el-tree-node {
    &:focus>.el-tree-node__content {
        background-color: #2d3047;
    }
    &:hover>.el-tree-node__content {
        background-color: #3d4057;
        color: white;
        opacity: .9;
    }

    &.is-current>.el-tree-node__content {
        background-color: rgba(60, 180, 245, .5) !important;
        border: 1px solid #409eff;
    }


}

.custom-tree-node {
    display: flex;
    flex-direction: row;
    align-items: center;

    .iconfont {
        margin-right: 4px;
    }

    .name {
        padding-right: 8px;
    }
}

.cursor-pointer {
    cursor: pointer;
}

.el-tree-view {
    width: 100%;
    height: calc(100% - 35px);
    overflow: scroll;

    ::v-deep .el-tree {
        min-width: max-content;
        width: 100%;
    }
}

.icon-y {
    color: #f4ea2a;
}

.icon-r {
    color: #d81e06;
}

.icon-b {
    color: #1296db;
}

.icon-g {
    color: #42b883;
}

.icon-w {
    color: white;
}

.icon-pink {
    color: #df744a;
}
.icon-purple {
    color: #a239ca;
}

.icon-wine-red {
    color: #d4237a;
}

.icon-cyan {
    color: #6b8e23;
}

</style>
