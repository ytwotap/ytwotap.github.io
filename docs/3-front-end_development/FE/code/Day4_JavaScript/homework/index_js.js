/*点击切换图*/
var picPath = ["1111", "2222",
    "3333", "1234", "4567","BNKSU"]
var i = 0;

function pic() {
    console.log("test")
    /*get pic id */
    // var seePicText=document.getElementById("pic_text")
    var seePic = document.getElementById("picture")
    /*随机选择图片*/
    i++;
    if (i>=6){
        i=0;
    }
    /*get path*/
    var path ="./"+ picPath[i]+".png";
    /*修改img 属性*/
    seePic.setAttribute("src", path)

}
/*检查是否输入正确*/
function checked(){
    //得到输入值
    var printId=document.getElementById("input_number");
    var print=printId.value;
    //得到当前是哪张图片.
    var pic=picPath[i];
    //得到正确值
    if (print==pic){
        alert("验证成功")
    }else{
        alert("验证失败")
    }


}