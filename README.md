# phpdoc-zh-docset
PHP手册中文版－－用于Dash等
# 介绍

可作为[Dash](http://kapeli.com/dash)使用的[PHP中文手册](http://www.php.net/manual/zh/)Docsets文件。

本Docset特点：  
* 包含了实例较多的“User Contributed Notes”（用户评论）数据
* 支持PHP8.0
* 数据更新至2021/2/16日

已知问题：
* 手册首页失踪
* 中文标题索引乱码

# 使用方法

点击右侧的“Clone or download”，之后点击“Download ZIP”按钮下载压缩文件。解压后，双击用Dash打开添加即可。

# 本Docsets的制作方法
使用了一个叫做dash-phpdoc的工具来制作，可以下载最新的官网手册随时生成最新docset。但因为原版已经三年没有更新，在处理最新文件时会有bug，并且没法很好的处理日文以外的chm文件名。本次使用了自己修改的[dash-phpdoc](https://github.com/toyjack/dash-phpdoc-ja)，并已经向原版提交了pull request。


~~参考了日本人miukoba的[方法](http://www.miukoba.net/blog/2013/12/14/Japanese-PHP-Docset-for-Dash/)~~

~~大致方法：~~

~~1. 下载PHP中文离线手册CHM版本（只有CHM版含有用户评论）~~
~~2. 使用libchm-bin展开下载的chm文件~~
~~3. 替换dash中下载的原版php.docset相关文件~~
~~4. 修改plist文件（不该也行）~~

~~这应该是制作docset最懒的办法...~~

# 链接
PHP DOCSET生成工具：[toyjack/dash-phpdoc-ja](https://github.com/toyjack/dash-phpdoc-ja)

（原版）PHP DOCSET生成工具：[taka-tactical/dash-phpdoc-ja](https://github.com/taka-tactical/dash-phpdoc-ja)

（原版）工具教程：[最新のPHPに対応したDash用Docsetを作成する](https://qiita.com/taka-tactical/items/ebb7c4913e5dcfe867a1)


【链接已失效】~~miukoba先生制作的PHP手册日文版：[miukoba/phpdoc-ja-docset](https://github.com/miukoba/phpdoc-ja-docset)~~

PHP离线手册下载地址:[https://secure.php.net/download-docs.php](https://secure.php.net/download-docs.php)


# 版权

版权归[php.net](http://www.php.net)所有。
