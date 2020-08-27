// 判断是否登陆显示头部样式
let userId = localStorage.getItem('userId');
if (userId) {
    document.querySelector('.login-register').style.display = 'none';
    document.querySelector('.login-exit').style.display = 'block';
    document.querySelector('.loginId').innerHTML = userId;
    document.querySelector('.loginId').style.color = 'red';

}

//退出
document.querySelector('.exitId').onclick = () => {
    localStorage.removeItem('userId');
    document.querySelector('.login-register').style.display = 'block';
    document.querySelector('.login-exit').style.display = 'none';
    location.assign('http://localhost:80/ks/index.html');
}


// Ajax.get('./php/carts.php?fn=getGoodsId', {
//     userId: userId
// }).then(res => {
//     let {
//         stateCode,
//         data
//     } = JSON.parse(res);
//     if (stateCode == 200) {
//         console.log(data);
//         let con = 0
//         data.forEach(ele => {
//             con += ele[num];
//             console.log(num);
//         })
//     }
// })


//二级菜单
let menuArr = document.querySelectorAll('.menu>li');
menuArr.forEach((ele) => {
    ele.addEventListener('mouseenter', function () {
        ele.querySelector('div').style.display = 'block';

    })
    ele.addEventListener('mouseleave', function () {
        ele.querySelector('div').style.display = 'none';
    })
})



//轮播图
$(function () {
    let index = 0;
    $('.banner>ul>li').eq(index).fadeIn(1000).addClass('current');

    $('.arrow-right').click(function () {
        index++;
        if (index == $('.banner>ul>li').length) {
            index = 0
        }
        $('.banner>ul>li').eq(index).fadeIn(1000).addClass('current').siblings().fadeOut(1000).removeClass('current')
    });

    $('.arrow-left').click(function () {
        index--;
        if (index < 0) {
            index = $('.banner>ul>li').length - 1
        }
        $('.banner>ul>li').eq(index).fadeIn(1000).addClass('current').siblings().fadeOut(1000).removeClass('current')
    });

    let times = setInterval(function () {
        $('.arrow-right').click();
    }, 3000)

    $('.banner').mouseenter(function () {
        clearInterval(times);
    });

    $('.banner').mouseleave(function () {
        times = setInterval(function () {
            $('.arrow-right').click();
        }, 3000)
    });
})



//自动轮播
let wrap = document.querySelector('.wrap');
let ulObj = document.querySelector('.wrap ul');
let ulLi = ulObj.children;

let newUl = ulObj.cloneNode(true);
wrap.appendChild(newUl);

let wid = (ulLi[0].offsetWidth + 10) * ulLi.length + 'px'; //获取ul宽度
newUl.style.left = wid; //克隆的ul的位置

var timer = setInterval(sta, 30);


function sta() {
    var ulLeft = ulObj.offsetLeft;
    var newLeft = newUl.offsetLeft;

    ulObj.style.left = ulLeft - 5 + 'px';
    newUl.style.left = newLeft - 5 + 'px';

    //console.log(ulObj.style.left, ulObj.offsetWidth);
    if (parseInt(ulObj.style.left) < -parseInt(wid)) {
        ulObj.style.left = wid;
    }
    if (parseInt(newUl.style.left) < -parseInt(wid)) {
        newUl.style.left = wid;
    }
}

ulObj.addEventListener('mouseenter', pStop);
ulObj.addEventListener('mouseleave', pStart);

newUl.addEventListener('mouseenter', pStop);
newUl.addEventListener('mouseleave', pStart);


function pStop() {
    clearInterval(timer);
}

function pStart() {
    timer = setInterval(sta, 30)
}





// class AutoMove {
//     constructor() {

//         // this.box = document.querySelector('.wrap');
//         //console.log(this.box);
//         this.wrap = document.querySelector('.wrap');
//         this.bindEve(this.wrap, 'mouseenter', this.stop);

//         this.bindEve(this.wrap, 'mouseleave', this.start);

//         this.ulObj = document.querySelector('.wrap ul');
//         this.ulLi = this.ulObj.children;
//         this.newUl = this.ulObj.cloneNode(true);
//         this.wrap.appendChild(this.newUl);
//         this.wid = (this.ulLi[0].offsetWidth + 10) * this.ulLi.length + 'px'; //获取ul宽度
//         this.newUl.style.left = this.wid; //克隆的ul的位置

//         // this.timer = setInterval(this.aaaa(), 30);
//         setInterval(this.aaaa().bind(new AutoMove), 30)
//         //this.move();
//     }

//     bindEve(ele, eve, cb) {
//         ele.addEventListener(eve, cb)
//     }

//     move() {
//         //  console.log(this.wid, this.newUl.style.left);

//         //var time = setInterval(this.aaaa(), 30);

//     }

//     aaaa() {

//         var ulLeft = this.ulObj.offsetLeft;
//         var newLeft = this.newUl.offsetLeft;

//         this.ulObj.style.left = ulLeft - 5 + 'px';
//         this.newUl.style.left = newLeft - 5 + 'px';
//         // console.log(this.newUl.style.left, this.ulObj.style.left);
//         //console.log(ulObj.style.left, ulObj.offsetWidth);
//         if (parseInt(this.ulObj.style.left) < -parseInt(this.wid)) {
//             this.ulObj.style.left = this.wid;
//         }
//         if (parseInt(this.newUl.style.left) < -parseInt(this.wid)) {
//             this.newUl.style.left = this.wid;
//         }
//         console.log(this.ulObj.style.left, this.newUl.style.left);

//     }

//     // stop() {
//     //     console.log(11);
//     //     this.timer = '';
//     //     // clearInterval(this.timer);
//     // }

//     // start() {
//     //     setInterval(this.timer, 30)
//     // }


// }


// new AutoMove;