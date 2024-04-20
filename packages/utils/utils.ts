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
            console.log(index, tempArr, paths[start]);
            if (start === paths.length - 1) {
                if (index < 0 || tempArr[index].isDir !== isDir) {
                    tempArr.push({
                        name: paths[start],
                        path: path,
                        isDir: false
                    });
                }
            } else {
                console.log(index);
                if (!isExist || index < 0 || !tempArr[index].isDir) {
                    tempArr.push({
                        name: paths[start],
                        path: '',
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
        console.log(fileArr.length);
    })
    return fileArr;
}

export default {
    fileSorts,
    dealFilePath
}
