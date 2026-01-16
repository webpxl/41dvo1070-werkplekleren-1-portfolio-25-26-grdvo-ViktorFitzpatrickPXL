// Ensure the top navigation is fixed and add body offset equal to nav height
(function () {
    function initStickyNav() {
        var nav = document.querySelector('.topnav');
        if (!nav) return;
        nav.style.position = 'fixed';
        nav.style.top = '0';
        nav.style.left = '0';
        nav.style.right = '0';
        nav.style.zIndex = '10000';

        function updateOffset() {
            var h = nav.offsetHeight || 0;
            document.documentElement.style.setProperty('--nav-height', h + 'px');
            document.body.style.paddingTop = h + 'px';
        }

        // initial
        updateOffset();
        // update on resize and font-load
        window.addEventListener('resize', updateOffset);
        window.addEventListener('orientationchange', updateOffset);

        // in case fonts load late
        if (document.fonts && document.fonts.ready) {
            document.fonts.ready.then(updateOffset);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initStickyNav);
    } else {
        initStickyNav();
    }
})();
