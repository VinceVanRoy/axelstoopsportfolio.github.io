$(document).ready(function() {

    /*———————————— Cursor ————————————*/

    /* Hide custom cursor when on mobile */
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

        /*—————— Hover Cursor Animation ——————*/
        function hoverAnimation() {

            $("*").css("cursor", "none"); /* Set cursor to none otherwise user agent style —> cursor:pointer (because project list items are created with js) */
                
            /*Static event handlers*/
            $(".btn, .btnMusic, .btnContact, .toTop").on("mouseenter", function() {
                cursor.eq(0).css("z-index", "0");

                cursor.css({
                    'transform': 'scale(2.8)',
                    'transition' : 'transform 0.5s' 
                });
            });

            $(".btn, .btnMusic, .btnContact, .toTop, .chatTemp").on("mouseleave", function() {
                cursor.eq(0).css("z-index", "2");

                cursor.css({
                    'transform': 'scale(1)',
                    'transition' : 'transform 0.3s' 
                });
            });

            /*Delegated event handlers*/
            $(".chat").on("mouseenter", ".chatTemp", function() {
                cursor.eq(0).css("z-index", "0");

                cursor.css({
                    'transform': 'scale(2.8)',
                    'transition' : 'transform 0.5s' 
                });
            });

            $(".chat").on("mouseleave", ".chatTemp", function() {
                cursor.eq(0).css("z-index", "2");

                cursor.css({
                    'transform': 'scale(1)',
                    'transition' : 'transform 0.3s' 
                });
            });

            /* Mix blend mode */

            $(".projectimg").on("mouseenter", function() {
                $(".cursor:first-of-type").css({
                    "background-color" : "white",
                    "mix-blend-mode" : "difference"
                });
            });

            $(".projectimg").on("mouseleave", function() {
                $(".cursor:first-of-type").css({
                    "background-color" : "black",
                    "mix-blend-mode" : "normal"
                });
            });
        }  
    }
    /*———————————— FUNCTIONS ————————————*/

    /*—————— Projects——————*/
    function addProject () {
        var title = [
            /* ["h1", "id"] */
            "December Wallpaper <br> for Smashing Magazine",
            "The Java Kitchen",
            "8 Ball Pool",
            "Upside Down",
            "Logo for Nerdic <br> Walkers",
            "Other Projects"
        ];

        var img = [
            /* ["src", "alt"] */
            ["images/projects/decemberWallpaper/preview.png", "December wallpaper"],
            ["images/projects/theJavaKitchen/preview.png", "Simple kitchen drawn with Java"],
            ["images/projects/sportsClub/preview.png", "8 ball pool app/protoype"],
            ["images/projects/upsideDown/preview.png", "Upside down logo design"],
            ["images/projects/nerdicWalkers/preview.png", "Logo for Nerdic Walkers"],
            ["images/sketches/minotaur/preview.jpg", "Sketch of a minotaur"]
        ];

        var btn = [
            ["See project", "projects/decemberWallpaper.html"],
            ["See project", "projects/theJavaKitchen.html"],
            ["See project", "projects/8BallPool.html"],
            ["See project", "projects/upsideDown.html"],
            ["See project", "projects/nerdicWalkers.html"],
            ["See more projects", "projects/otherProjects.html"]          
        ];

        for (var i=0; i<title.length; i++) {
            var li = $("<li>");
            var projectTitle = $("<div>");
            var h4 = $("<h4>");
            var newImg = $("<img>");
            var btnDiv = $("<div>");
            var newBtn = $("<a>");

            $(li).attr("class", "center");
            $(projectTitle).addClass("projectTitle");
            $(h4).html(title[i]);
            $(newImg).attr({
                "class" : "projectimg",
                "src" : img[i][0],
                "alt" : img[i][1]
                });
            $(btnDiv).attr("class", "margin");
            $(newBtn).html(btn[i][0]).attr({
                "class" : "btn",
                "href" : btn[i][1],
                });

            /*Center h4 in div.projectTitle */
            if (title[i].length < 20) {
                $(h4).css("margin-top", "8px");
            }

            btnDiv.append(newBtn);
            projectTitle.append(h4);
            li.append(projectTitle);
            li.append(newImg);
            li.append(btnDiv);
            $("#projects").append(li);
        }        
    }

    /*—————— Chat——————*/
    var startChat = false;

    function createChat () {
        startChat = !startChat;

        /* ["Question", "id"] */
        var question = [
            ["What can you do?", "abilitiesQ"],
            ["What’s your passion?", "passionQ"],
            ["I have a question not mentioned here…", "otherQ"],
            ["I have some feedback", "feedbackQ"]
        ];

        if ($(".chat li").length == 0) {  /*If block prevents spamming*/
            for (var i=0; i<question.length; i++) {
                var li = $("<li>");

                $(li).html(question[i][0]).attr("class", "chatTemp").attr("id", question[i][1]);
                $(".chat").append(li);
            }
        }

        if (startChat == true) {
            $("#startChat").html("Hide chat");
            $(".chat").css("display", "none").slideDown(1000, function() {
                $("#startChat").removeAttr("href", "#abilitiesQ");
            });

        }
    
        else if (startChat == false) {
            $("#startChat").html("Start chat");
            $(".chat").slideUp(1000, function() {
                $(".chat").html('');
                $("#startChat").attr("href", "#abilitiesQ");
            });
        }

        if (isMobileDevice() == false) {
            hoverAnimation();
        }
    }

    /*—————— Feedback form ——————*/
    function createFeedbackForm() {
        var li = $("<li>").attr("class", "Q feedbackForm").css("display", "none");
        var form = $("<form id='feedbackForm' action='https://formspree.io/info@jasper.one' method='POST'>");  
        
        var feedbackLabel = $("<label for='feedbacktxt'>Feedback</label>").addClass("bold block");
        var feedbacktxt = $("<textarea id='feedbacktxt' name='Feedback' placeholder='Type your feedback here' required rows='4' cols='40'></textarea>").addClass("block margin");
        var senderDetailsLabel = $("<label for='senderDetails'><span class='bold'>Your email</span> (not required)</label>").addClass("block");
        var senderDetails = $("<input type='text' id='senderDetails' name='Email of sender'>").addClass("margin");
        var send = $("<input type='submit' value='Send Feedback'>").addClass("block");

        form.append(feedbackLabel).append(feedbacktxt).append(senderDetailsLabel).append(senderDetails).append(send);
        li.append(form);

        li.insertAfter("#feedbackQ");   
        li.slideDown(800, function() {
            $("#feedbacktxt").focus();
        }); 
        
        /* Check validity of email */
        $("#senderDetails").on("keyup", function() {
            var input = $(this).val();
            var checkAt = input.indexOf("@");
            var checkDot = input.indexOf(".");
            var afterAt = input.substring(checkAt);

            if (checkAt == -1 || checkDot == -1 || afterAt.length < 4)  {
                $(this).css("border", "3px solid red");
            }

            else {
                $(this).css("border", "1px solid gray");    
            }
        });

        if (isMobileDevice() == false) {
            $("*").css("cursor", "none");
        }
    }
    
    /*—————— Send Message and Reply ——————*/

    $(".chat").on("click", function(e) {
        var answer = [
            "I'm currently practicing HTML, CSS, Java and JavaScript. Furthermore I also try to develop my skills in Adobe Illustrator and Photoshop",
            "My true passion is snowboarding, besides that I love to be a front- and back-end web developer. In my spare time I’m a music producer under the name SoundSmasher",
            "No problem, just send me an email at <a href='mailto:&#105;&#110;&#102;&#111;&#064;&#106;&#097;&#115;&#112;&#101;&#114;&#046;&#111;&#110;&#101;'>info@jasper.one</a> &#x1F609"
        ]
        
        switch (e.target.id) {
            case "abilitiesQ":
                /*Send*/
                $("#abilitiesQ").attr("class", "Q"); 

                /*Reply*/
                setTimeout(function() {
                    var li = $("<li>");
                    $(li).html(answer[0]).attr("class", "A");
                    li.insertAfter("#abilitiesQ");

                    $("#abilitiesQ").removeAttr("id", "abilitiesQ"); /* remove id to prevent click spamming */
                }, 1000);
            break;

            case "passionQ":
                $("#passionQ").attr("class", "Q");

                setTimeout(function() {
                    var li = $("<li>");
                    $(li).html(answer[1]).attr("class", "A");
                    li.insertAfter("#passionQ");

                    $("#passionQ").removeAttr("id", "passionQ");
                }, 1000);
            break;

            case "otherQ":
                $("#otherQ").attr("class", "Q");

                setTimeout(function() {
                    var li = $("<li>");
                    $(li).html(answer[2]).attr("class", "A");
                    li.insertAfter("#otherQ");

                    $("#otherQ").removeAttr("id", "otherQ");
                }, 1000);
            break; 

            case "feedbackQ":
                $("#feedbackQ").attr("class", "Q").attr("href", "#feedbacktxt");
                createFeedbackForm();

                $("#feedbackQ").removeAttr("id", "feedbackQ");
            break;

            default: /*No default*/
        }
    });

    /*———————————— FUNCTION CALLS ————————————*/

    addProject();
    $("#startChat").on("click", createChat);
    if (isMobileDevice() == false) {
        hoverAnimation();
    }

    /*——— Message to developers ———*/
    console.log("%cHi there! Spot some flaws or bugs in my code? Please send me a mail 🙂 -> axel.stoops99@gmail.com", "font-size: 1.5em");
});
    