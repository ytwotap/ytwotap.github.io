/*test 判断末尾的值是不是包含特定值*/
function confirmEnding(str, target) {
    if(str.endsWith(target)){
        return true;
    }else{
        return false;
    }
}


/*test fareach 和返回值*/
function judgenoFilter(filename){

    var rusult=false;

    //获取每个参数
    notfilter.forEach(function(item) {
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

var notfilter = [".md",".png",".jpg",".html",".json"];

var t=judgenoFilter("fsdjfafs.mda");
/*判断字符串结尾 是啥*/
// var t=confirmEnding("Bastian", "n");
console.log(t);