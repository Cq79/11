//懒加载
function getGoods() {
    Ajax.get('./php/goods.php', {
        fn: 'lst'
    }).then(res => {
        let {
            stateCode,
            data
        } = JSON.parse(res);
        if (stateCode == 200) {
            var str = '';
            data.forEach(ele => {
                str += `<li class="goodsCon">
                                 <a target = "_blank" onclick="more(${ele.id})">
                                    <img src="${ele.src}" class="icon">
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

            $('.divs').innerHTML += str;
        }
    })
}
getGoods();

window.onscroll = function () {

    var liArr = all('.divs li');
    console.log(liArr);
    var goodsTop = offsetTop1(liArr[liArr.length - 1]);
    //console.log(goodsTop);
    //var goodsTop = liArr[liArr.length - 1].offsetTop;
    // console.log(liArr[liArr.length - 1]);
    var sTop = getStop();
    var cTop = getCtop();

    if (goodsTop < (sTop + cTop)) {
        getGoods();
        //  console.log(111);
    }

}
//获取滚动条高度
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