<!--
    DEMO PAGE

    The follow page is a demo page. Demo pages are pages that are used to show how elements of the Degree Pathways UI
    work in practice as well as describe the purpose and use case for them.

    DESCRIPTION

    For the purpose of this project and demo page, a class bubble can be defined as a bubble shaped UI element that
    contains information on a class. Class bubbles connect with other class bubbles to show pathways between classes.
    When a class bubble is moused over, a tooltip should be displayed showing more information on the class such as a
    brief description, class number, and amount of credits.

    DESIGN

    There are four types of class bubbles: a root bubble which we will define as a bubble that contains a class with
    no prerequisites but is a prerequisite for another class, a branch bubble which we will define as a bubble with
    prerequisites and is also a prerequisite for another class, a leaf bubble which we will define as a bubble with
    prerequisites but is not a prerequisite for another class, and a stand-alone bubble which we will define as a bubble
    with no prerequisites and also is not a prerequisite for another class.

    For a meaningful design, there is a slight difference between these bubbles in terms of design. Classes on the
    degree pathway UI will roll from left to right, meaning that classes that must or should be taken first will appear
    on the left side and classes that will be taken later on will move towards the right side. This in mind, root
    bubbles should have a more square border along the left side and more rounded borders towards the right side, Branch
    bubbles should be rounded on all sides, leaf bubbles should only be rounded on the left side, and stand-alone
    bubbles will not be rounded on any side.

    When moused over, a tooltip should pop up with more information on the class the bubble refers to. The tooltip
    should appear in relation to the bubble in a place that makes sense. This should not be something that is coded in
    manually, but something that javascript is able to figure out. For example, if the bubble is on the far left side
    of the viewport, the tooltip should not show up to the left of it to prevent it from running off the viewport.
    These tooltips should also contain a link to the full description of the course.

-->

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>DEMO - Class Bubbles</title>
    </head>
    <body>
        <?php include '../template/rootClassBubbleElement.html' ?>
        <h1>Root bubble</h1>
        <root-class-bubble>
            <div slot="course-number">CS 1980</div>
            <div slot="course-name">TEAM PROJECT DESIGN & IMPLMNTN</div>
        </root-class-bubble>
    </body>
</html>