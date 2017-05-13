/**
 * Created by xiaoyudesu on 5/10/2017.
 */
var killer=document.getElementsByClassName("killer")[0];
var doctor=document.getElementsByClassName("doctor")[0];
var block=document.getElementById("block");
var setting=document.getElementById("setting");
var num=document.getElementById("number");
var range=document.getElementById("range");
var sub=document.getElementById("sub");
var add=document.getElementById("add");
var deal=document.getElementById("deal");
var killerWord=document.getElementById("killerWord");
var doctorWord=document.getElementById("doctorWord");
var help=document.getElementsByClassName("help")[0];

var killers=[];
var persons;

//先隐藏block子元素
block.innerHTML="";

//游戏提示
help.onclick=function(){
    alert("玩家人数为6~18，选择人数后，点击设置，系统自动分配角色。词组默认为西伯利亚~")
}

//点击配置人数和角色
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
    persons=killers.concat(doctors);

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
    data=[];
    for(i=0;i<persons.length;i++){
        personsString+=persons[i].outerHTML;
        data[i]=persons[i].nodeValue;
    };
    // console.log(personsString);

    //将元素字符串添加到block中
    block.innerHTML=personsString;

}




//滑杆左右颜色设置
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
    blurs();
}


//number失去焦点时
num.onblur=function(){
    blurs();
}

//number失去焦点后的数值判断，封装一下以便后用。
function blurs(){
if(Number(num.value) - Math.floor(Number(num.value))==0){

    //做数值范围判断
    if(Number(num.value)<6){
        alert("请输入6~18范围内的整数 ㄟ( ▔, ▔ )ㄏ ");
        // num.value=6;
        document.getElementById("number").value=range.value=6;
        return;
    }else if(Number(num.value)>18){
        alert("请输入6~18范围内的整数 (ｕ_ｕ＃)");
        // num.value=18;
        document.getElementById("number").value=range.value=18;
        return;
    }
    }else{

        alert("请输入6~18范围内的整数 (￣ε(#￣)");
        document.getElementById("number").value=range.value=12;

        console.log(range.value);
        console.log(document.getElementById("number"));
        return;
    }

}




//初始化range的值
document.getElementById("number").value=range.value=6;

sliderColor();

//滑块绑定number以及滑杆左右动态发生颜色变化
range.onchange=range.oninput=range.onpropertychange=function(){
    document.getElementById("number").value=range.value;
    // console.log(range.value);

    sliderColor();

    // blurs();
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


//底部按键
deal.onclick=function(){
    if(persons){

        if(persons.length!=range.value){
            alert("要更新数据！(╯‵□′)╯︵┻━┻")
            return;
        }
        console.log(persons);

        var data=[];
        for(var i=0;i<persons.length;i++){
            data[i]=persons[i].innerText.toString().replace(/^\s+|\s+$/g,"").slice(0,2);
        };

        sessionStorage.setItem("character",JSON.stringify(data));


        console.log(persons);

        // var h=sessionStorage.getItem("character");
        // alert(h);

        location.href="../html/characters.html";
    }else{

        alert("先设置玩家啊！(ノ｀Д´)ノ");
    }

}



//为number添加一个键盘点击事件
document.onkeypress=function(event){
    var e = event || window.event || arguments.callee.caller.arguments[0];
    if(e && e.keyCode==13){
        blurs();
        return;
    }
};


//清空数据
sessionStorage.clear();

//词组设置-killer
killerWord.onblur=function(){
    //清除chrome无限弹窗bug
    onfocus=this.blur();


    //存值
    sessionStorage.setItem("word1",killerWord.value);

    //判断下是否输入了东西
    if(!(killerWord.value.replace(/\s/g,""))){
        alert("少年哟，真的要隐藏词组吗（︶︿︶）");
    }

    // var aa=sessionStorage.getItem("word1");
    // console.log(killerWord.value);
    // console.log(aa);

};

//词组设置-doctor
doctorWord.onblur=function(){
    //清除chrome无限弹窗bug
    onfocus=this.blur();

    sessionStorage.setItem("word2",doctorWord.value);
    if(!(doctorWord.value.replace(/\s/g,""))){
        alert("少年哟，真的要隐藏词组吗（︶︿︶）");
    }

    // var aa=sessionStorage.getItem("word1");
    // console.log(doctorWord.value);
    // console.log(aa);

};


