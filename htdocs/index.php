<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>University of Pittsburgh Degree Pathway Tool</title>
        <link rel="stylesheet" href="/css/default.css">
        <script src="/js/material-elements.js"></script>
        <script type="text/javascript" src="/js/columns.js"></script>
        <script type="text/javascript" src="/js/pathways.js"></script>
    </head>
    <body>
        <?php include './template/bubbleElements.html' ?>
        <header class="material-nav-bar">
            <button class="menu-button" ripple="ripple" onclick="activateLeftNav()"><img height="50" width="50" alt="menu" src="/icon/menu.svg"></button>
        </header>
        <div class="row">
            <div class="left-nav-container" id="left-nav">
                <br>
                <label for="semesters">Semesters: </label>
                <input type="text" id="semesters"><br>
                <button onclick="demo()">CS Minor Demo</button><br><br>

                <label for="compact-toggle">Enable compact view: </label>
                <input type="checkbox" id="compact-toggle" onclick="switchCompact(this);">
            </div>
        </div>

        <div id="main-body"></div>


        <script src="/js/home.js"></script>
        
    </body>
</html>