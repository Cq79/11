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

/*******获取购物车数据进行渲染*********/

class Cart {
    constructor() {
        //console.log(userId);
        this.list();
        all('.check-all')[0].addEventListener('click', this.checkAll);
        all('.check-all')[1].addEventListener('click', this.checkAll);
    }

    /*********购物车列表**************/
    list() {
        //1 根据登陆状态获取商品id
        let cartGoodsId = '';
        if (userId) { //登陆,从服务器获取
            Ajax.get('./php/carts.php', {
                fn: 'getGoodsId',
                userId: userId
            }).then(res => {
                //console.log(res);
                let {
                    data,
                    stateCode
                } = JSON.parse(res);
                //console.log(data);
                if (stateCode == 200) {
                    if (!data) return;
                    //将id和数量保存为对象
                    let cartIdNum = {};
                    data.forEach(ele => {
                        cartGoodsId += ele.id + ',';
                        cartIdNum[ele.id] = ele.num;
                    });
                    // console.log(cartGoodsId, cartIdNum);
                    //console.log(cartIdNum);
                    // 根据id获取商品信息
                    Cart.getCartGoods(cartGoodsId, cartIdNum);
                }
            })

        } else { //未登录
            alert('请先登陆');
            location.assign('http://localhost:80/ks/login.html');
        }
    }

    /******根据购物车商品id,去购物车获取商品信息*********/
    static getCartGoods(gId, cartIds) {
        //登陆状态从cartIds,未登陆从浏览器获取
        Ajax.post('./php/carts.php?fn=lst', {
            goodsId: gId
            // userId: userId
        }).then(res => {
            // console.log(res);
            let {
                stateCode,
                data
            } = JSON.parse(res);
            //console.log(data);
            let str = '';
            if (stateCode == 200) {
                //console.log(data);
                data.forEach(ele => {
                    // 将数据循环到页面中
                    str += `<tr>
                                <td class="checkbox"><input class="check-one check" type="checkbox"/ onclick="Cart.goodsCheck(this)"></td>
                                <td class="goods"><img src="${ele.src}" alt=""/><span>${ele.name}</span></td>
                                <td class="price">${ele.price}</td>
                                <td class="count">
                                    <span class="reduce" onclick="Cart.reduceGoodsNum(this,${ele.id})">-</span>
                                    <input class="count-input" type="text" value="${cartIds[ele.id]}"/>
                                    <span class="add" onclick="Cart.addGoodsNum(this,${ele.id})">+</span></td>
                                <td class="subtotal">${(ele.price * cartIds[ele.id]).toFixed(2)}</td>
                                <td class="operation"><span class="delete" onclick='Cart.delGoods(this,${ele.id})'>删除</span></td>
                            </tr>`
                })

                $('tbody').innerHTML = str;
            }
        })
    }

    /*********实现全选*********/
    checkAll() {
        //1 一个按钮选中,另一个也选中
        let state = this.checked;
        //console.log(state);
        all('.check-all')[this.getAttribute('all-key')].checked = state;
        //2 让所有商品都选中
        //2-1 获取每个商品复选框
        let checkGoods = all('.check-one');
        //遍历每个商品的单选框设置状态
        checkGoods.forEach(ele => {
            ele.checked = state;
        })
        Cart.cpCount();
    }


    /************单选的实现***********/
    static goodsCheck(eleObj) {
        let state = eleObj.checked;
        // 一件商品取消,全选取消
        if (!state) {
            all('.check-all')[0].checked = false;
            all('.check-all')[1].checked = false;
        } else {
            // 全部选中,全选选中
            //获取所以单选框
            let checkOne = all('.check-one')
            let len = checkOne.length;

            // 计算选中单选框
            let count = 0
            checkOne.forEach(ele => {
                // 单选框选中则数量++
                ele.checked && count++;
            })
            if (count == len) {
                all('.check-all')[0].checked = true;
                all('.check-all')[1].checked = true;
            }
        }

        //计算价格
        Cart.cpCount();
    }

    /***********删除商品*************/
    static delGoods(eleObj, gId) {
        //判断是否登陆
        //  let userId = localStorage.getItem('userId');
        if (userId) { //登陆
            Ajax.get('./php/carts.php', {
                fn: 'delete',
                goodsId: gId,
                userId: userId
            }).then(res => {

            })
        }
        //对应tr删除
        eleObj.parentNode.parentNode.remove();
        Cart.cpCount();

    }


    /************数量增加****************/
    static addGoodsNum(eleObj, gId) {
        let numObj = eleObj.previousElementSibling;
        numObj.value = numObj.value - 0 + 1;
        Cart.update(gId, numObj.value, eleObj);
    }


    /********数量减少*********/
    static reduceGoodsNum(eleObj, gId) {
        let numObj = eleObj.nextElementSibling;
        numObj.value = numObj.value - 1;
        Cart.update(gId, numObj.value, eleObj)
        if (numObj.value == 0) Cart.delGoods(eleObj, gId);

    }

    static update(gId, gNum, eleObj) {
        //  let userId = localStorage.getItem('userId');
        if (userId) { //登陆
            Ajax.get('./php/carts.php', {
                fn: 'update',
                userId: userId,
                goodsId: gId,
                goodsNum: gNum
            }).then(res => {

            })
        }

        //实现小计
        // 小计
        let priceObj = eleObj.parentNode.previousElementSibling;
        eleObj.parentNode.nextElementSibling.innerHTML = (priceObj.innerHTML * gNum).toFixed(2);


        Cart.cpCount();
    }



    /**********价格和数量计算*************/
    static cpCount() {
        //获取页面中所有check-one
        let checkOne = all('.check-one');
        let sumCount = 0;
        let sumXj = 0;
        checkOne.forEach(ele => {
            if (ele.checked) {
                // 找到相应的tr
                let trObj = ele.parentNode.parentNode;
                let count = trObj.getElementsByClassName('count-input')[0].value;
                let xj = trObj.getElementsByClassName('subtotal')[0].innerHTML;
                //console.log(count, xj);
                sumCount = count - 0 + sumCount;
                sumXj = xj - 0 + sumXj;
            }
        })
        //console.log(sumCount, sumXj);
        // 放入页面中
        $('#selectedTotal').innerHTML = sumCount;
        $('#priceTotal').innerHTML = parseInt(sumXj * 100) / 100;
    }

}


new Cart;