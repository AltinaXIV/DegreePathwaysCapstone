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
                display: block;
            }
            .col {
                float: left;
                width: 50%;
            }
            line {
                stroke: #0e84b5;
                stroke-width: 1;
            }
            path {
                stroke: #0e84b5;
                stroke-width: 1;
                fill: transparent;
            }
            svg {
                position: absolute;
                z-index: -1;
                margin: 0;
                padding: 0;
            }
            #moveButton {
                position: absolute;
                left: 400px;
            }
        </style>
        <link rel="stylesheet" type="text/css" href="/css/default.css">
        <title>Line Demo</title>
        <meta charset="UTF-8">
    </head>
    <body onload="attachElements(document.getElementById('e1'), document.getElementById('e2'))">
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
                    document.getElementById("moveButton").innerHTML = "Move Elements";

                    let e1Height = e1.clientHeight;
                    let e2Height = e2.clientHeight;

                    bottomBound -= Math.max(e1Height, e2Height);
                }

                let y = Math.floor(Math.random() * bottomBound);

                e1.style.top = y + "px";

                y = Math.floor(Math.random() * bottomBound);

                e2.style.top = y + "px";
                attachElements(e1, e2);

            }
        </script>
        <div class="row">
            <div class="col">
                <root-class-bubble href="http://www.example.com" id="e1" compact>
                    <div slot="course-number">CS 1980</div>
                    <div slot="course-name">TEAM PROJECT DESIGN & IMPLMNTN</div>
                </root-class-bubble>
            </div>
            <div class="col">
                <leaf-class-bubble href="http://www.example.com" id="e2" compact>
                    <div slot="course-number">WWWW 5555</div>
                    <div slot="course-name">TEAM PROJECT DESIGN & IMPLMNTN</div>
                </leaf-class-bubble>
            </div>
        </div>
        <button id="moveButton" onclick="moveElements()">Start Demo</button>
    </body>
</html>