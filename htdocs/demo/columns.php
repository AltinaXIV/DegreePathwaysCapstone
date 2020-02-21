<!DOCTYPE html>
<html lang="en">
    <style>
        .row {
        display: flex;
        }
        .column {
        flex: 50%;
        padding: 10px;
        }
    </style>
    <head>
        <meta charset="UTF-8">
        <title>DEMO - Columns</title>
    </head>
    <body>
        <form action="columns.php" method="get-columns">
        Columns: <input type="text" name="semesters"><br>
        <input type="Submit">
        </form><br>
        
        <?php $semesters=$_GET["semesters"] ?>
        
        <div class="row">
            <?php generateColumn($semesters); ?>
        </div>  
        
        <?php
           function generateColumn($count){
            $col = '<div class="column">This is a column.</div>';
            foreach( range(1, $count) as $item){
               if ($count > 0) echo $col;
            }
           };
        ?>
    </body>
</html>