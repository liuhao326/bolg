<script type="text/javascript">
/*
    功能：生成博客目录的JS工具
    测试：IE8，火狐，google测试通过
    孤傲苍狼
    2014-5-11
*/
var BlogDirectory = {
    /*
        获取元素位置，距浏览器左边界的距离（left）和距浏览器上边界的距离（top）
    */
    getElementPosition:function (ele) {        
        var topPosition = 0;
        var leftPosition = 0;
        while (ele){              
            topPosition += ele.offsetTop;
            leftPosition += ele.offsetLeft;        
            ele = ele.offsetParent;     
        }  
        return {top:topPosition, left:leftPosition}; 
    },

    /*
    获取滚动条当前位置
    */
    getScrollBarPosition:function () {
        var scrollBarPosition = document.body.scrollTop || document.documentElement.scrollTop;
        return  scrollBarPosition;
    },
    
    /*
    移动滚动条，finalPos 为目的位置，internal 为移动速度
    */
    moveScrollBar:function(finalpos, interval) {

        //若不支持此方法，则退出
        if(!window.scrollTo) {
            return false;
        }

        //窗体滚动时，禁用鼠标滚轮
        window.onmousewheel = function(){
            return false;
        };
          
        //清除计时
        if (document.body.movement) { 
            clearTimeout(document.body.movement); 
        } 
		
		//获取滚动条当前位置currentpos
        var currentpos =BlogDirectory.getScrollBarPosition();

        var dist = 0; 
        if (currentpos == finalpos) {//若已到达预定位置，则解禁鼠标滚轮，并退出
            window.onmousewheel = function(){
                return true;
            }
            return true; 
        } 
		
		/*未到达，则计算**下一步**所要移动的距离，其中除以10表明移动分十步完成*/
        if (currentpos < finalpos) {
			//Math.ceil() 函数返回大于或等于一个给定数字的最小整数。
            dist = Math.ceil((finalpos - currentpos)/15); 
            currentpos += dist; 
        } 
        if (currentpos > finalpos) { 
            dist = Math.ceil((currentpos - finalpos)/15); 
            currentpos -= dist; 
        }
        
		//获取滚动条当前位置scrTop
        var scrTop = BlogDirectory.getScrollBarPosition();
		//移动一步窗口
        window.scrollTo(0, currentpos);
		/*移动完上一步以后若已到底部（即已移动到锚点位置）， 则解禁鼠标滚轮，并退出*/
        if(BlogDirectory.getScrollBarPosition() == scrTop)
        {
            window.onmousewheel = function(){
                return true;
            }
            return true;
        }
        
        /*如果没有到达锚点位置，则进行**下一步**移动*/
        var repeat = "BlogDirectory.moveScrollBar(" + finalpos + "," + interval + ")"; 	//setTimeout()方法设置一个定时器，该定时器在定时器到期后执行一个函数或指定的一段代码。
		//返回值timeoutID是一个正整数， 表示定时器的编号。这个值可以传递给clearTimeout()来取消该定时器。
		//返回值赋值给当前文档中<body>元素或<frameset>元素的movement值
        document.body.movement = setTimeout(repeat, interval); 
    },
    
    htmlDecode:function (text){
		//创建div元素temp
        var temp = document.createElement("div");
		//添加文本元素到temp中
        temp.innerHTML = text;
		//将div元素temp的innerText或textContent赋值给output
		//innerText 属性表示一个节点及其后代的“渲染”文本内容。
		//innerText 很容易与Node.textContent混淆, 但这两个属性间实际上有很重要的区别. 大体来说, innerText 可操作已被渲染的内容， 而 textContent 则不会.
		//innerHTML指的是从对象的起始位置到终止位置的全部内容,包括Html标签。innerText指的是从起始位置到终止位置的内容,但它去除Html标签。innerHTML 是所有浏览器都支持的，innerText 是IE浏览器和chrome 浏览器支持的，Firefox浏览器不支持。
        var output = temp.innerText || temp.textContent;
        temp = null;
		//返回output
        return output;
    },

    /*
    创建博客目录，
    id表示包含博文正文的 div 容器的 id，
    mt 和 st 分别表示主标题和次级标题的标签名称（如 H2、H3，大写或小写都可以！），
    interval 表示移动的速度
    */
    createBlogDirectory:function (id, mt, st, interval){
        //获取博文正文div容器
        var elem = document.getElementById(id);
		//获取博文正文div容器失败则返回
        if(!elem) return false;
        //获取正文div中的所有元素节点
        var nodes = elem.getElementsByTagName("*");
        //创建整个博客目录的div容器divSideBar
        var divSideBar = document.createElement('DIV');
		//设置博客目录div容器divSideBar的className为uprightsideBar
        divSideBar.className = 'uprightsideBar';
		//设置博客目录div容器divSideBar的id为uprightsideBar
        divSideBar.setAttribute('id', 'uprightsideBar');
		//创建divSideBar下即将包含一个<h2>标签的div容器divSideBarTab
        var divSideBarTab = document.createElement('DIV');
		//将divSideBarTap的id设置为sideBarTab
        divSideBarTab.setAttribute('id', 'sideBarTab');
		//将divSideBarTap加入博客目录div容器divSideBar的子元素列表
        divSideBar.appendChild(divSideBarTab);
		//创建一个即将包含在divSideBarTap中的<h2>元素
        var h2 = document.createElement('H2');
		//将上面创建的<h2>元素设置为divSideBarTab的子元素
        divSideBarTab.appendChild(h2);
		//创建文本节点txt用于显示“目录”
        var txt = document.createTextNode('目录');
		//将文本节点txt添加到<h2>内部
        h2.appendChild(txt);
		//创建目录内容的div容器divSideBarContents
        var divSideBarContents = document.createElement('DIV');
		//容器divSideBarContents设置为不展示
        divSideBarContents.style.display = 'none';
		//将div容器divSideBarContents的id设置为sideBarContents
        divSideBarContents.setAttribute('id', 'sideBarContents');
		//将div容器添加到最外围的div容器divSideBar中
        divSideBar.appendChild(divSideBarContents);
        //创建自定义列表dlist（目录内容的外围容器，一个<d1>标签）
        var dlist = document.createElement("dl");//将dlist（目录内容容器）设置为divSideBarContents（目录内容的div容器）的子元素
        divSideBarContents.appendChild(dlist);
        var num = 0;//统计找到的mt和st（统计<h2><h3>标题数）
        mt = mt.toUpperCase();//转化成大写方便创建元素
        st = st.toUpperCase();//转化成大写方便创建元素
        //遍历正文div elem中的所有元素节点
        for(var i=0; i<nodes.length; i++)
        {
			//判断节点名是不是H2或H3（是不是我们所要找的标题）
            if(nodes[i].nodeName == mt|| nodes[i].nodeName == st)    
            {
                //将标签替换为空字符，获取标题内的文本
                var nodetext = nodes[i].innerHTML.replace(/<\/?[^>]+>/g,"");
				//不区分大小写模式全局替换掉" "（空格）
                nodetext = nodetext.replace(/ /ig, "");
				//对得到的nodetext进行处理
                nodetext = BlogDirectory.htmlDecode(nodetext);
                //插入锚，可就是给正文标题处(<h2>或<h3>)设置id        
                nodes[i].setAttribute("id", "blogTitle" + num);
				//创建作为目录实际内容的文本对象
                var item;
				//判断标题节点种类(<h2>或<h3>，也就是H2或H3)
                switch(nodes[i].nodeName)
                {
                    case mt:    //若为主标题
						//创建标签为<dt>的元素
                        item = document.createElement("dt");
                        break;
                    case st:    //若为次标题
						//创建标签为<dd>的元素
                        item = document.createElement("dd");
                        break;
                }
                
				//根据nodetext创建文本节点itemtext
                var itemtext = document.createTextNode(nodetext);
				//将文本节点itemtext添加到item中
                item.appendChild(itemtext);
				//设置目录内容（item）名如name="0"
                item.setAttribute("name", num);
				//设置item被点击后的动作（创建锚链接效果）
                item.onclick = function(){        //添加鼠标点击触发函数
					//通过item中的name值获得对应标题元素的位置
                    var pos = BlogDirectory.getElementPosition(document.getElementById("blogTitle" + this.getAttribute("name")));
					//传入标题元素到顶部的距离进行窗口滚动，滚动失败则返回false
                    if(!BlogDirectory.moveScrollBar(pos.top, interval)) return false;
                };
                //将自定义表项（目录内容item）加入自定义列表（目录外部容器dlist）中（将目录的实际内容添加到目录内容的外围容器中）
                dlist.appendChild(item);
                num++;
            }
        }
        
		//如果没有标题则返回false
        if(num == 0) return false; 
		//判断是不是PC端的函数
		function IsPC() {
			var userAgentInfo = navigator.userAgent;
			var Agents = ["Android", "iPhone",
            "SymbianOS", "Windows Phone",
            "iPad", "iPod"];
			var flag = true;
			for (var v = 0; v < Agents.length; v++) {
				if (userAgentInfo.indexOf(Agents[v]) > 0) {
					flag = false;
					break;
				}
			}
			return flag;
		}
		
		//判断是不是PC端
		var isPC = IsPC();
		
        /*鼠标进入divSideBarTab时的事件处理：目录内容的div容器展示*/
        divSideBarTab.onmouseenter = function(){
			if(isPC){
				/*显示目录内容*/
				divSideBarContents.style.display = "block";
				/*隐藏目录按钮*/
				divSideBarTab.style.display = 'none';
			}else{
				/*显示目录内容*/
				divSideBarContents.style.display = "block";
				/*隐藏目录按钮*/
				divSideBarTab.style.display = 'none';
				//设置为不透明
				divSideBarContents.style.opacity=0;
			}
			
        }
		
		divSideBarContents.onmouseenter = function(){
			if(timerId1){clearTimeout(timerId1);}
		}
		
        /*鼠标离开divSideBar时的事件处理：目录内容的div容器不展示*/
        divSideBar.onmouseleave = function() {
				timerId1 = setTimeout(function(){
							/*隐藏目录内容*/
							divSideBarContents.style.display = 'none';
							/*显示目录按钮*/
							divSideBarTab.style.display = 'block';
				},1000);
		}
		//将整个博客目录的div容器divSideBar嵌入HTML页面中
        document.body.appendChild(divSideBar);
    }
    
};

window.onload=function(){
    /*页面加载完成之后生成博客目录*/
    BlogDirectory.createBlogDirectory("cnblogs_post_body","h2","h3",20);
}
</script>
