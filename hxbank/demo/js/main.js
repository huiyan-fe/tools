/* eslint-disable */
/*
* Js模块文件的入口
* by hyi
*/
(function($) {

    var btnl = $('.btn-l');
    var btnSrc = $('.btn-src');
    var btnRef = $('.btn-refresh');
    var left = $('.left');
    var right = $('.right');
    var effect = $('.effect');
    var lines = $('.lines');
    var isSrc = true, isHide = false, hasChange = false;
    var editor = null;
    var isMobile = (function () {
        return function () {
            var width = document.body.clientWidth;
            var userAgentInfo = navigator.userAgent;
            var Agents = ["Android", "iPhone",
                        "SymbianOS", "Windows Phone",
                        "iPad", "iPod"];
            var flag = false;
            for (var v = 0; v < Agents.length; v++) {
                if (userAgentInfo.indexOf(Agents[v]) > 0) {
                    flag = true;
                    break;
                }
            }
            return flag;
        }
    })();

    function changeSize() {
        $('.container').css('min-height',$(window).height()+'px');
        $('.code').css('height',$(window).height() + 'px');
        $('.allexamples').css({'min-height': $(window).height() + 'px'});
        $('.all-inner').css('width',$(window).width() - 300 + 'px');
        $('.right').css('width',$(window).width() - 300 + 'px');
    };

    initEditor();
    function initEditor() {
        if(!editor) {
            editor = CodeMirror.fromTextArea(document.getElementById("code"), {
                lineWrapping:true, //是否显示scroll
                lineNumbers: true, //是否显示number
                styleActiveLine: true,
                matchBrackets: true,
                mode: 'htmlmixed',
                viewportMargin: Infinity
            });
            editor.setValue($('#code').val());
        }else {
            editor.setValue($('#code').val());
        }

    };

    function hasChanged() {
       editor.on('change', function () {
           hasChange = true;
       })
    };

    function changeInnerSize() {
       if (isHide) {
            $('.all-inner').css('width', $(window).width() - 300 + 'px');
            isHide = false;
        } else {
            $('.all-inner').css('width', $(window).width()  + 'px')
            isHide = true;
        }
    };

    function runCode() {
        var iframeContent=$("#code").val();
        if (editor) {
            iframeContent=editor.getValue();
        }
        var iframeNode = document.getElementById("iframes");
        var parentNode = iframeNode.parentNode;
        var newIframeNode = document.createElement('iframe');
        newIframeNode.setAttribute('id', iframeNode.getAttribute('id'));
        newIframeNode.setAttribute('name', iframeNode.getAttribute('name'));
        parentNode.removeChild(iframeNode);
        parentNode.appendChild(newIframeNode);
        var iFrame = newIframeNode.contentWindow;

        iFrame.document.open();
        iFrame.document.write(iframeContent);
        iFrame.document.close();
    };

    btnl.click(function() {
        $(this).toggleClass('btn-l-r');
        left.toggleClass("l-trf-r");
        right.toggleClass("r-trf-l");
        lines.toggleClass("lines-arrow");
        if(isHide) {
            setTimeout(function() {
                $('.right').width($(window).width()-300);
            },500)
        }else {
            $('.right').width($(window).width());
        }
        changeInnerSize();

    });

    hasChanged();
    btnSrc.click(function() {
        // effect.toggleClass('effect-l');
        if(hasChange) {
           runCode()
           hasChange  = false;
        }
    });

    if (isMobile()) {
        setTimeout(function() {
            btnl.click();
        }, 100);
    }

    btnRef.click(function() {
        $('#code').val(localStorage.content);
        editor.setValue($('#code').val());
        runCode();

    });

    function getSource() {
        $('.container').css('overflow','hidden');   //overflow小bug
        var url = $("#iframes").attr('src');
        url && $.get(url,function(data) {
            localStorage.content = data;
            $('#code').val(data);
            initEditor();
        });
    }

    changeSize();
    $(window).resize(function () {
        changeSize();
    });

    var examples = $('.allexamples .item p');
    examples.click(function (e) {
        var url = $(this).prev().attr('href');
        location.href = url;
    });

    $('.allexamples .item').hover(function(event){
        $(this).find("p").stop(true,true);
        $(this).find("p").css("display","block").animate({opacity:0.7},200);
    },function(){
        $(this).find("p").stop(true,true);
        $(this).find("p").animate({opacity:0},200).css("display","none");
    })

    var url = location.hash.substr(1) || 'simple-point.html';
    $('#iframes').attr('src', url);
    getSource();

    window.onhashchange = function() {
        var url = location.hash.substr(1);
        $('#iframes').attr('src', url);
        getSource();

        $('.nav a').removeClass('current');
        var item = $('.nav a[href="#' + url + '"]');
        item.addClass('current');
    }

    /*
    var data = config.demos;
    
    var html = [];
    for (var i = 0; i < data.length; i++) {
        var item = data[i];
        html.push('<li><a style="background-color: #333;background-image:url(./pics/' + item.pic + '); color: #fff; text-align: center; border-bottom: 1px solid rgba(200, 200, 200, 0.3); line-height: 150px; padding: 10px;text-shadow: 1px 1px 5px white;" class="index" href="#' + item.url + '" style="">' + (item.name || item.url)+ '</a></li>');
            
    }
    $('.nav ul').html(html.join(''));

    $('.nav a').removeClass('current');
    var item = $('.nav a[href="#' + url + '"]');
    item.addClass('current');
    var scrollTop = item.position().top;
    $('.nav').scrollTop(scrollTop);
    */
})(jQuery)

