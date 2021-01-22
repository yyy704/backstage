(function(window, undefined) {
    function progress() {
        // 修改默认配置
        NProgress.configure({
            showSpinner: false
        });

        // 页面顶部进度条
        NProgress.set(0.4)
            // 设置一个定时器
        let interval = setInterval(function() {
            NProgress.inc(); // 以小量递增
        }, 200)

        // 高版本VisualStudioCode只能用on（'load'）
        $(window).on('load', () => {
            clearInterval(interval); // 执行完毕清定时器
            NProgress.done();
        })
    };
    progress();
}(window))