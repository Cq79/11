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

//显示关闭注册框
$('.ui-DG-close').click(function () {
    // document.querySelector('#ui-login').style.display = 'none';
    $('#ui-login').css({
        display: 'none'
    })
})
$('.register-box').click(function () {
    $('#ui-login').css({
        display: 'block'
    })

})


//注册

function register() {
    let userId = $('#userId').val();
    let pwd = $('#password').val();
    let pwdRe = $('#password-re').val();
    // console.log(pwd);
    let x1, x2, x3 = false;
    let phoneTest = /^1{1}[3-9]{1}[0-9]{9}$/
    let emailTest = /^[a-zA-Z0-9]+@[a-z0-9]+\.[a-z]{2,3}$/
    let pwdTest = /^[a-zA-Z\d]+/
    let res = ''
    // 用户名
    if (phoneTest.test(userId) || emailTest.test(userId)) {
        x1 = true;
        // 密码
        if (pwd.length < 6) {
            res = '密码过短';
            alert(res);
        } else if (pwd.length > 20) {
            res = '密码过长';
            alert(res);
        } else if (pwdTest.test(pwd)) {
            x2 = true;
            if (pwd == pwdRe) {
                x3 = true;
            } else {
                res = '两次密码不一致';
                alert(res);
            }
        } else {
            res = '请重新输入密码';
            alert(res);
        }
    } else {
        res = '请重新输入用户名';
    }

    if (x1 && x2 && x3) {
        Ajax.post('./php/login.php?fn=selectId', {
            userId: userId,
            pwd: pwd
        }).then(res => {
            let {
                stateCode,
                data
            } = JSON.parse(res)
            if (stateCode == 200) {
                // console.log(data);
                if (data.length > 0) {
                    alert('用户名已存在');
                    return;
                } else {
                    Ajax.post('./php/login.php?fn=addUser', {
                        userId: userId,
                        pwd: pwd
                    }).then(res => {
                        //console.log(res);
                        let {
                            stateCode
                        } = JSON.parse(res)
                        //console.log(stateCode);
                        if (stateCode == 200) {
                            alert('注册成功');
                            location.assign('http://localhost:80/ks/login.html');
                        }
                    })
                }
            }
        })
    }
}


//登陆
function loginIn() {
    let userId = $('#loginId').val();
    let pwd = $('#loginPwd').val();
    if (!userId || !pwd) {
        alert('请重新输入');
        return;
    } else {
        // console.log(111);
        Ajax.post('./php/login.php?fn=selectId', {
            userId: userId,
            pwd: pwd
        }).then(res => {
            let {
                stateCode,
                data
            } = JSON.parse(res);
            // console.log(data);
            if (stateCode == 200) {
                // console.log(data.pwd);
                if (data[0].pwd == pwd) {
                    alert('登陆成功');
                    localStorage.setItem('userId', $('#loginId').val());
                    //console.log(localStorage.getItem('uesrId'));
                    location.assign('http://localhost:80/ks/index.html');

                } else {
                    alert('请重新输入');
                    return;
                }

            }
        })
    }
}