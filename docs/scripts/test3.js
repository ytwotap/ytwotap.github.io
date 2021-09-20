var notfilterFile = ["1-java基础知识","2-mysql基础","3-front-end_development","4-扩展工具",
    "5-web","6-框架","7-software","8-设计模式","learn how to learn","10-个人项目",
    "11-project","node_modules","scripts"];

let b = judgenoFilter("111-1java基础知识fdsf",notfilterFile);
console.log(b)

/*test fareach 和返回值*/
function judgenoFilter(filename,yourfilter){

    var rusult=false;

    //获取每个参数
    yourfilter.forEach(function(item) {
        /*对参数进行判断末尾值*/
        var t=confirmEnding(filename,item);
        if (t==true){//含有 返回
            rusult=true;
        }
    })

    if (rusult){
        return true;
    }
    //无,false
    return false;
}
/*判断是不是以特定字符结尾*/
function confirmEnding(str, target) {
    if(str.search(target)!=-1){
        return true;
    }else{
        return false;
    }
}
