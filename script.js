const sizeInput = $('#size');
const sizeSpan = $('#size-span');
const display = $('.display');
const colorInput = $('#color');
const clear = $('#clear');
let size = sizeInput.val();
let color = colorInput.val();
let init = false;
let isMouseDown = false;
$(function () {
    if (!init) {
        update();
        init = true;
    }
    sizeInput.on('input', function () {
        update();
    });
    colorInput.on('input', function () {
        update(false);
    })
    clear.on('click', function () {
        update();
    })
    $('.display').on('touchmove', function (e) {
        if (isMouseDown) {
            let touchedPoint = e.originalEvent.changedTouches[0]; //location where user touch the screen
            let elem = $(document.elementFromPoint(touchedPoint.clientX, touchedPoint.clientY)); //element localised by the user touch position
            if (elem.hasClass('box')) elem.css('background-color', color);
        }
    });
})
function update(size = true) {
    color = colorInput.val();
    if (size) {
        size = sizeInput.val();
        sizeSpan.html(size + ' x ' + size);
        display.css({
            'grid-template-columns': 'repeat(' + size + ', 1fr)',
            'grid-template-rows': 'repeat(' + size + ', 1fr)'
        })
        $('.box').remove();
        for (let i = 0; i < size * size; i++) {
            display.append('<div class="box"></div>');
        }
    }
    $('.box').on('mousedown touchstart', function () {
        isMouseDown = true;
        $(this).css('background-color', color);
    });
    $(document).on('mouseup touchend', function () {
        isMouseDown = false;
    });

    $('.box').on('mouseenter', function () {
        if (isMouseDown) {
            $(this).css('background-color', color);
        }
    });
}
