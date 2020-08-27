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
    location.assign('http://localhost:80/ks/index.html')
}

// 绑定商品id
let str = location.search.slice(4);
//根据id渲染页面
class getGoods {
    constructor() {
        this.lst()
    }
    lst() {
        // console.log(str);
        Ajax.post('./php/product.php?fn=lst', {
            goodsId: str
        }).then(res => {
            //console.log(res);
            let {
                stateCode,
                data
            } = JSON.parse(res);
            //console.log(res);
            if (stateCode == 200) {

                $('.jqzoom img')[0].src = data[0].src;
                $('.jqzoom img')[1].src = data[0].src;
                $('#pro-tit').text(data[0].name);
                $('.showprice').text(data[0].price);
                $('.marketprice').text(data[0].price);
                $('.pronumber').val(data[0].num)
                //console.log($('.pro-list img'));
                $('.pro-list img').each((key, ele) => {
                    // /console.log(ele);
                    ele.src = data[0].src;
                })
            }
        })
    }
}
new getGoods;


//给btn绑定事件,加入购物车
class getCarts {
    constructor() {
        // 增加事件
        this.psBtn = document.querySelector('.numberplus');
        this.bindEve(this.psBtn, 'click', this.psNum.bind(this));

        //减少事件
        this.msBtn = document.querySelector('.numberminus');
        this.bindEve(this.msBtn, 'click', this.msNum.bind(this));

        this.num = document.querySelector('.pronumber');
        //console.log(this.num.value);

        //加入购物车
        this.gwcBtn = document.querySelector('.addstore');
        this.bindEve(this.gwcBtn, 'click', this.addstore);

        //直接购买
        this.buyBtn = document.querySelector('.msbuy');
        this.bindEve(this.buyBtn, 'click', this.addstore);


    }
    bindEve(ele, eve, cb) {
        ele.addEventListener(eve, cb);
    }
    //增加
    psNum() {
        //console.log(this.num.value);
        this.num.value = this.num.value - 0 + 1;
    }
    //减少
    msNum() {
        this.num.value = this.num.value - 1;
        if (this.num.value < 1) this.num.value = 1;
    }

    // 添加购物车
    addstore() {
        let goodsNum = document.querySelector('.pronumber').value;
        let userId = localStorage.getItem('userId');
        if (!userId) {
            alert('请先登陆');
            location.assign('http://localhost:80/ks/login.html');
        }


        Ajax.post('./php/product.php?fn=add', {
            userId: userId,
            gNum: goodsNum,
            gId: str
        }).then(res => {
            let {
                stateCode
            } = JSON.parse(res);
            if (stateCode == 200) {
                location.assign('http://localhost:80/ks/carts.html');
            }
        })
    }

}

new getCarts;


// 放大镜
class bigGoods {
    constructor() {
        // 绑定移入移出移动事件
        this.jqzoom = document.querySelector('.jqzoom');
        this.bindEve(this.jqzoom, 'mouseenter', this.block.bind(this));
        this.bindEve(this.jqzoom, 'mouseleave', this.none.bind(this));

        this.szoom = document.querySelector('.szoom');
        this.bindEve(this.szoom, 'mousemove', this.move.bind(this));

        this.bzoom = document.querySelector('.bzoom');

        this.bigImg = document.querySelector('.bigImg');

    }
    bindEve(ele, eve, cb) {
        ele.addEventListener(eve, cb)
    }

    block() {
        this.szoom.style.display = 'block';
        this.bzoom.style.display = 'block';
    }

    none() {
        this.szoom.style.display = 'none';
        this.bzoom.style.display = 'none';
    }

    move(e) {
        e = e || window.event;
        let left = e.pageX - this.jqzoom.offsetLeft - this.szoom.offsetWidth / 2;
        let top = e.pageY - this.jqzoom.offsetTop - this.szoom.offsetHeight / 2;
        //console.log(left, top);
        //console.log(this.szoom);

        //判断边界
        if (left < 0) left = 0;
        if (top < 0) top = 0;
        if (left > this.jqzoom.offsetWidth - this.szoom.offsetWidth) {
            left = this.jqzoom.offsetWidth - this.szoom.offsetWidth
        }
        if (top > this.jqzoom.offsetHeight - this.szoom.offsetHeight) {
            top = this.jqzoom.offsetHeight - this.szoom.offsetHeight
        }

        this.szoom.style.left = left + 'px';
        this.szoom.style.top = top + 'px';
        // console.log(this.szoom.style.left, this.szoom.style.top);

        let bleft = this.bigImg.offsetWidth - this.bzoom.offsetWidth;
        let btop = this.bigImg.offsetHeight - this.bzoom.offsetHeight;

        let imgX = left / (this.jqzoom.offsetWidth - this.szoom.offsetWidth) * bleft;
        let imgY = top / (this.jqzoom.offsetHeight - this.szoom.offsetHeight) * btop;

        // console.log(bleft, btop, imgX, imgY);
        this.bigImg.style.left = -imgX + 'px';
        this.bigImg.style.top = -imgY + 'px';
        //console.log(this.bigImg.style.left, this.bigImg.style.top);
    }

}

new bigGoods;



//选中小图
function changePic(ele) {
    $(ele).addClass('current');
    $($(ele).siblings()).removeClass('current');
}