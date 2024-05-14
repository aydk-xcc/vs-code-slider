<script
    setup
    lang="ts"
>
import {computed, nextTick, reactive, ref} from 'vue';
import {dealFilePath, fileSorts, getFileIcon} from './utils/utils';
import {ElTree} from 'element-plus';
import {ArrowRightBold} from '@element-plus/icons-vue';
import RightContentMenu from './components/RightContentMenu.vue';
import {errorInfo} from './config/config';

declare interface FileData {
    name: string;
    path: string;
    isNew?: boolean;
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

const emits = defineEmits(['fileClick', 'addFile', 'addFolder']);

const elTreeRef = ref(null);
const addInputRef = ref(null);
const rightContentMenuRef = ref(null);
const errorInfoRef = ref(null);
const errorInfoPosition = reactive({
    left: 0,
    top: 0,
    width: 0
})

const width = ref(props.width || 280);
const openAllState = ref(false);
const defaultExpandKeys = ref([]);
const currentNodeData = reactive({
    data: null,
    node: null
});
const createError = ref('');
const newFileName = ref('');
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
    return '';
});

const showAddFolder = computed(() => {
    return currentNodeData.data && currentNodeData.data.isDir;
});

function handleNodeClick(obj, node, TreeNode, Event) {
    currentNodeData.data = obj;
    currentNodeData.node = node;
    emits('fileClick', obj, node, TreeNode, Event);
}

function handleContentMenuClick(event, data, node, TreeNode) {
    elTreeRef.value.setCurrentKey(data.path);
    if (rightContentMenuRef && rightContentMenuRef.value) {
        rightContentMenuRef.value.showMenu(event, data, node, TreeNode);
    }
}


function openAll() {
    openAllState.value = true;
    expandRecursive(elTreeRef.value.store.root, openAllState.value);
}

function closeAll() {
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

function openNode() {
    let currentNode = elTreeRef.value.getCurrentNode();
    if (currentNode.isDir) {
        let childNodes = elTreeRef.value.store.root.childNodes;
        let path = currentNode.path.split('/');
        let index =  0;
        while(index < path.length) {
            let node = childNodes.find(item => item.data.name === path[index]);
            if (index === path.length - 1) {
                node.expanded = true;
                break;
            } else {
                childNodes = node.childNodes;
            }
            index++;
        }
    }
}

/**
 * 添加目录
 */
function addFolder() {
    if (elTreeRef.value.getCurrentNode()) {
        let child = elTreeRef.value.getCurrentNode().children[0];
        let node = elTreeRef.value.getNode(child.path)
        elTreeRef.value.insertBefore({
            children: [],
            isNew: true,
            isDir: true,
            name: '',
            path: ''
        }, node);
        nextTick(() => {
            openNode();
            setTimeout(() => {
                addInputRef.value && addInputRef.value.focus();
                let rect = addInputRef.value.input.getBoundingClientRect();
                errorInfoPosition.left = rect.left - 12;
                errorInfoPosition.top = rect.top + 26;
                errorInfoPosition.width = rect.width + 22;
            }, 200);
        });
    } else {

    }
}

/**
 * 添加文件
 */
function addFile() {
    if (elTreeRef.value.getCurrentNode()) {
        elTreeRef.value.append({
            children: [],
            isNew: true,
            isDir: false,
            name: '',
            path: ''
        }, elTreeRef.value.getCurrentNode());
        nextTick(() => {
            openNode();
            setTimeout(() => {
                addInputRef.value && addInputRef.value.focus();
                let rect = addInputRef.value.input.getBoundingClientRect();
                errorInfoPosition.left = rect.left - 12;
                errorInfoPosition.top = rect.top + 26;
                errorInfoPosition.width = rect.width + 22;
            }, 200);
        });
    } else {

    }
}

/**
 * 取消选中状态
 * @param event
 */
function cancelCurrentClick() {
    currentNodeData.data = null;
    currentNodeData.node = null;
    elTreeRef.value.setCurrentKey(null)
}

/**
 * 创建文件
 * @param data
 * @param node
 */
function createFile(data, node, type) {
    if (newFileName.value && newFileName.value.trim()) {
        let newName = newFileName.value.trim();
        if (currentNodeData.data.children.find(item => item.name === newName)) {
            if (type === 'entry') {
                createError.value = errorInfo.EXIT_FILE;
            } else {
                elTreeRef.value.remove(data);
                newFileName.value = '';
                createError.value = '';
            }
        } else {
            data.isNew = false;
            data.name = newName;
            newFileName.value = '';
            createError.value = '';
            if (data.isDir) {
                emits('addFolder', data);
            } else {
                emits('addFile', data);
            }
        }
    } else if (data.isNew) {
        elTreeRef.value.remove(data);
        newFileName.value = '';
        createError.value = '';
    }
}

/**
 * 定位文件
 */
function locationFile() {

}

function clickMenu(key) {
    switch (key) {
        case 'CREATE_FOLDER':
            addFolder();
            break;
        case 'CREATE_FILE':
            addFile();
            break;
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
                <i
                    class="icon iconfont vs-find cursor-pointer"
                    title="查找文件"
                ></i>
                <i
                    v-if="showAddFolder"
                    class="icon iconfont vs-add-file cursor-pointer"
                    title="添加文件"
                    @click="addFile"
                ></i>
                <i
                    v-if="showAddFolder"
                    class="icon iconfont vs-add-folder cursor-pointer"
                    title="添加目录文件"
                    @click="addFolder"
                ></i>
                <i
                    class="icon iconfont vs-target cursor-pointer"
                    title="定位文件"
                    @click="locationFile"
                ></i>
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
        <div
            class="el-tree-view"
            @contextmenu.prevent
            @click="cancelCurrentClick"
        >
            <ElTree
                ref="elTreeRef"
                :data="fileList"
                :default-expanded-keys="defaultExpandKeys"
                :draggable="true"
                :icon="ArrowRightBold"
                node-key="path"
                :highlight-current="true"
                :props="defaultProps"
                @node-click="handleNodeClick"
                @node-contextmenu="handleContentMenuClick"
            >
                <template #default="{ node, data }">
                    <span
                        class="custom-tree-node"
                    >
                        <i
                            v-if="!data.isDir"
                            :class="getFileIcon(data.name)"
                        ></i>
                        <i
                            v-else
                            class="icon iconfont"
                            :class="theme === 'light' ? 'vs-folder-line' : 'vs-folder'"
                        ></i>
                        <span
                            v-if="!data.isNew"
                            class="name"
                        >{{ data.name }}</span>
                        <div
                            v-else
                            class="create_file"
                            :class="createError ? 'error' : ''"
                        >
                            <el-input
                                ref="addInputRef"
                                v-model="newFileName"
                                @keyup.enter="createFile(data, node, 'entry')"
                                @blur="createFile(data, node, 'blur')"
                            />
                        </div>
                        <span></span>
                    </span>
                </template>
            </ElTree>
            <div
                v-if="createError"
                ref="errorInfoRef"
                class="error-info"
                :style="{
                    'left': errorInfoPosition.left + 'px',
                    'top': errorInfoPosition.top + 'px',
                    'width': errorInfoPosition.width + 'px',
                }"
            >
                {{ createError }}
            </div>
        </div>
        <RightContentMenu
            ref="rightContentMenuRef"
            @handleMenu="clickMenu"
        />
    </div>
</template>

<style
    lang="scss"
    scoped
>

.vs-slider {
    position: relative;
    color: #3c3c3c;
}

.error-info {
    font-size: 14px;
    background-color: rgb(255, 210, 210);
    position: fixed;
    width: 100%;
    padding: 5px;
    color: #616162;
    border: 1px solid red;
}

.base-dir {
    font-weight: bold;
}

.vs-slider {
    height: 100%;
    padding: 5px 0;
}

:deep(.el-tree-node) {
    &:focus > .el-tree-node__content {
        background-color: rgba(200, 200, 200, .2);
    }

    &:hover > .el-tree-node__content {
        background-color: rgba(200, 200, 200, .15);
    }

    &.is-current > .el-tree-node__content {
        background-color: rgba(34, 84, 250, .8) !important;
        border: 1px solid #9bc0f4;
        color: white;
    }
}


.dark {
    background-color: #2d3047;
    color: #fff;
}

.light {
    background-color: #f2f2f2;
    color: #333333;

    .icon-w {
        color: #616162;
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

:deep(.el-tree) {
    background-color: inherit;
    color: inherit;
}

.custom-tree-node {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;

    .iconfont {
        margin-right: 4px;
    }

    .name {
        padding-right: 8px;
    }

    :deep(.el-input) {
        height: 26px;
    }

    :deep(.el-input__wrapper) {
        border-radius: 0;
    }

    .create_file {
        width: 100%;
        position: relative;
    }
}

.cursor-pointer {
    cursor: pointer;
}

.el-tree-view {
    width: 100%;
    height: calc(100% - 35px);
    overflow: scroll;

    :deep(.el-tree) {
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
