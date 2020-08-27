//懒加载
// getGoods();

// function getGoods() {
//     Ajax.get('./php/goods.php', {
//         fn: 'lst',
//         pageNow: 1
//     }).then(res => {
//         let {
//             stateCode,
//             data,
//             pageCou
//         } = JSON.parse(res);
//         // console.log(res);
//         if (stateCode == 200) {
//             var str = '';
//             data.forEach(ele => {
//                 str += `<li class="goodsCon">
//                                  <a target = "_blank" onclick="more(${ele.id})">
//                                     <img mainSrc="${ele.src}" src="" class="icon">
//                                     <h4 class="title">${ele.name}</h4>
//                                     <div class="info">限时抢购200件</div>
//                                 </a>
//                                 <div class="priceCon">
//                                     <span class="price">￥${ele.price}</span>
//                                     <span class="oldPrice">￥${(ele.price * 1.2).toFixed(2)}</span>
//                                     <div>
//                                         <span class="soldText">已售${ele.num}%</span>
//                                         <span class="soldSpan">
//                                             <span style="width: 87.12px;"></span>
//                                         </span>
//                                     </div>
//                                     <a class="button" target="_blank" onclick="Goods.addCart(${ele.id},1)">立即抢购</a>
//                                 </div>
//                             </li >`;
//             });

//             document.querySelector('.divs').innerHTML = str;

//             let pageStr = '';
//             for (var i = 1; i <= pageCou; i++) {
//                 pageStr += `<li><a href="#" onclick="getGoods(${i})">${i}</a></li>`
//             }
//             document.querySelector('.lst').innerHTML += pageStr

//         }

//     })
// }

class GetGoods {
    constructor() {
        GetGoods.getGoods();
    }
    static getGoods(tmp = 1) {
        {
            Ajax.get('./php/goods.php', {
                fn: 'lst',
                pageNow: tmp
            }).then(res => {
                let {
                    stateCode,
                    data,
                    pageCou
                } = JSON.parse(res);
                // console.log(res);
                if (stateCode == 200) {
                    var str = '';
                    data.forEach(ele => {
                        str += `<li class="goodsCon">
                                         <a target = "_blank" onclick="more(${ele.id})">
                                            <img mainSrc="${ele.src}" src="" class="icon">
                                            <h4 class="title">${ele.name}</h4>
                                            <div class="info">限时抢购200件</div>
                                        </a>
                                        <div class="priceCon">
                                            <span class="price">￥${ele.price}</span>
                                            <span class="oldPrice">￥${(ele.price * 1.2).toFixed(2)}</span>
                                            <div>
                                                <span class="soldText">已售${ele.num}%</span>
                                                <span class="soldSpan">
                                                    <span style="width: 87.12px;"></span>
                                                </span>
                                            </div>
                                            <a class="button" target="_blank" onclick="Goods.addCart(${ele.id},1)">立即抢购</a>
                                        </div>
                                    </li >`;
                    });

                    document.querySelector('.divs').innerHTML = str;

                    let pageStr = '';
                    for (var i = 1; i <= pageCou; i++) {
                        pageStr += `<li><a href="#" onclick="GetGoods.getGoods(${i})">${i}</a></li>`
                    }
                    document.querySelector('.lst').innerHTML = pageStr

                }

            })
        }
    }
}

new GetGoods;

function loadIn() {

    var liArr = document.querySelectorAll('.divs li');

    var sTop = getStop();
    var cTop = getCtop();
    for (var i = 0; i < liArr.length; i++) {

        if (offsetTop1(liArr[i]) < (sTop + cTop)) {
            //  console.log(liArr[i].offsetTop);
            (function (i) {
                liArr[i].querySelector('img').src = liArr[i].querySelector('img').getAttribute('mainSrc');
            })(i)
        }
    }

}
loadIn();
window.onscroll = function load() {

    var liArr = document.querySelectorAll('.divs li');
    var sTop = getStop();
    var cTop = getCtop();
    for (var i = 0; i < liArr.length; i++) {

        if (offsetTop1(liArr[i]) < (sTop + cTop)) {
            //console.log(liArr[i].offsetTop);
            (function (i) {
                setTimeout(function () {

                    liArr[i].querySelector('img').src = liArr[i].querySelector('img').getAttribute('mainSrc');

                }, 1000)
            })(i)
        }
    }

}

// load();//获取滚动条高度
function getStop() {
    return document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop

}

//获取可视窗口高度
function getCtop() {
    return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
}


function more(id) {
    location.assign('http://localhost:80/ks/productDetail.html?id=' + id)
}

function offsetTop1(obj) {
    var t = obj.offsetTop;
    while (obj.offsetparent) {
        obj = obj.offsetparent;
        obj = obj.offsetparent;
        t = t + obj.offsetTop;
    }
    return t;
}


//小火箭
$(function () {
    $(window).scroll(function () {
        let top = $(window).scrollTop();
        if (top > 800) {
            $('.actGotop').fadeIn(1000);
        } else {
            $('.actGotop').fadeOut(1000);
        }
    })

    $('.actGotop').click(function () {
        $('html,body').animate({
            scrollTop: 0
        }, 1000)
    })
})



//