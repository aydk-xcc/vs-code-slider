<script
    setup
    lang="ts"
>
import {computed, ref} from 'vue';
import {dealFilePath, fileSorts, getFileIcon} from './utils/utils';
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
    bgColor: string,
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
    return list;
})

let baseDirName = computed(() => {
    if (!props.baseDir && fileList.value.length === 1) {
        return fileList.value[0].name;
    } else if (props.baseDir) {
        return props.baseDir;
    } else {
        return '未命名';
    }
})

const theme = computed(() => {
    if (['dark', 'light'].includes(props.theme)) {
        return props.theme;
    }
    return 'dark';
});

function  handleNodeClick() {

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
        :class="theme"
        :style="{
            width: `${width}px`,
            backgroundColor: props.bgColor
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
            <ElTree
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
            </ElTree>
        </div>
    </div>
</template>

<style lang="scss" scoped>

.base-dir {
    font-weight: bold;
}

.vs-slider {
    height: 100%;
    padding: 5px 0;
}

.dark {
    background-color: #2d3047;
    color: #fff;

    ::v-deep .el-tree-node {
        &:focus>.el-tree-node__content {
            background-color: rgba(255, 255, 255, .1);
        }
        &:hover>.el-tree-node__content {
            background-color: rgba(255, 255, 255, .1);
            color: white;
            opacity: .9;
        }

        &.is-current>.el-tree-node__content {
            background-color: #2254f4 !important;
            border: 1px solid #9bc0f4;
            color: white;
        }


    }
}

.light {
    background-color: #f2f2f2;
    color: #333333;
    .icon-w {
        color: #616162;
    }

    ::v-deep .el-tree-node {
        &:focus>.el-tree-node__content {
            background-color: rgba(255, 255, 255, .1);
        }
        &:hover>.el-tree-node__content {
            background-color: rgba(255, 255, 255, .1);
            opacity: .9;
        }

        &.is-current>.el-tree-node__content {
            background-color: #2254f4 !important;
            border: 1px solid #9bc0f4;
            color: white;
        }


    }
}

.header {
    display: flex;
    flex-direction: row;
    height: 30px;
    justify-content: space-between;
    padding: 0 10px;

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
