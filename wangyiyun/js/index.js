$(function () {

   $('.wrapper').on('click','a', function () {
       var page=$(this).parent().data('page');
       render(page);
       var historyUrl=$(this).attr('href');
       history.pushState(null,null,historyUrl);/*3.追叫的历史记录的地址*/
       return false;//阻止默认行为跳转
   });
    
   widows.onpopstate=function () {/*监听历史切换事件*/
       var pathname=location.pathname;
       var page='index';
       if(pathname.indexOf('index.php')>-1){
           page='index';
       }else if(pathname.indexOf('my.php')>-1){
           page='my';
       }else if(pathname.indexOf('friend.php')>-1){
           page='friend';
       }
       render(page);
   };


    var render=function (page) {
        $.ajax({
            type: 'get',
            url: 'api/data.php',
            data: {page:page},
            dataType: 'json',
            success:function (data) {
                $('[data-page]').removeClass('now');
                $('[data-page="'+data.page+'"]').addClass('now');
                $('content').html(data.html);
            }
        })
    }


    
});
