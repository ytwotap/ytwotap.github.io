var fs = require('fs');
var path = require('path');

// 根目录
let BASEPATHURL = path.resolve(__dirname, '..')

// 移动目录
let startFileDirectory = "C:\\Users\\12824\\OneDrive\\2-学习\\TyporaRecord"
// 放置目录
let endFileDirectory = "E:\\temporary"
// let endFileDirectory = "f:\\test"

var startDate = new Date().getTime()
/*确定哪些文件结尾的能通过过滤器*/
var notfilter = [".md", ".png", ".jpg", ".json",".js"];

/*可以使用的文件夹和文件 */

var notfilterFile = ["1-java基础知识", "2-mysql基础", "3-front-end_development", "4-扩展工具",
    "5-web", "6-框架", "7-software", "8-设计模式", "learn how to learn", "10-个人项目",
    "11-project", "node_modules", "scripts","book.json","package.json","README.md","SUMMARY.md"];
/*需要指定过滤的文件(当前数组下的文件名不会被复制)*/
var filterSpecFile = ["02_二维数组的使用.md"]
// 删除复制执行
rmDirFile(endFileDirectory, () => {
    console.log("全部删除完成，开始复制")
    copyDir(startFileDirectory, endFileDirectory, (res) => {
        console.log("全部复制完成")
        console.log("修改文件内容")
        // replaceText(endFileDirectory)
    })
});


// 删除
function rmDirFile(path, cb) {
    let files = [];
    console.log("开始删除")
    if (fs.existsSync(path)) {
        var count = 0
        var checkEnd = function () {
            console.log("进度", count)
            ++count == files.length && cb && cb()
        }
        files = fs.readdirSync(path);
        files.forEach(function (file, index) {

            let curPath = path + "/" + file;
            if (fs.statSync(curPath).isDirectory()) {
                /*防止文件被删除*/
                if (file != ".git") {
                    rmDirFile(curPath, checkEnd);
                } else {
                    console.log("文件夹删除跳过:" + curPath);
                    checkEnd();
                }
            } else {

                fs.unlinkSync(curPath);
                console.log("删除文件完成", curPath);
                /*检查是否结束*/
                checkEnd();
            }
        });
        // 如果删除文件夹为放置文件夹根目录  不执行删除
        if (path == endFileDirectory) {
            console.log("删除文件夹完成", path)
        } else {
            fs.rmdirSync(path);
        }
        //为空时直接回调
        files.length === 0 && cb && cb()
    } else {
        cb && cb()
    }
}

// 复制文件
function copyFile(srcPath, tarPath, cb) {
    var rs = fs.createReadStream(srcPath)
    rs.on('error', function (err) {
        if (err) {
            console.log('read error', srcPath)
        }
        cb && cb(err)
    })

    var ws = fs.createWriteStream(tarPath)
    ws.on('error', function (err) {
        if (err) {
            console.log('write error', tarPath)
        }
        cb && cb(err)
    })

    ws.on('close', function (ex) {
        cb && cb(ex)
    })

    rs.pipe(ws)
    console.log("复制文件完成", srcPath)
}

// 复制文件夹所有
function copyDir(srcDir, tarDir, cb) {
    if (fs.existsSync(tarDir)) {
        fs.readdir(srcDir, function (err, files) {
                var count = 0
                var checkEnd = function () {
                    console.log("进度", count)
                    ++count == files.length && cb && cb()
                }

                if (err) {
                    checkEnd()
                    return
                }

                files.forEach(function (file) {
                    var srcPath = path.join(srcDir, file)
                    var tarPath = path.join(tarDir, file)

                    fs.stat(srcPath, function (err, stats) {
                        if (!judgenoFilter(srcPath, notfilterFile)) {
                            console.log("跳过文件夹创建 ", srcPath)
                            return
                        }
                        if (stats.isDirectory()) {
                            fs.mkdir(tarPath, function (err) {
                                if (err) {
                                    console.log(err)
                                    return
                                }
                                if (judgenoFilter(srcPath, notfilterFile)) {
                                    copyDir(srcPath, tarPath, checkEnd)
                                    console.log("复制文件完成 ", srcPath)
                                } else {
                                    console.log("跳过文件复制 ", srcPath)
                                }

                            })
                        } else {
                            /*指定的文件 和 过滤特定文件*/
                            if (judgenoFilter(file, notfilter) && !judgenoFilter(file, filterSpecFile)) {

                                copyFile(srcPath, tarPath, checkEnd)
                                console.log("复制文件完成", srcPath)

                            } else {
                                console.log("跳过", srcPath)
                            }
                        }
                    })
                })

                //为空时直接回调
                files.length === 0 && cb && cb()
            }
        )
    } else {
        fs.mkdir(tarDir, function (err) {
            if (err) {
                console.log(err)
                return
            }
            console.log('创建文件夹', tarDir)
            copyDir(srcDir, tarDir, cb)
        })
    }

}

/**
 * 判断是否能通过过滤器验证
 * @param filename
 * @returns {boolean}
 */

/*test fareach 和返回值*/
function judgenoFilter(filename, yourfilter) {

    var rusult = false;

    //获取每个参数
    yourfilter.forEach(function (item) {
        /*对参数进行判断末尾值*/
        var t = confirmEnding(filename, item);
        if (t == true) {//含有 返回
            rusult = true;
        }
    })

    if (rusult) {
        return true;
    }
    //无,false
    return false;
}

/*判断是不是以特定字符结尾*/
function confirmEnding(str, target) {
    if (str.search(target) != -1) {
        return true;
    } else {
        return false;
    }
}
 