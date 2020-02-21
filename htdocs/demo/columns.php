<!DOCTYPE html>
<html lang="en">

    <head>
        <meta charset="UTF-8">
        <link rel="stylesheet" href="/css/default.css">
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
            foreach( range(1, $count) as $item){
                $name= "column-" . $item ;
               if ($count > 0) echo '<div class="column" name=' . $name .  '>This is a column.</div>';
            }
           };
        ?>
        
    </body>
</html>