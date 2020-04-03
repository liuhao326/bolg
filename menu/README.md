这是实现为博客园生成目录的两个方案。效果如下：

<div align=center><img src="https://raw.githubusercontent.com/liuhao326/PicRepository/master/img/20200403204839.png" alt="" style="zoom: 80%;" /></div>

<div align=center><img src="https://raw.githubusercontent.com/liuhao326/PicRepository/master/img/20200403204709.png" alt="" style="zoom: 80%;" /></div>

该方案是在[孤傲苍狼](https://www.cnblogs.com/xdp-gacl/)所写目录方案的基础上建立的完善版本。添加了动画及渐变并实现了六级目录。

目录生效需要`js`权限，使用时只需要将`css`和`js`代码分别复制粘贴到博客园后台中，具体该如何设置目录可参见[JavaScript自动生成博文目录导航](https://www.cnblogs.com/xdp-gacl/p/3718879.html)，该方案是在[JavaScript自动生成博文目录导航](https://www.cnblogs.com/xdp-gacl/p/3718879.html)之上的完善，只是代码不同，设置步骤一样。

你会发现这里面有两个`css`文件和两个`js`文件，如果你想使用能够生成Markdown二、三级标题的方案，选择复制`menu_twolevel.js`和`menu_twolevel.css`这两个文件，如果想要生成六级标题，则选择复制`menu_sixlevel.js`和`menu_sixlevel.css`这两个文件。