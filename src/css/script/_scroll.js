$(function () {
    $(window).scroll(function (){
        const wHeight = $(window).height();
        const wScroll = $(window).scrollTop();

        $(".fadeUp").each(function () {
            const bPosition = $(this).offset().top;
            if(wScroll > bPosition - wHeight + 200){
                $(this).addClass("fadeIn");
            }
        })
    })
})