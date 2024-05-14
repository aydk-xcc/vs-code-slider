<script lang="ts" setup>
import {ref, defineExpose, reactive, computed, nextTick} from 'vue';
    const menuList = [
        {
            label: '重命名',
            key: 'RENAME'
        },
        {
            label: '创建文件夹',
            key: 'CREATE_FOLDER'
        },
        {
            label: '创建文件',
            key: 'CREATE_FILE'
        },
        {
            label: '复制',
            key: 'COPY'
        },
        {
            label: '粘贴',
            key: 'PASTE'
        },
        {
            label: '删除',
            key: 'DELETE'
        },
    ];
    const inputRef = ref(null);
    const showMenuStatus = ref(false);
    const position = reactive({
        top: 0,
        left: 0
    });
    const isDir = ref(false);
    const emits = defineEmits(['handleMenu']);
    function showMenu(event, data, node, TreeNode) {
        showMenuStatus.value = true;
        isDir.value = data.isDir || false;
        position.top = event.clientY;
        position.left = event.clientX;
        nextTick(() => {
            if (inputRef && inputRef.value) {
                inputRef.value.focus();
            }
        })
    }

    function hiddenMenuStatus() {
        setTimeout(() => {
            showMenuStatus.value = false;
        }, 200);
    }

    const positionX = computed( () => {
        return position.left;
    });

    const positionY = computed( () => {
        return position.top;
    });

    const currentMenuList = computed( () => {
          if (isDir.value) {
              return menuList;
          } else {
              return  menuList.filter(item => !['CREATE_FOLDER', 'CREATE_FILE', 'PASTE'].includes(item.key));
          }
    })

    function clickMenu(item) {
        emits('handleMenu', item.key)
    }

    defineExpose({
        showMenu
    });
</script>
<template>
    <div
        v-show="showMenuStatus"
        class="right-menu"
        :style="{
            top: positionY + 'px',
            left: positionX + 'px'
        }"
    >
        <div v-for="(item, index) in currentMenuList"
             :key="index"
             class="right-menu-item"
             @click="clickMenu(item)"
        >
            {{ item.label }}
        </div>
        <input
            ref="inputRef"
            class="menu_input"
            @blur="hiddenMenuStatus"
        />
    </div>
</template>

<script>
</script>

<style lang="scss" scoped>
    .right-menu {
        position: fixed;
        width: 200px;
        border-radius: 4px;
        border: 1px solid #c4c9cb;
        background-color: #dbe3e5;
        padding: 4px 10px;
        display: flex;
        flex-direction: column;
        box-shadow: 1px 1px 6px 1px #cdcdcd;
        .menu_input {
            width: 0;
            height: 0;
            padding: 0;
            border: none;
        }
        .right-menu-item {
            padding: 0 15px;
            line-height: 30px;
            height: 30px;
            font-size: 12px;
            color: #222221;
            border-radius: 4px;
            cursor: pointer;
            &:hover {
                background-color: #1296db;
                color: white;
            }
        }
    }
</style>
