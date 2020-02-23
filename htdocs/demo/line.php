<!DOCTYPE html>
<html lang="en">
    <head>
        <style>
            html, body {
                padding: 0;
                margin: 0;
            }
            #e1, #e2 {
                position: relative;
            }
            .col {
                float: left;
                width: 50%;
            }
            line {
                stroke: #0e84b5;
                stroke-width: 2;
            }
            svg {
                position: absolute;
                z-index: -1;
                top: 0;
            }
        </style>
        <title>Line Demo</title>
        <meta charset="UTF-8">
    </head>
    <body>
        <?php include '../template/bubbleElements.html' ?>
        <script src="/js/line.js"></script>
        <script>
            let started = false;
            let bottomBound = window.innerHeight;

            function moveElements() {
                let e1 = document.getElementById("e1");
                let e2 = document.getElementById("e2");
                if (!started) {
                    started = true;
                    e1.style.display = "block";
                    e2.style.display = "block";
                    document.getElementById("moveButton").innerHTML = "Move Elements";

                    let e1Height = e1.clientHeight;
                    let e2Height = e2.clientHeight;

                    bottomBound -= Math.max(e1Height, e2Height);
                }

                let y = Math.random() * bottomBound;

                e1.style.top = y + "px";

                y = Math.random() * bottomBound;

                e2.style.top = y + "px";
            }
        </script>
        <div class="row">
            <div class="col">
                <root-class-bubble href="http://www.example.com" id="e1">
                    <div slot="course-number">CS 1980</div>
                    <div slot="course-name">TEAM PROJECT DESIGN & IMPLMNTN</div>
                </root-class-bubble>
            </div>
            <div class="col">
                <root-class-bubble href="http://www.example.com" id="e2">
                    <div slot="course-number">CS 1980</div>
                    <div slot="course-name">TEAM PROJECT DESIGN & IMPLMNTN</div>
                </root-class-bubble>
            </div>
        </div>
        <script>
            attachElements(document.getElementById("e1"), document.getElementById("e2"));
        </script>
    </body>
</html>