# vs-code-slider

基于vue3实现仿vs-code的侧边文件管理菜单

## 使用

```sh

pnpm install vs-code-slider

```

## 查看demo

```sh

clone 代码到本地

pnpm install vs-code-slider

pnpm dev

```
效果如下：<br>

![image](./image/demo.png)

## 1. 文件类型的图标：

| 文件类型                 | 图标                                                            | 文件类型            | 图标                                                               | 文件类型            | 图标                                                              | 文件类型      | 图标                                                             |
|----------------------|---------------------------------------------------------------|-----------------|------------------------------------------------------------------|-----------------|-----------------------------------------------------------------|-----------|----------------------------------------------------------------|
| .c                   | <img src="./image/c.png" alt="描述" width="30" height="30">     | .cpp            | <img src="./image/c2.png" alt="描述" width="30" height="30">       | .cs             | <img src="./image/c3.png" alt="描述" width="30" height="30">      | .cjs      | <img src="./image/cjs.png" alt="描述" width="30" height="30">    |
| .css                 | <img src="./image/css.png" alt="描述" width="30" height="30">   | .git、.gitignore | <img src="./image/git.png" alt="描述" width="30" height="30">      | .go             | <img src="./image/go.png" alt="描述" width="30" height="30">      | .html     | <img src="./image/html.png" alt="描述" width="30" height="30">   |
| .png、.jpeg、.jpg、.gif | <img src="./image/image.png" alt="描述" width="30" height="30"> | .java           | <img src="./image/java.png" alt="描述" width="30" height="30">     | .js             | <img src="./image/js.png" alt="描述" width="30" height="30">      | .json     | <img src="./image/json.png" alt="描述" width="30" height="30">   |
| .less                | <img src="./image/less.png" alt="描述" width="30" height="30">  | .license        | <img src="./image/license.png" alt="描述" width="30" height="30">  | .log、.changelog | <img src="./image/log.png" alt="描述" width="30" height="30">     | .md       | <img src="./image/md.png" alt="描述" width="30" height="30">     |
| .npm                 | <img src="./image/npm.png" alt="描述" width="30" height="20">   | .python         | <img src="./image/python.png" alt="描述" width="30" height="30">   | .react          | <img src="./image/react.png" alt="描述" width="30" height="30">   | readme.md | <img src="./image/readme.png" alt="描述" width="30" height="30"> |
| .scss、.sass          | <img src="./image/scss.png" alt="描述" width="30" height="30">  | .setting        | <img src="./image/setting.png" alt="描述" width="30" height="30">  | .svg            | <img src="./image/svg.png" alt="描述" width="30" height="30">     | .tpl      | <img src="./image/tpl.png" alt="描述" width="30" height="30">    |
| .ts                  | <img src="./image/ts.png" alt="描述" width="30" height="30">    | .tsconfig       | <img src="./image/tsconfig.png" alt="描述" width="30" height="30"> | .vue            | <img src="./image/vue.png" alt="描述" width="30" height="30">     | .xml      | <img src="./image/xml.png" alt="描述" width="30" height="30">    |
| .yaml                | <img src="./image/yaml.png" alt="描述" width="30" height="30">  | .tsconfig       | <img src="./image/tsconfig.png" alt="描述" width="30" height="30"> | 默认              | <img src="./image/default.png" alt="描述" width="30" height="30"> |       |     |

如不满足，可以issues留言增加

如何使用组件呢，参考[demo](https://github.com/aydk-xcc/vs-code-slider/blob/master/example/src/App.vue)：
```vue
<script setup lang="ts">
import VsCodeSlider from 'vs-code-slider';
import {ref} from 'vue';

const arr = ref([
    'vue/d.js',
    'vue/README.md',
    'vue/12.vue',
    'vue/test.md'
]);

</script>

<template>
    <VsCodeSlider
        :files="arr"
    />
</template>
<style scoped>
</style>
```
组件的props说明如下：

| prop        | 类型              | 可选值 | 默认值         | 说明                                                      |
|-------------|-----------------|-----|-------------|---------------------------------------------------------|
| baseDir     | string          | -   | -           | 展示在组件左上角的名称，当不传时，默认是file解析之后的最外层目录名称，如果解析之后有多个，则显示'未命名' |
| files       | Array\<string\> | -   | []          | 文件数组,当前支持的是完整文件的path组成的数组，具体可以参考例子,组件会自动对层级进行处理和排序      |
| theme       | string          | -   | light/dark  | 暗黑主题和白色主题                                               |
| width       | number          | -   | 280         | 侧边栏的默认宽度                                                |
| defaultOpen | bool            | -   | false       | 是否默认展示一级目录                                              |
| currentFile | sting           | -   | 最后一次点击的文件名称 | 当前正在查看的文件，为了顶部的定位到当前文件来使用                               |
| bgColor     | string          | -   | -           | 侧边栏的背景色，优先级最高                                           |
| disabled    | bool          | -   | false       | 是否禁用操作                                                  |
## 2.功能
部分功能完善中，欢迎pr

### 2.1 文件排序
已支持，默认对文件的按照字母序升序进行排序，同级内文件和字母各自按照升序排列

### 2.2 全部展开和全部收起
|全部收起| 全部展开                             |
|-------|----------------------------------|
|![image](./image/close-all.png)| ![image](./image/expand-all.png) |

### 2.3 查找
![img.png](./image/search-file.png)

### 2.4 定位
待支持

### 2.5 增加文件夹
| 点击上方按钮                            | 右键添加                              |
|-----------------------------------|-----------------------------------|
| ![image](./image/add-folder1.png) | ![image](./image/add-folder2.png) |
### 2.6 增加文件
| 点击上方按钮                          | 右键添加                              |
|---------------------------------|-----------------------------------|
| ![image](./image/add-file1.png) | ![image](./image/add-file2.png) |

### 2.7 配置主题
待支持




