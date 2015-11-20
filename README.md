# 原生HTML5音频播放器，微信文章页播放器样式

- JS主要来自：[Building a Custom HTML5 Audio Player with JavaScript - Forays In Web Development](http://www.alexkatz.me/html5-audio/building-a-custom-html5-audio-player-with-javascript/)
- 播放器结构和样式直接提取自微信公众号页面
- 经修改，实现功能交互与微信播放器一致
 + 显示播放进度和总时间长度
 + 单击（或触摸）切换“暂停”与“播放”

说明：部分MP3由于编码问题可能无法获取音频长度（或者准确的长度），我测试将有问题的MP3上传到喜马拉雅，转换后得到的MP3是可以正确获取长度的。

本实现来自实际微信项目开发需求，用于学习测试HTML音视频API，定制播放器界面，测试第三方插件等。

另docs目录下，有微信原播放器JS供学习参考。

![](http://ww4.sinaimg.cn/large/4e5d3ea7jw1ey7on9c0ioj208x05mmx4.jpg)

番外：
在实际开发中，由于本人无法直接修改包含audio标签的原HTML文件，需要用JS实现界面替换，额外写了如下代码。注意要隐藏原生界面，需要清空audio标签中`controls`的值，或者干脆不要写。
```js
function insertPlayer(){
    var playerNode = '<div class="audio_area" id="audioplayer">'  +
        '<div class="audio_wrp" id="music" preload="true">' +
        '<div class="audio_play_area play " id="pButton ">' +
        '<i class="icon_audio_default "></i>' +
        '<i class="icon_audio_playing "></i>' +
        '</div>' +
        '<div class="audio_length tips_global ">00:00</div>' +
        '<div class="audio_info_area ">' +
        '<strong class="audio_title ">音频标题</strong>' +
        '<div class="audio_source tips_global ">音频来源</div>' +
        '</div>' +
        '<div id="timeline" class="progress_bar">' +
        '<div id="playhead"></div>' +
        '</div>' +
        '</div>' +
        '</div>';
    
    $$(page.container).find('audio').parent().append(playerNode);
    $$(page.container).find('audio').prop('controls', '');
    // for test
    //$$(page.container).find('source').prop('src', 'http://fdfs.xmcdn.com/group9/M07/95/31/wKgDYlY7_9DzDKIwAAcTVNSve_k086.mp3');
};
```