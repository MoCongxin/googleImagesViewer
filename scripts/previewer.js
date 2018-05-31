
function addChild(table) {
    // 添加查看图片选项
    table.querySelector("tr").appendChild(document.createElement("td"));
    changeHref(table);
}

function isAddChild(element) {
    // 检测是否添加查看图片选项
    if (element.querySelectorAll("td").length === 5) {
        return true;
    } else {
        return false;
    }
}

function changeHref(table) {
    // 修改图片url    
    divs = document.querySelectorAll("#irc_cc>div"); 
    for (let i=0; i<divs.length; i++){
        if (divs[i]["style"].cssText.indexOf("translate3d(0px, 0px, 0px)") !== -1) { // 检测目前显示的div
            img = divs[i].querySelector("img.irc_mi");
        }
    }
    imgURL = img["src"];
    viewButtom = `<a href=${imgURL} target="_blank"><span>查看图片</span></a>`;
    table.querySelector("tr>td:last-child").innerHTML = viewButtom;
}

handler = function() {
    // 主要逻辑：没添加选项的添加选项，已添加的修改url
    divs = document.querySelectorAll("#irc_cc>.irc_c");
    divs.forEach(function (div) {
        table = div.querySelector("table.irc_but_r");
        if (isAddChild(table)) {
            changeHref(table);
            return;
        } else {
            addChild(table);
        }
    });
}
mainHandle = function (mutations, observe) {
    // 选择目标节点
    observe.disconnect(); //关闭 preCheck 的观察者
    var target1 = document.querySelector('#irc_cc>div:nth-child(1)');
    var target2 = document.querySelector('#irc_cc>div:nth-child(2)');
    var target3 = document.querySelector('#irc_cc>div:nth-child(3)');
    // 创建观察者对象
    var observer1 = new MutationObserver(handler);
    var observer2 = new MutationObserver(handler);
    var observer3 = new MutationObserver(handler);
    // 配置观察选项:
    var config = {childList:true, attributes: true};
    // 传入目标节点和观察选项
    observer1.observe(target1, config);
    observer2.observe(target2, config);
    observer3.observe(target3, config);
    }

preCheck = function () {
    // 加载出搜索结果后执行主要逻辑，仅执行一次
    var target = document.querySelector('#isr_mc')
    var config = {childList:true, subtree:true};
    var observer = new MutationObserver(mainHandle);
    observer.observe(target, config);
}

window.onload = preCheck;