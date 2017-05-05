/**
 * Created by xiaoyudesu on 5/1/2017.
 */



//颜色改变开始函数
function start(){

    //随机生成9个255内数字。
    var color=[];
    for(var a=0;a<9;a++){
        color[a]=Math.floor(Math.random()*256);
    }


    //把数字转成3个rgb色
    var c0="rgb("+color[0]+","+color[1]+","+color[2]+")";
    var c1="rgb("+color[3]+","+color[4]+","+color[5]+")";
    var c2="rgb("+color[6]+","+color[7]+","+color[8]+")";

    console.log(c0,c1,c2);


    //从9个方块中随机取得3个小方块
    var index=[];
    for(var b=0;b<3;b++){
        index[b]=Math.floor(Math.random()*9);
        console.log(index[b]);
    }

    //每次循环把9个小方块全重置为默认色
    for(var c=0;c<block.length;c++){
        block[c].style.backgroundColor="#fea500";
    }

    //把三种颜色填充入三个小方块中
    block[index[0]].style.backgroundColor=c0;
    block[index[1]].style.backgroundColor=c1;
    block[index[2]].style.backgroundColor=c2;

    // 设定时器进行递归并消除叠加影响
    clearTimeout(t);
    t=setTimeout(start,1000);
}

/*

方法2
var v;
function abcd(){
    clearInterval(v);
    v=setInterval(start,1000);
}
*/


//停止函数
function stop(){
    clearTimeout(t);

    //循环过后重置颜色
    for(var c=0;c<block.length;c++){
        block[c].style.backgroundColor="#fea500";
    }
}




//获取小方块的数组。
var block=document.getElementsByClassName("a");

//设置全局定时器变量
var t;


//两个按钮绑定定时器
var btn=document.getElementsByTagName("button");

btn[0].onclick=start;
btn[1].onclick=stop;


//按钮按下时的效果。
for(var i=0;i<2;i++){
    btn[i].onmouseover=function(){
        this.style.color="#000";
    };

    btn[i].onmouseout=function(){
        this.style.color="#fff";
    };

    btn[0].onmousedown=function(){
        this.style.backgroundColor="#5fc0cd";
    };

    btn[1].onmousedown=function(){
        this.style.backgroundColor="#f01400";
    };

    btn[0].onmouseup=function(){
        this.style.backgroundColor="#29b078";
    };


    btn[1].onmouseup=function(){
        this.style.backgroundColor="#e15053";
    };
}




