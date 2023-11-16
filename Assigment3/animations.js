var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.6.4.min.js';
script.type = 'text/javascript';

//Global Properties
const thresehold = 55;
const vertThresehold = 100;
const speed = 35;


//Debugging Line for Visualizing what is inside the barrier
function drawLine(mouseX, mouseY, color) {
    var verticalLine = $('<div>').css({
        position: 'absolute',
        left: mouseX + 'px',
        top: mouseY + 'px',
        width: '20px', // Adjust the width as needed
        height: '5px', // Adjust the height as needed
        background: color,
    });
    $('body').append(verticalLine);
    setTimeout(function () {
        verticalLine.remove();
    }, 1000);
}

//Drawing the Barriers/Threseholds
function drawBarrier() {
    $('.barrier').remove();

    var image = $("#movingImage");

    // Calculate the point where you want to draw the line
    var bottomOfImage = image.position().top + image.height();
    var rightOfImage = image.position().left + image.width();
    var leftOfImage = $(window).width() - image.width();
    var screenWidth = $(window).width();
    var screenHeight = $(window).height();
    var bottom = $(window).height() - (image.position().top + image.height());

    //Visulize the barriers and thresehold for the picture 
    var belowPicture = $('<div>').addClass('barrier').css({
        position: 'absolute',
        left: '0px',
        top: bottomOfImage + 'px',
        width: screenWidth + 'px', // Adjust the width as needed
        height: '5px', // Adjust the height as needed
        background: 'blue',
    });

    var horizontalBarrier1 = $('<div>').addClass('barrier').css({
        position: 'absolute',
        left: '0px',
        top: bottomOfImage + thresehold + 'px',
        width: screenWidth + 'px', // Adjust the width as needed
        height: '5px', // Adjust the height as needed
        background: 'green',
    });

    var rightOfPictureAbove = $('<div>').addClass('barrier').css({
        position: 'absolute',
        left: rightOfImage + 'px',
        top: '0px',
        width: '5px', // Adjust the width as needed
        height: screenHeight + 'px', // Adjust the height as needed
        background: 'red'
    });

    var verticalBarrier1 = $('<div>').addClass('barrier').css({
        position: 'absolute',
        left: rightOfImage + thresehold + 'px',
        top: '0px',
        width: '5px', // Adjust the width as needed
        height: screenHeight + 'px', // Adjust the height as needed
        background: 'orange'
    });

    var leftOfPictureAbove = $('<div>').addClass('barrier').css({
        position: 'absolute',
        left: leftOfImage + 'px',
        top: '0px',
        width: '5px', // Adjust the width as needed
        height: screenHeight + 'px', // Adjust the height as needed
        background: 'pink'
    });

    var verticalBarrier2 = $('<div>').addClass('barrier').css({
        position: 'absolute',
        left: leftOfImage - thresehold + 'px',
        top: '0px',
        width: '5px', // Adjust the width as needed
        height: screenHeight + 'px', // Adjust the height as needed
        background: 'orange'
    });

    var horizontalBarrier2 = $('<div>').addClass('barrier').css({
        position: 'absolute',
        left: '0px',
        top: bottom + thresehold + 'px',
        width: screenWidth + 'px', // Adjust the width as needed
        height: '5px', // Adjust the height as needed
        background: 'purple'
    });

    $('body').append(belowPicture);
    $('body').append(rightOfPictureAbove);
    $('body').append(horizontalBarrier1);
    $('body').append(verticalBarrier1);
    $('body').append(leftOfPictureAbove);
    $('body').append(verticalBarrier2);
    $('body').append(horizontalBarrier2);

}

//Setting The Bottom Of The Image
function setBottomOfImage(image) {
    return image.position().top + image.height();
}

//Setting the Right Side Of The Image
function setRightOfImage(image) {
    return image.position().left + image.width();
}

//Setting the Left Side Of The Image
function setLeftOfImage(image) {
    return ($(window).width() - image.width());
}

//Setting the Bottom Barrier
function setBottom(image) {
    return $(window).height() - (image.position().top + image.height());
}

//Animation logic for the catchMeIfYouCan
function catchMeIfYouCan() {
    //drawBarrier();
    var image = $("#movingImage");
    const bottomOfImage = setBottomOfImage(image);
    const rightOfImage = setRightOfImage(image);
    const leftOfImage = setLeftOfImage(image);
    const bottom = setBottom(image);
    const lowerBarrier = bottom;
    const topOfImage = bottom + 60;
    const upperBarrier = bottomOfImage + thresehold;
    var isBelow = false;
    var isLeft = true;

    $(document).off('mousemove').on('mousemove', function (event) {
        var mouseX = event.pageX;
        var mouseY = event.pageY;
        var right = ($(window).width() - image.width()) + 20;

        //Comming from the Bottom, Above
        if (mouseY >= bottomOfImage && mouseY < upperBarrier && !isBelow) {
            //Move Left
            if (mouseX < rightOfImage) {
                $(image).animate({ left: right + 'px' }, speed);
                // drawLine(mouseX, mouseY, 'purple');
                isLeft = false;
            }
            //Move Right
            if (mouseX > leftOfImage) {
                $(image).animate({ left: '0px' }, speed);
                // drawLine(mouseX, mouseY, 'green');
                isLeft = true;

            }
        }

        //Coming from the inside above
        if (mouseY <= bottomOfImage && !isBelow) {
            //Move Down
            if (mouseX <= rightOfImage + vertThresehold && mouseX >= rightOfImage && isLeft) {
                $(image).animate({ top: bottom + 'px' }, speed);
                // drawLine(mouseX, mouseY, 'pink');
                isBelow = true;
            }
            //Move Down
            if (mouseX > leftOfImage - vertThresehold && mouseX <= leftOfImage && !isLeft) {
                $(image).animate({ top: bottom + 'px' }, speed);
                // drawLine(mouseX, mouseY, 'pink');
                isBelow = true;
            }
        }

        //Coming from the inside below
        if (mouseY >= topOfImage && isBelow) {
            if (mouseX <= rightOfImage + vertThresehold && mouseX >= rightOfImage && isLeft) {
                //Move UP
                $(image).animate({ top: 0 + 'px' }, speed);
                //drawLine(mouseX, mouseY, 'blue');
                isBelow = false;
            }
            //Move UP
            if (mouseX > leftOfImage - vertThresehold && mouseX <= leftOfImage && !isLeft) {
                $(image).animate({ top: 0 + 'px' }, speed);
                //drawLine(mouseX, mouseY, 'blue');
                isBelow = false;
            }
        }

        //Coming from the top, Below
        if (mouseY >= lowerBarrier && mouseY <= topOfImage && isBelow) {
            //Move Right 
            if (mouseX < rightOfImage) {
                $(image).animate({ left: right + 'px' }, speed);
                // drawLine(mouseX, mouseY, 'green');
                isLeft = false;
            }
            //Move Left
            if (mouseX > leftOfImage) {
                $(image).animate({ left: '0px' }, speed);
                // drawLine(mouseX, mouseY, 'green');
                isLeft = true;
            }
        }
    });
}

//Reloads Page to ensure animation
function handleResize() {
location.reload();
} 


$(document).ready(function () {
    $(window).on("resize", handleResize);
    catchMeIfYouCan();
});



//Previous Resizing, tried to keep everything relative, ran into resizing issues
/*
function handleResize() {
    // var image = $("#movingImage");
    // var imageLeft = image.position().left;
    // var imageWidth = image.width();
    // var windowWidth = $(window).width();

    // if (imageLeft + imageWidth > windowWidth) {
    //     image.css('left', windowWidth - imageWidth + 'px');
    // }
    // catchMeIfYouCan();
} */