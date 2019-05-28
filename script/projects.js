$(document).ready(function() {

    /*———————————— Cursor ————————————*/
    function isMobileDevice() {
        return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
    };
    
    if (isMobileDevice() == true) {
        $(".cursor").css("display", "none");
    }

    else {
        
        $("*").css("cursor", "none");

        var cursor = $(".cursor");

        $(document).on("mousemove", function(e) {

            cursor.css("opacity", "1");
            
            cursor.eq(0).css({
                left: e.pageX, /*Or clientX and clientY */
                top: e.pageY,
            });
            setTimeout(function() {
                cursor.eq(1).css({
                    left: e.pageX,
                    top: e.pageY
                });
            }, 150);
        });

        $(document).on("mouseleave", function() {
            cursor.css("opacity", "0");
        });

        /*———————————— FUNCTIONS ————————————*/

        /*—————— Hover Cursor Animation ——————*/
        function hoverAnimation() {
            
            /*Static event handlers*/
            $("a").on("mouseenter", function() {
                cursor.eq(0).css("z-index", "0");

                cursor.css({
                    'transform': 'scale(2.8)',
                    'transition' : 'transform 0.5s' 
                });
            });

            $("a").on("mouseleave", function() {
                cursor.eq(0).css("z-index", "2");

                cursor.css({
                    'transform': 'scale(1)',
                    'transition' : 'transform 0.3s' 
                });
            });
        }  
    }

    /*———————————— FUNCTION CALLS ————————————*/

    if (isMobileDevice() == false) {
        hoverAnimation();
    }

    /*——— Message to developers ———*/
    console.log("%cHi there! Spot some flaws or bugs in my code? Please tell me 🙂 -> info@jasper.one", "font-size: 1.5em");
});
    