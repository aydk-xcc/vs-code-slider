export function fileSorts(files: Array<FileData>) {
    files.sort((a: FileData, b: FileData) => {
        if (a.isDir && b.isDir) {
            // 都是目录
            return a.name < b.name ? -1: 0;
        } else if (a.isDir || b.isDir) {
            return a.isDir ? -1: 0;
        } else {
            return a.name < b.name ? -1: 0;
        }
    });
    files.forEach(file => {
        if (file.isDir && file.children) {
            fileSorts(file.children);
        }
    })
}

function isFolder(filePath) {
    if (filePath.endsWith('/')) {
        return true;
    } else {
        return false;
    }
}

declare interface FileData {
    name: string;
    path: string;
    isDir: boolean;
    children?: Array<FileData>;
};

export function dealFilePath(filePaths: Array<string>) {
    let fileArr: Array<FileData> = [];
    filePaths.forEach(path => {
        let isDir = isFolder(path);
        let isExist = true;
        let paths = path.split('/').filter(item => item.trim());
        let start = 0;
        let tempArr = fileArr;
        while (start < paths.length) {
            let index = tempArr.findIndex(item => item.name === paths[start]);
            if (start === paths.length - 1) {
                if (index < 0 || tempArr[index].isDir !== isDir) {
                    if (isDir) {
                        tempArr.push({
                            name: paths[start],
                            path: path,
                            isDir: isDir,
                            children: []
                        });
                    } else {
                        tempArr.push({
                            name: paths[start],
                            path: path,
                            isDir: isDir
                        });
                    }
                }
            } else {
                if (!isExist || index < 0 || !tempArr[index].isDir) {
                    tempArr.push({
                        name: paths[start],
                        path: paths.slice(0, start + 1).join('/'),
                        isDir: true,
                        children: []
                    });
                    isExist = false;
                    tempArr = tempArr[tempArr.length - 1].children;
                } else {
                    tempArr = tempArr[index].children;
                }
            }
            start++;
        }
    })
    return fileArr;
}

export function getFileIcon(fileName: string) {
    if (fileName.toLowerCase().startsWith('changelog')) {
        return 'iconfont vs-log';
    }
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
        case 'log':
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
        case 'yml':
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

export default {
    fileSorts,
    dealFilePath,
    getFileIcon
}
