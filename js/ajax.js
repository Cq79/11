class Ajax {
    static get(url, obj) {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            let str = '';
            if (obj) {
                for (let attr in obj) {
                    str += `${attr}=${obj[attr]}&`;
                }
            }
            xhr.open('get', url + '?' + str);
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        // console.log(111);
                        resolve(xhr.response);
                        // resolve(1111)
                    } else {
                        reject('error')
                    }
                }
            }
            xhr.send()
        })

    }

    static post(url, obj) {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            let str = '';
            if (obj) {
                for (let attr in obj) {
                    str += `${attr}=${obj[attr]}&`;
                }
            }
            xhr.open('post', url);
            xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded')
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {

                        resolve(xhr.response);
                    } else {
                        reject('error')
                    }
                }
            }
            xhr.send(str);
        })
    }

}



