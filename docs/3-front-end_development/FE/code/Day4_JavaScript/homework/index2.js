var listRate = [1, 0.9, 100, 8, 1000, 0.000016]
var listMoney = ['美元', '欧元', '日元', '港元', '韩元', '比特币']

/*汇率换算*/
function exchangeRates(){
    //get id
    /*get id*/
    var original=document.getElementById("original")
    console.log("original"+original)
    var New_kind=document.getElementById("New_kind")
    console.log("New_kind"+New_kind)
    //get select value
    var index_original=original.selectedIndex
    var index_New_kind=New_kind.selectedIndex
    //兑换数组
    //选择兑换的值
    var rate=listRate[index_New_kind]/listRate[index_original]
    //显示兑换值
    var input=document.getElementById("dis")
    console.log(rate)
    input.setAttribute("value",rate)

}

/*互换选中状态*/
function exchangeState(qualifiedName, value){
    /*get id*/
    var original=document.getElementById("original")
    var New_kind=document.getElementById("New_kind")
    //get select value
    var index_original=original.selectedIndex
    var index_New_kind=New_kind.selectedIndex
    /*清除选中*/
    /*select value*/
    selectvalue(New_kind,index_original)
    selectvalue(original,index_New_kind)
}
/*select value*/
function selectvalue(selected,index){
    selected.options[index].selected=true
}