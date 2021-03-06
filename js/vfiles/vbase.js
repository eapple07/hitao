//面向对象原型继承函数
function extend(Child, Parent) {
    var F = function() {};
    F.prototype = Parent.prototype;
    Child.prototype = new F();
    Child.prototype.constructor = Child;
}
//获取元素到浏览器距离
function getPos(obj) {
    var iTop = 0;
    var iLeft = 0;
    while (obj) {
        iTop += obj.offsetTop;
        iLeft += obj.offsetLeft;
        obj = obj.offsetParent;
    }
    return {
        l: iLeft,
        t: iTop
    };
}
//获取最小长度元素
function getShortElement(ele) {
    var iShort = ele[0].offsetHeight;
    var index = 0;
    for (var i = 0; i < ele.length; i++) {
        if (ele[i].offsetHeight < iShort) {
            iShort = ele[i].offsetHeight;
            index = i;
        }
    }
    return index;
}
//ajax:可以请求静态文本， 请求json（轻量级的数据交换格式）字符串   老式的xml（重量级的数据格式）
//回调函数：  和名称没有关系，和用法有关  回调（回头再调）
function ajax(options) {
    //做默认的处理
    var defaults = {
        "method": options.method || "get",
        "url": options.url,
        "data": options.data || "",
        "successFn": options.successFn || null,
        "dataType": options.dataType || ""
    };
    //后端人员经常传大写的数据，将大写转小写
    defaults.method = defaults.method.toLowerCase();
    defaults.dataType = defaults.dataType.toLowerCase();

    var xhr = null;
    try {
        xhr = new XMLHttpRequest();
    } catch (e) {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }

    if (defaults.method == "get" && defaults.data) {
        defaults.url += "?" + defaults.data;
    }
    xhr.open(defaults.method, defaults.url, true);

    if (defaults.method == "post") {
        xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
        xhr.send(defaults.data);
    } else {
        xhr.send();
    }
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                //默认接收回来的是responseText，文本类型
                var data = xhr.responseText;
                //如果是需要json数据，则使用JSON。parse进行解析
                if (defaults.dataType == "json") {
                    data = JSON.parse(data);
                }
                //如果是需要xml的格式，则需要直接返回responseXML
                if (defaults.dataType == "xml") {
                    data = xhr.responseXML;
                }
                //上面通过处理，data已经变为需要的格式了
                if (typeof defaults.successFn == "function") {
                    defaults.successFn(data);
                }
            } else {
                alert("错了，错误码是" + xhr.status);
            }
        }
    };
}
//ajax 1603
function ajax1603(method, url, data, fns, fnf) {
    var xhr = null;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else {
        xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }
    if (method == 'get') {
        url += '?' + data;
    }
    xhr.open(method, url, true);
    if (method == 'post') {
        xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
        xhr.send(data);
    } else {
        xhr.send();
    }
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) //完成
        {
            if (xhr.status == 200) //成功
            {
                if (fns) {
                    fns(xhr.responseText);
                } else {
                    alert('请输入成功回调函数');
                }
            } else {
                if (fnf) {
                    fnf(xhr.responseText);
                } else {
                    alert('error' + xhr.status);
                }
            }
        }
    };
}
//ajax 1602
function ajax1602(url, fnSucc, fnFaild) {
    //1.创建Ajax对象
    var oAjax = null;
    if (window.XMLHttpRequest) {
        //所有现代浏览器 (IE7+、Firefox、Chrome、Safari 以及 Opera) 都内建了 XMLHttpRequest 对象。
        oAjax = new XMLHttpRequest();
    } else {
        /*IE7及以下版本使用*/
        oAjax = new ActiveXObject("Microsoft.XMLHTTP");

    }
    //2.连接服务器
    oAjax.open('GET', url, true);
    //3.发送请求
    oAjax.send();
    //4.接收服务器的返回
    oAjax.onreadystatechange = function() {
        if (oAjax.readyState == 4) //完成
        {
            if (oAjax.status == 200) //成功
            {
                fnSucc(oAjax.responseText);
            } else {
                if (fnFaild)
                    fnFaild(oAjax.status);
            }
        }
    };
}
//获取页面元素函数
function $(selector, parent, tagName) {
    var fristChar = selector.charAt(0);
    parent = parent || document;
    if (fristChar == "#") {
        return document.getElementById(selector.substring(1));
    } else if (fristChar == ".") {
        tagName = tagName || "*";
        var aEle = parent.getElementsByTagName(tagName);
        var result = [];
        var re = new RegExp('\\b' + selector.substring(1) + '\\b', 'i');
        for (var i = 0; i < aEle.length; i++) {
            if (re.test(aEle[i].className)) {
                result.push(aEle[i]);
            }
        }
        return result;
    } else {
        return parent.getElementsByTagName(selector);
    }
}
//
//正则敏感替换函数
function reMg(str, re) {
    var newstr = str.replace(re, function(jk) {
        var temp = '';
        for (var i = 0; i < jk.length; i++) {
            temp += '*';
        }
        return temp;
    });
    return newstr;
}
//碰撞测试函数
function hitTest(obj, obj2) {
    var objL = obj.offsetLeft;
    var objT = obj.offsetTop;
    var objW = obj.offsetWidth;
    var objH = obj.offsetHeight;
    var obj2L = obj2.offsetLeft;
    var obj2T = obj2.offsetTop;
    var obj2W = obj2.offsetWidth;
    var obj2H = obj2.offsetHeight;
    //判断是否碰撞上了
    if (objL + objW < obj2L || objT + objH < obj2T || objL > obj2L + obj2W || objT > obj2T + obj2H) {
        return false;
    } else {
        return true;
    }
}
//排序函数
//选择排序函数
function arrXzpx(a1) {
    for (var i = 0; i < a1.length; i++) {
        var ap = a1[0];
        var index = 0;
        for (var j = 0; j < a1.length - i; j++) {
            if (ap > a1[j]) {
                ap = a1[j];
                index = j;
            }
        }
        var temp = a1[a1.length - 1 - i];
        a1[a1.length - 1 - i] = ap;
        a1[index] = temp;
    }
    return a1;
}
//冒泡排序函数
function arrMppx(arr) {
    var lh = arr.length;
    for (var j = 0; j < lh; j++) {
        for (var i = 0; i < lh - 1 - j; i++) {
            if (arr[i] < arr[i + 1]) {
                var temp = arr[i];
                arr[i] = arr[i + 1];
                arr[i + 1] = temp;
            }
        }
    }
    return arr;
}
//随机排序函数
function arrSjpx(arr) {
    return arr.sort(function() {
        return Math.random() - 0.5;
    });
}
//cookies函数
//获取
function getCookie(key) {
    var str = document.cookie;
    var arr = str.split("; ");
    for (var i = 0; i < arr.length; i++) {
        var newArr = arr[i].split("=");
        if (newArr[0] == key) {
            return decodeURI(newArr[1]);
        }
    }

}
//设置
function setCookie(key, value, t) {
    t = t || 0;
    var mydate = new Date();
    mydate.setDate(mydate.getDate() + t);
    document.cookie = key + "=" + encodeURI(value) + ";expires=" + mydate.toGMTString();
}
//删除
function removeCookie(key) {
    setCookie(key, "", -1);
}
//完美拖拽函数
function drag(obj) {
    var disX, disY; //初始化变量用于获取的固定距离
    //鼠标按下
    obj.onmousedown = function(ev) {
        //做一个事件对象的兼容处理
        ev = ev || event;
        //获取固定距离
        disX = ev.clientX - this.offsetLeft;
        disY = ev.clientY - this.offsetTop;
        //标准浏览器中的取消浏览器默认行为
        ev.preventDefault && ev.preventDefault();
        //IE中的取消默认行为
        ev.returnValue && (ev.returnValue = false);
        //获取全局捕获，得到焦点，达到取消默认行为的目的
        obj.setCapture && obj.setCapture();
        //鼠标移动
        document.onmousemove = function(ev) {
            ev = ev || event;
            //实现obj跟随鼠标
            var x = ev.clientX - disX;
            var y = ev.clientY - disY;
            var maxx = document.documentElement.clientWidth - obj.offsetWidth;
            var maxy = document.documentElement.clientHeight - obj.offsetHeight;
            x = x < 0 ? 0 : x;
            x = x > maxx ? maxx : x;
            y = y < 0 ? 0 : y;
            y = y > maxy ? maxy : y;
            obj.style.left = x + 'px';
            obj.style.top = y + 'px';
        };
        //鼠标弹起
        document.onmouseup = function() {
            document.onmouseup = document.onmousemove = null;
        };
    };
}
//距离函数封装
function view(obj) {
    obj = obj || document;
    return {
        dw: document.documentElement.clientWidth,
        dh: document.documentElement.clientHeight,
        dst: document.body.scrollTop || document.documentElement.scrollTop,
        ch: obj.clientHeight,
        cw: obj.clientWidth,
        cl: obj.clientLeft,
        ct: obj.clientTop,
        ol: obj.offsetLeft,
        ot: obj.offsetTop,
        ow: obj.offsetWidth,
        oh: obj.offsetHeight,
    };
}
//绑定函数
function bind(obj, evName, evFn, isCapture) {
    isCapture = isCapture || false;
    if (obj.addEventListener) {
        obj.addEventListener(evName, evFn, isCapture);
    } else if (obj.attachEvent) {
        obj.attachEvent("on" + evName, function() {
            evFn.call(obj);
        });
    } else {
        obj["on" + evName] = evFn;
    }
}
//不考虑this指向问题的绑定函数
function wtbind(obj, evName, evFn, isCapture) {
    isCapture = isCapture || false;
    if (obj.addEventListener) {
        obj.addEventListener(evName, evFn, isCapture);
    } else if (obj.attachEvent) {
        obj.attachEvent("on" + evName, evFn);
    } else {
        obj["on" + evName] = evFn;
    }
}
//解绑函数
function unbind(obj, evName, evFn, isCapture) {
    isCapture = isCapture || false;
    if (obj.removeEventListener) {
        obj.removeEventListener(evName, evFn, isCapture);
    } else if (obj.detachEvent) {
        obj.detachEvent("on" + evName, evFn);
    } else {
        obj["on" + evName] = null;
    }
}
//添加className;
function addClass(obj, myclassName) {
    if (obj.className === "") {
        obj.className = myclassName;
    } else {
        var arr = obj.className.split(" ");
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] == myclassName) {
                return;
            } else {
                console.log(obj.className);
                obj.className += " " + myclassName;
            }
        }
    }
}
//移除className;
function removeClass(obj, myclassName) {
    if (obj.className !== "") {
        var arr = obj.className.split(" ");
        var _index = arrIndexOf(arr, myclassName);
        if (_index != -1) {
            arr.splice(_index, 1);
            obj.className = arr.join(" ");
        }
    }
}
//查找arr字符函数index;
function arrIndexOf(arr, str, index) {
    if (arguments.length !== 0 && arguments.length != 1) {
        index = index || 0;
        for (var i = index; i < arr.length; i++) {
            if (str == arr[i]) {
                return i;
            }
        }
        return -1;
    } else {
        return "您写的参数不对";
    }
}
//获取字符index函数;
function strfind(str, s) {
    var arr = []; //建立一个空数组，用于存储找到的字符的下标
    var i = 0; //变量用来控制从什么位置开始找
    while (str.indexOf(s, i) != -1) { //如果找到的下标为-1，则代表没有了，结束循环
        var index = str.indexOf(s, i);
        //index是找到的下标
        if (index != -1) {
            arr.push(index); //将该下标存到该数组里面
        }
        i = index + s.length; //让查找位置改为当前找到的下标加上要找的字符长度；
    }
    return arr; //返回该数组
}
//获取css样式兼容函数;
function getStyle(obj, attr) {
    if (obj.currentStyle) {
        return obj.currentStyle[attr];
    } else {
        return window.getComputedStyle(obj, null)[attr];
    }
}
//class获取函数
function getByClass(sClass, obj, tagName) {
    obj = obj || document;
    tagName = tagName || "*";
    var aEle = obj.getElementsByTagName(tagName);
    var result = [];
    var re = new RegExp('\\b' + sClass + '\\b', 'i');
    for (var i = 0; i < aEle.length; i++) {
        if (re.test(aEle[i].className)) {
            result.push(aEle[i]);
        }
    }
    return result;
}
//节点封装兼容函数
//获取第一个元素节点兼容函数
function getFirst(parent) {
    var first = parent.firstElementChild || parent.firstChild;
    if (!first || first.nodeType != 1) {
        return null;
    } else {
        return first;
    }
}
//获取最后一个元素节点兼容函数
function getLast(parent) {
    var last = parent.lastElementChild || parent.lastChild;
    if (!last || last.nodeType != 1) {
        return null;
    } else {
        return last;
    }
}
//获取下一个同级节点兼容函数
function getNext(ele) {
    var next = ele.nextElementSibling || ele.nextSibling;
    if (!next || next.nodeType != 1) {
        return null;
    } else {
        return next;
    }
}
//获取上一个同级节点兼容函数
function getPrev(ele) {
    var prev = ele.previousElementSibling || ele.previousSibling;
    if (!prev || prev.nodeType != 1) {
        return null;
    } else {
        return prev;
    }
}
//索引获取函数
function getIndex(obj) {
    var aBrother = obj.parentNode.children;
    var i = 0;
    for (i = 0; i < aBrother.length; i++) {
        if (aBrother[i] == obj) {
            return i;
        }
    }
}
//运动函数
//匀速运动函数
function move1603(obj, attr, speed, target, callBack) {
    if (obj.timer) return;
    var num = parseFloat(getStyle(obj, attr));
    speed = num > target ? -Math.abs(speed) : Math.abs(speed);
    obj.timer = setInterval(function() {
        num += speed;
        if (speed > 0 && num >= target || speed < 0 && num <= target) {
            num = target;
            clearInterval(obj.timer);
            obj.timer = null; //设置保存定时器的的值为null
            obj.style[attr] = num + "px";
            if (typeof callBack === "function") callBack();
        } else {
            obj.style[attr] = num + "px";
        }
    }, 30);
}
//可控速率缓冲运动函数
function move1602(obj, json, vate, fn) {
    clearInterval(obj.timer); //清除正在执行的定时器
    var iSpeed = 0;
    vate = vate || 6;
    obj.timer = setInterval(function() {
        var bOver = true; //假设运动完成
        for (var attr in json) {
            var iCur = 0;
            if (attr == "opacity") { //透明度
                iCur = Math.round(parseFloat(getStyle(obj, "opacity")) * 100);
            } else {
                iCur = parseInt(getStyle(obj, attr));
            }

            iSpeed = (json[attr] - iCur) / vate; //获取相对速度
            iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed); //上下取整

            if (iCur != json[attr]) {
                bOver = false; //如果某一个属性没有完成运动，关闭按钮
                if (attr == "opacity") {
                    obj.style.filter = 'alpha(opacity:' + iCur + iSpeed + ')';
                    obj.style.opacity = (iCur + iSpeed) / 100;
                } else {
                    obj.style[attr] = iCur + iSpeed + "px";
                }

            }
        }
        //console.log(bOver)
        if (bOver) { //运动完成
            clearInterval(obj.timer);
            if (fn) {
                fn(); //如果有回调函数，执行回调函数
            }

        }
    }, 30);
}

//三参数动函数
function miaovMove(obj, json, fn) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function() {
        var bStop = true; //这一次运动就结束了,所有的值都到达了
        for (var attr in json) {
            //1.取当前的值
            var iCur = 0;
            if (attr == 'opacity') {
                iCur = parseInt(parseFloat(getStyle(obj, attr)) * 100);
            } else {
                iCur = parseInt(getStyle(obj, attr));
            }
            //2.算速度
            var iSpeed = (json[attr] - iCur) / 8;
            iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
            //3.检测停止
            if (iCur != json[attr]) {
                bStop = false;
            }
            if (attr == 'opacity') {
                obj.style.filter = 'alpha(opacity:' + (iCur + iSpeed) + ')';
                obj.style.opacity = (iCur + iSpeed) / 100;
            } else {
                obj.style[attr] = iCur + iSpeed + 'px';
            }
        }
        if (bStop) {
            clearInterval(obj.timer);
            if (fn) {
                fn();
            }
        }
    }, 30);
}
//抛物线运动函数1
function parabola(obj, target, speed, fn) {
    var a = 0.001;
    var dis = 0;
    obj.timer = null;
    var coord = {
        x: target.left - obj.offsetLeft,
        y: target.top - obj.offsetTop,
    }
    var b = (coord.y - a * coord.x * coord.x) / coord.x;
    var yuandian = {
        left: obj.offsetLeft,
        top: obj.offsetTop
    }
    obj.timer = setInterval(function() {
        dis += speed;
        obj.style.left = yuandian.left + dis + "px";
        obj.style.top = yuandian.top + a * dis * dis + b * dis + "px";
        if (dis >= coord.x) {
            clearInterval(obj.timer);
            obj.style.left = target.x + "px";
            obj.style.top = target.y + "px";
            fn && fn();
        }
    }, 30);
}
//抛物线运动函数2
function curveMove(obj, target, speed, fn) {
    var a = 0.003;
    var dis = 0;
    obj.timer = null;
    //相对的坐标
    var coord = {
        x: target.left - obj.offsetLeft,
        y: target.top - obj.offsetTop,
    };
    //求b系数
    //var b= (y-ax2)/x;
    var b = (coord.y - a * coord.x * coord.x) / coord.x;
    var yuandian = {
        left: obj.offsetLeft,
        top: obj.offsetTop
    };
    obj.timer = setInterval(function() {
        dis += speed;
        obj.style.left = yuandian.left + dis + "px";
        obj.style.top = yuandian.top + a * dis * dis + b * dis + "px";
        if (dis >= coord.x) {
            clearInterval(obj.timer);
            obj.style.left = target.x + "px";
            obj.style.top = target.y + "px";
            if (fn) {
                fn();
            }
        }
    }, 30);
}
//抖动函数
function shake(obj, direction, fudu, rate, fn) {
    if (obj.timer) return;
    var init = parseInt(getStyle(obj, direction));
    var arr = [];
    var num = 0;
    fudu = fudu || 10;
    rate = rate || 1;
    for (var i = fudu; i > 0; i -= rate) {
        arr.push(i, -i);
    }
    arr.push(0);
    obj.timer = setInterval(function() {
        obj.style[direction] = init + arr[num] + 'px';
        num++;
        if (num > arr.length - 1) {
            clearInterval(obj.timer);
            obj.timer = null;
            if (fn) fn();
        }
    }, 30);
}
//1603运动函数详解
function startMove(obj, json, endFn) {
    //设置iCur变量为当前的位置
    var iCur = 0;
    //定义一个速度变量
    var speed = 0;
    //清除定时器
    clearInterval(obj.timer);
    //开启定时器
    obj.timer = setInterval(function() {
        //设置一个开关为真
        var onOff = true;
        //遍历json
        for (var attr in json) {
            //如果当前的属性名是透明度
            if (attr == "opacity") {
                //通过这个方式获取当前的透明度值，乘以100，转成整数进行计算，（小数有精度问题）
                iCur = Math.round(getStyle(obj, "opacity") * 100);
            } else {
                //正常的其他属性，通过这种方式直接获取
                iCur = parseInt(getStyle(obj, attr));
            }
            //要运动的目标点，找对应json里面的属性值
            var target = json[attr];
            //让速度等于目标点位置减去当前的位置除以8，得到一个每次变化的值
            //这个值越来越小，逐渐接近目标点
            speed = (target - iCur) / 8;
            //因为小数的js计算关系，无法到达目标点，所以处理一下取整的问题
            speed = (target - iCur) > 0 ? Math.ceil(speed) : Math.floor(speed);
            //如果当前值不等于目标点
            if (iCur != target) {
                //把开关改为假
                onOff = false;
                //如果当前属性等于透明度
                if (attr == "opacity") {
                    //将变化后的值，赋给obj对象对应的透明度，（IE下透明度实现写法不一样）
                    obj.style.opacity = (iCur + speed) / 100;
                    obj.style.filter = "alpha(opacity=" + iCur + speed + ")";
                } else {
                    //否则按照常规的属性赋值方式给回去
                    obj.style[attr] = iCur + speed + "px";
                }
            }
        }
        //每一次循环完毕后，开关是否为真
        if (onOff) {
            //如果为真，清楚定时器
            clearInterval(obj.timer);
            endFn && endFn();
        }
    }, 30);
}

/**********************************************时间函数***************************************/
//---------------------------------------------------
// 判断闰年
//---------------------------------------------------
Date.prototype.isLeapYear = function() {
    return (0 == this.getYear() % 4 && ((this.getYear() % 100 != 0) || (this.getYear() % 400 == 0)));
}

//---------------------------------------------------
// 日期格式化
// 格式 YYYY/yyyy/YY/yy 表示年份
// MM/M 月份
// W/w 星期
// dd/DD/d/D 日期
// hh/HH/h/H 时间
// mm/m 分钟
// ss/SS/s/S 秒
//---------------------------------------------------
Date.prototype.Format = function(formatStr) {
    var str = formatStr;
    var Week = ['日', '一', '二', '三', '四', '五', '六'];

    str = str.replace(/yyyy|YYYY/, this.getFullYear());
    str = str.replace(/yy|YY/, (this.getYear() % 100) > 9 ? (this.getYear() % 100).toString() : '0' + (this.getYear() % 100));

    str = str.replace(/MM/, this.getMonth() > 9 ? this.getMonth().toString() : '0' + this.getMonth());
    str = str.replace(/M/g, this.getMonth());

    str = str.replace(/w|W/g, Week[this.getDay()]);

    str = str.replace(/dd|DD/, this.getDate() > 9 ? this.getDate().toString() : '0' + this.getDate());
    str = str.replace(/d|D/g, this.getDate());

    str = str.replace(/hh|HH/, this.getHours() > 9 ? this.getHours().toString() : '0' + this.getHours());
    str = str.replace(/h|H/g, this.getHours());
    str = str.replace(/mm/, this.getMinutes() > 9 ? this.getMinutes().toString() : '0' + this.getMinutes());
    str = str.replace(/m/g, this.getMinutes());

    str = str.replace(/ss|SS/, this.getSeconds() > 9 ? this.getSeconds().toString() : '0' + this.getSeconds());
    str = str.replace(/s|S/g, this.getSeconds());

    return str;
}

//+---------------------------------------------------
//| 求两个时间的天数差 日期格式为 YYYY-MM-dd
//+---------------------------------------------------
function daysBetween(DateOne, DateTwo) {
    var OneMonth = DateOne.substring(5, DateOne.lastIndexOf('-'));
    var OneDay = DateOne.substring(DateOne.length, DateOne.lastIndexOf('-') + 1);
    var OneYear = DateOne.substring(0, DateOne.indexOf('-'));

    var TwoMonth = DateTwo.substring(5, DateTwo.lastIndexOf('-'));
    var TwoDay = DateTwo.substring(DateTwo.length, DateTwo.lastIndexOf('-') + 1);
    var TwoYear = DateTwo.substring(0, DateTwo.indexOf('-'));

    var cha = ((Date.parse(OneMonth + '/' + OneDay + '/' + OneYear) - Date.parse(TwoMonth + '/' + TwoDay + '/' + TwoYear)) / 86400000);
    return Math.abs(cha);
}


//+---------------------------------------------------
//| 日期计算
//+---------------------------------------------------
Date.prototype.DateAdd = function(strInterval, Number) {
    var dtTmp = this;
    switch (strInterval) {
        case 's':
            return new Date(Date.parse(dtTmp) + (1000 * Number));
        case 'n':
            return new Date(Date.parse(dtTmp) + (60000 * Number));
        case 'h':
            return new Date(Date.parse(dtTmp) + (3600000 * Number));
        case 'd':
            return new Date(Date.parse(dtTmp) + (86400000 * Number));
        case 'w':
            return new Date(Date.parse(dtTmp) + ((86400000 * 7) * Number));
        case 'q':
            return new Date(dtTmp.getFullYear(), (dtTmp.getMonth()) + Number * 3, dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());
        case 'm':
            return new Date(dtTmp.getFullYear(), (dtTmp.getMonth()) + Number, dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());
        case 'y':
            return new Date((dtTmp.getFullYear() + Number), dtTmp.getMonth(), dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());
    }
}

//+---------------------------------------------------
//| 比较日期差 dtEnd 格式为日期型或者 有效日期格式字符串
//+---------------------------------------------------
Date.prototype.DateDiff = function(strInterval, dtEnd) {
    var dtStart = this;
    if (typeof dtEnd == 'string') //如果是字符串转换为日期型
    {
        dtEnd = StringToDate(dtEnd);
    }
    switch (strInterval) {
        case 's':
            return parseInt((dtEnd - dtStart) / 1000);
        case 'n':
            return parseInt((dtEnd - dtStart) / 60000);
        case 'h':
            return parseInt((dtEnd - dtStart) / 3600000);
        case 'd':
            return parseInt((dtEnd - dtStart) / 86400000);
        case 'w':
            return parseInt((dtEnd - dtStart) / (86400000 * 7));
        case 'm':
            return (dtEnd.getMonth() + 1) + ((dtEnd.getFullYear() - dtStart.getFullYear()) * 12) - (dtStart.getMonth() + 1);
        case 'y':
            return dtEnd.getFullYear() - dtStart.getFullYear();
    }
}

//+---------------------------------------------------
//| 日期输出字符串，重载了系统的toString方法
//+---------------------------------------------------
Date.prototype.toString = function(showWeek) {
    var myDate = this;
    var str = myDate.toLocaleDateString();
    if (showWeek) {
        var Week = ['日', '一', '二', '三', '四', '五', '六'];
        str += ' 星期' + Week[myDate.getDay()];
    }
    return str;
}

//+---------------------------------------------------
//| 日期合法性验证
//| 格式为：YYYY-MM-DD或YYYY/MM/DD
//+---------------------------------------------------
function IsValidDate(DateStr) {
    var sDate = DateStr.replace(/(^\s+|\s+$)/g, ''); //去两边空格;
    if (sDate == '') return true;
    //如果格式满足YYYY-(/)MM-(/)DD或YYYY-(/)M-(/)DD或YYYY-(/)M-(/)D或YYYY-(/)MM-(/)D就替换为''
    //数据库中，合法日期可以是:YYYY-MM/DD(2003-3/21),数据库会自动转换为YYYY-MM-DD格式
    var s = sDate.replace(/[\d]{ 4,4 }[\-/]{ 1 }[\d]{ 1,2 }[\-/]{ 1 }[\d]{ 1,2 }/g, '');
    if (s == '') //说明格式满足YYYY-MM-DD或YYYY-M-DD或YYYY-M-D或YYYY-MM-D
    {
        var t = new Date(sDate.replace(/\-/g, '/'));
        var ar = sDate.split(/[-/:]/);
        if (ar[0] != t.getYear() || ar[1] != t.getMonth() + 1 || ar[2] != t.getDate()) {
            //alert('错误的日期格式！格式为：YYYY-MM-DD或YYYY/MM/DD。注意闰年。');
            return false;
        }
    } else {
        //alert('错误的日期格式！格式为：YYYY-MM-DD或YYYY/MM/DD。注意闰年。');
        return false;
    }
    return true;
}

//+---------------------------------------------------
//| 日期时间检查
//| 格式为：YYYY-MM-DD HH:MM:SS
//+---------------------------------------------------
function CheckDateTime(str) {
    var reg = /^(\d+)-(\d{ 1,2 })-(\d{ 1,2 }) (\d{ 1,2 }):(\d{ 1,2 }):(\d{ 1,2 })$/;
    var r = str.match(reg);
    if (r == null) return false;
    r[2] = r[2] - 1;
    var d = new Date(r[1], r[2], r[3], r[4], r[5], r[6]);
    if (d.getFullYear() != r[1]) return false;
    if (d.getMonth() != r[2]) return false;
    if (d.getDate() != r[3]) return false;
    if (d.getHours() != r[4]) return false;
    if (d.getMinutes() != r[5]) return false;
    if (d.getSeconds() != r[6]) return false;
    return true;
}

//+---------------------------------------------------
//| 把日期分割成数组
//+---------------------------------------------------
Date.prototype.toArray = function() {
    var myDate = this;
    var myArray = Array();
    myArray[0] = myDate.getFullYear();
    myArray[1] = myDate.getMonth();
    myArray[2] = myDate.getDate();
    myArray[3] = myDate.getHours();
    myArray[4] = myDate.getMinutes();
    myArray[5] = myDate.getSeconds();
    return myArray;
}

//+---------------------------------------------------
//| 取得日期数据信息
//| 参数 interval 表示数据类型
//| y 年 m月 d日 w星期 ww周 h时 n分 s秒
//+---------------------------------------------------
Date.prototype.DatePart = function(interval) {
    var myDate = this;
    var partStr = '';
    var Week = ['日', '一', '二', '三', '四', '五', '六'];
    switch (interval) {
        case 'y':
            partStr = myDate.getFullYear();
            break;
        case 'm':
            partStr = myDate.getMonth() + 1;
            break;
        case 'd':
            partStr = myDate.getDate();
            break;
        case 'w':
            partStr = Week[myDate.getDay()];
            break;
        case 'ww':
            partStr = myDate.WeekNumOfYear();
            break;
        case 'h':
            partStr = myDate.getHours();
            break;
        case 'n':
            partStr = myDate.getMinutes();
            break;
        case 's':
            partStr = myDate.getSeconds();
            break;
    }
    return partStr;
}

//+---------------------------------------------------
//| 取得当前日期所在月的最大天数
//+---------------------------------------------------
Date.prototype.MaxDayOfDate = function() {
    var myDate = this;
    var ary = myDate.toArray();
    var date1 = (new Date(ary[0], ary[1] + 1, 1));
    var date2 = date1.dateAdd(1, 'm', 1);
    var result = dateDiff(date1.Format('yyyy-MM-dd'), date2.Format('yyyy-MM-dd'));
    return result;
}

//+---------------------------------------------------
//| 取得当前日期所在周是一年中的第几周
//+---------------------------------------------------
Date.prototype.WeekNumOfYear = function() {
    var myDate = this;
    var ary = myDate.toArray();
    var year = ary[0];
    var month = ary[1] + 1;
    var day = ary[2];
    document.write('< script language=VBScript\> \n');
    document.write('myDate = DateValue('
        '+month+' - '+day+' - '+year+'
        ') \n');
    document.write('result = DatePart('
        ww ', myDate) \n');
    document.write(' \n');
    return result;
}

//+---------------------------------------------------
//| 字符串转成日期类型
//| 格式 MM/dd/YYYY MM-dd-YYYY YYYY/MM/dd YYYY-MM-dd
//+---------------------------------------------------
function StringToDate(DateStr) {

    var converted = Date.parse(DateStr);
    var myDate = new Date(converted);
    if (isNaN(myDate)) {
        //var delimCahar = DateStr.indexOf('/')!=-1?'/':'-';
        var arys = DateStr.split('-');
        myDate = new Date(arys[0], --arys[1], arys[2]);
    }
    return myDate;
}
/**************************************json*************************************************/
//常用正则json
var jsonRegExp = {
    qq: /^[1-9]\d{4-11}$/,
    hz: /[\u4e00-\u9fa5]/,
    sw: /^\s*|\s*$/,
    email: /^\w+@[a-z0-9]+(\.[a-z]+){1,3}$/,
    yzbm: /^[1-9]\d{5}$/,
    sfz: /^[1-9]\d{14}$|^[1-9]\d{17}$|[1-9]\d{16}x$/,
};
