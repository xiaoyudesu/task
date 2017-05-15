/**
 * Created by xiaoyudesu on 5/10/2017.
 */
var help=document.getElementsByClassName("help")[0];
var toggle=document.getElementById("toggle");
var killer=document.getElementsByClassName("killer")[0];
var civilian=document.getElementsByClassName("civilian")[0];
var setting=document.getElementById("setting");
var num=document.getElementById("number");
var range=document.getElementById("range");
var sub=document.getElementById("sub");
var add=document.getElementById("add");
var deal=document.getElementById("deal");
var killerWord=document.getElementById("killerWord");
var civilianWord=document.getElementById("civilianWord");

var persons=[];
var killers=[];
var civilians=[];


//先隐藏toggle子元素
toggle.innerHTML="";

//游戏提示
help.onclick=function(){
    alert("玩家人数为6~18，选择人数后，点击设置，系统自动分配角色。词组默认为西伯利亚~");
};

//点击配置人数和角色
setting.onclick=function() {
    var number=Number(num.value);

    //做数值范围判断
    if (6 <= number && number <= 8) {

        //把killers的数组设置为相应的长度
        killers.length = 1;
    } else if (9 <= number && number <= 11) {

        killers.length = 2;
    } else if (12 <= number && number <= 15) {

        killers.length = 3;
    } else if (16 <= number && number <= 18) {

        killers.length = 4;
    }

    //civilians长度与killers相对
    civilians.length=number-killers.length;


    //将killers的每一项都设置为killer元素
    for(var i=0;i<killers.length;i++){
        killers[i]=killer;
    }

    for(var j=0;j<civilians.length;j++){
        civilians[j]=civilian;
    }


    //合并killers和civilians
    persons=killers.concat(civilians);

    //洗牌算法，随机将项移到最后面，并删除数组项原始值执行多次。
    for(i=0;i<persons.length;i++){
        var index=Math.floor(Math.random()*persons.length);
        // console.log(persons.length);
        // console.log(index);
        persons.push(persons[index]);
        persons.splice(index,1);
    }

    //遍历persons数组项并连接成一个元素字符串
    var personsString="";
    for(i=0;i<persons.length;i++){
        personsString+=persons[i].outerHTML;
    }
    console.log(personsString);

    //将元素字符串添加到toggle中
    toggle.innerHTML=personsString;

};




//滑杆左右颜色设置
function sliderColor(){
    //取得当前刻度相对滑杆的百分比
    var progress=(Number(range.value) - 6)/(18 - 6);
    // console.log(range.value);

    //取得range的style
    var rangeStyle=getComputedStyle(range,null);

    //取得range的width数值
    var width=rangeStyle.width;
    //console.log(width);

    //取得当前刻度的width数值
    var left=parseInt(width)*progress+"px";
    //console.log(left);

    //设置背景图片的尺寸
    range.style.backgroundSize=left+" 100%";
}


//number失去焦点后的数值判断，封装一下以便后用。
function blurs() {
    var number=Number(num.value);
    if (number - Math.floor(number) == 0) {
        //做数值范围判断
        if (number < 6) {
            alert("请输入6~18范围内的整数 ㄟ( ▔, ▔ )ㄏ ");
            num.value = range.value = 6;
        } else if (number > 18) {
            alert("请输入6~18范围内的整数 (ｕ_ｕ＃)");
            num.value = range.value = 18;
        }
    } else {
        alert("请输入6~18范围内的整数 (￣ε(#￣)");
        num.value = range.value = 12;
    }
}


//number失去焦点时
num.onblur=function(){
    this.blur();
    blurs();
    range.value=num.value;
    sliderColor();
};


//滑块绑定number以及滑杆左右动态发生颜色变化
range.onchange=range.oninput=function(){
    num.value=range.value;
    sliderColor();
};



//左按键
sub.onclick=function(){
    var a=range.value--;
    num.value=range.value;

    sliderColor();

    if(range.value == 6&& a == 6){
        alert("到底了●︿●");
    }
};


//右按键
add.onclick=function(){
    var a=range.value++;
    num.value=range.value;

    sliderColor();

    if(range.value == 18&& a == 18){
        alert("到头了●﹏●");
    }
};
//清空数据
persons=null;
//底部按键
deal.onclick=function(){
    if(persons){
        if(persons.length!=range.value){
            alert("要更新数据！(╯‵□′)╯︵┻━┻")
        }else{
            var data=[];
            for(var i=0;i<persons.length;i++){
                data[i]=persons[i].innerText.toString().trim().slice(0,2);
            }

            sessionStorage.setItem("character",JSON.stringify(data));

            location.href="../html/characters.html";
        }
    }else{

        alert("先设置玩家啊！(ノ｀Д´)ノ");
    }
};


//清空数据
sessionStorage.clear();

//词组设置-killer
killerWord.onblur=function(){
    //清除chrome无限弹窗bug
    this.blur();
    if(killerWord.value){
        //存值
        sessionStorage.setItem("word1",killerWord.value);

        //判断下是否输入了空格
        if(!killerWord.value.trim()){
            alert("少年哟，真的要隐藏词组吗（︶︿︶）");
        }
    }
};

//词组设置-killer
civilianWord.onblur=function(){
    //清除chrome无限弹窗bug
    this.blur();
    if(civilianWord.value){
        //存值
        sessionStorage.setItem("word2",civilianWord.value);

        //判断下是否输入了空格
        if(!civilianWord.value.trim()){
            alert("少年哟，真的要隐藏词组吗（︶︿︶）");
        }
    }
};

