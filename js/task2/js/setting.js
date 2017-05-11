/**
 * Created by xiaoyudesu on 5/10/2017.
 */
var person=document.getElementsByClassName("character");
var killer=document.getElementsByClassName("killer")[0];
var doctor=document.getElementsByClassName("doctor")[0];
var block=document.getElementById("block");
var setting=document.getElementById("setting");
var num=document.getElementById("number");
var range=document.getElementById("range");
var sub=document.getElementById("sub");
var add=document.getElementById("add");



var killers=[];


//先隐藏block子元素
block.innerHTML="";

//改变person
setting.onclick=function(){
    //先把获取的字符串转换为数字
    var number=Number(num.value);


    //做小数判断
    if(number - Math.floor(number)==0) {

        //做数值范围判断
        if (5 < number && number < 9) {

            //把killers的数组设置为相应的长度
            killers = Array(1);
        } else if (8 < number && number < 12) {

            killers = Array(2);
        } else if (11 < number && number < 16) {

            killers = Array(3);
        } else if (15 < number && number < 19) {

            killers = Array(4);
        } else {
            //不符合条件，跳出function代码块
            alert("请输入6~18范围内的整数 _(:з」∠)_ ");
            return;
        }
    }else{
        alert("请输入6~18范围内的整数╮(╯▽╰)╭ ");
        return;
    }

    //doctors长度与killers相对
    var doctors=Array(number-killers.length);

    //将killers的每一项都设置为killer元素
    for(var i=0;i<killers.length;i++){
        killers[i]=killer;
    }

    for(var j=0;j<doctors.length;j++){
        doctors[j]=doctor;
    }

    //合并killers和doctors
    var persons=killers.concat(doctors);

    console.log(persons);

    //洗牌算法，随机将项移到最后面，并删除数组项原始值执行多次。
    for(i=0;i<persons.length;i++){
        var index=Math.floor(Math.random()*persons.length);
        console.log(persons.length);
        console.log(index);
        persons.push(persons[index]);
        persons.splice(index,1);
    }


    console.log(persons);

    //遍历persons数组项并连接成一个元素字符串
    var personsString="";
    for(i=0;i<persons.length;i++){
        personsString+=persons[i].outerHTML;
    };
    // console.log(personsString);

    //将元素字符串添加到block中
    block.innerHTML=personsString;
}



function sliderColor(){
    //取得当前刻度相对滑杆的百分比
    var progress=(Number(range.value) - 6)/(18 - 6);
    // console.log(range.value);

    //取得range的style
    var rangeStyle=getComputedStyle(range,null);
    // console.log(range.value);
    // console.log(progress);
    // console.log(rangeStyle);

    //取得range的width数值
    var width=rangeStyle.width;
    //console.log(width);

    //取得当前刻度的width数值
    var left=parseInt(width)*progress+"px";
    //console.log(left);

    //设置背景图片的尺寸
    range.style.backgroundSize=left+" 100%";
}


num.onblur=function(){
    if(Number(num.value) - Math.floor(Number(num.value))==0){

        //做数值范围判断
        if(!(Number(num.value)>5&&Number(num.value)<19)){

            alert("请输入6~18范围内的整数 (ｕ_ｕ＃)");
            // return;
        }
    }else{

        alert("请输入6~18范围内的整数 (￣ε(#￣)");
        // return;
    }
}




//初始化range的值
range.value=6;

sliderColor();

//滑块绑定number以及滑杆左右动态发生颜色变化
range.onchange=range.oninput=range.onpropertychange=function(){
    document.getElementById("number").value=range.value;
    // console.log(range.value);

    sliderColor();

};




//number绑定滑块
num.onchange=function(){
    range.value=document.getElementById("number").value;

    sliderColor();

};


//左按键
sub.onclick=function(){
    var a=range.value--;
    document.getElementById("number").value=range.value;

    sliderColor();

    if(range.value == 6&& a == 6){
        alert("到底了●︿●");
    };

};

//右按键
add.onclick=function(){
    var a=range.value++;
    // console.log(c);
    document.getElementById("number").value=range.value;

    sliderColor();
    console.log(range.value);

    if(range.value == 18&& a == 18){
        alert("到头了●﹏●");
    };
};




