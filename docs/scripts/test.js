const fs = require('fs');
const path = require('path');

const copyFile = function (srcPath, tarPath, filter = []) {
    fs.readdir(srcPath, function (err, files) {
        console.log(files)
        if (err === null) {
            files.forEach(function (filename) {
                let filedir = path.join(srcPath,filename);

                let filterFlag = filter.some(item => item === filename)
                if (!filterFlag) {
                    fs.stat(filedir, function (errs, stats) {
                        let isFile = stats.isFile()
                        if (isFile) {                                    // 复制文件
                            const destPath = path.join(tarPath,filename);
                            fs.copyFile(filedir, destPath, (err) =>  { })
                        } else {                                        // 创建文件夹
                            let tarFiledir = path.join(tarPath,filename);
                            fs.mkdir(tarFiledir,(err) =>  { });
                            copyFile(filedir, tarFiledir, filter)                 // 递归
                        }
                    })
                }
            })
        } else {
            if (err) console.error(err);
        }
    })
}
//使用
copyFile('./public', './public2', ['robots.txt', 'svg'])