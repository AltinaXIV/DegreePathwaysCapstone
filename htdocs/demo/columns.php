<!DOCTYPE html>
<html lang="en">

    <head>
        <meta charset="UTF-8">
        <link rel="stylesheet" href="/css/default.css">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script type="text/javascript" src='/js/columns.js'></script>
        <script src="/js/material-elements.js"></script>
        <title>DEMO - Columns</title>
    </head>
    <body>
        <?php include '../template/bubbleElements.html' ?>
        <header class="material-nav-bar">
            <button class="menu-button" ripple="ripple" onclick="activateLeftNav()"><img height="50" width="50"
                                                                                         alt="menu"
                                                                                         src="/icons/menu.svg"></button>
        </header>
        <div class="row">
            <div class="left-nav-container" id="left-nav">
                <br>
                <label for="semesters">Columns: </label><input type="text" id="semesters"><br>
                <button onclick="generateColumns()">Submit</button>
                <br><br>
            </div>

        </div>
        <script src="/js/home.js"></script>

        <div class="row" id="main-body"></div>

    </body>
</html>