/**
 * Created by xiaoyudesu on 5/1/2017.
 */
var block=document.getElementsByClassName("a");

function start(){

    var color=[];
    for(var a=0;a<9;a++){
        color[a]=parseInt(Math.random()*255);
    }

    console.log(a+" "+color[a]);

    var c0="rgb("+color[0]+","+color[1]+","+color[2]+")";
    var c1="rgb("+color[3]+","+color[4]+","+color[5]+")";
    var c2="rgb("+color[6]+","+color[7]+","+color[8]+")";

    console.log(c0,c1,c2);

    var index=[];
    for(var b=0;b<3;b++){
        index[b]=parseInt(Math.random()*9);
        console.log(index[b]);
    }
    for(var c=0;c<block.length;c++){
        block[c].style.backgroundColor="#fea500";
    }

    block[index[0]].style.backgroundColor=c0;
    block[index[1]].style.backgroundColor=c1;
    block[index[2]].style.backgroundColor=c2;

    clearTimeout(t);
    t=setTimeout("start()",1000);
}


function stop(){
    clearTimeout(t);
    for(var c=0;c<block.length;c++){
        block[c].style.backgroundColor="#fea500";
    }
}



var t;

var btn=document.getElementsByTagName("button");

btn[0].onclick=function(){
    start();
}
btn[1].onclick=function(){
    stop();
}

for(var i=0;i<2;i++){
    btn[i].onmouseover=function(){
        this.style.color="#000";
    }

    btn[i].onmouseout=function(){
        this.style.color="#fff";
    }

    btn[0].onmousedown=function(){
        this.style.backgroundColor="#5fc0cd";
    }

    btn[1].onmousedown=function(){
        this.style.backgroundColor="#f01400";
    }

    btn[0].onmouseup=function(){
        this.style.backgroundColor="#29b078";
    }


    btn[1].onmouseup=function(){
        this.style.backgroundColor="#e15053";
    }
}




