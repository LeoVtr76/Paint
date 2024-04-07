const sizeInput = $('#size');
const sizeSpan = $('#size-span');
const display = $('.display');
const colorInput = $('#color');
let size = sizeInput.val();
let color = colorInput.val();
let init = false;
let isMouseDown = false;
$(function () {
    if (!init) {
        update(true, true);
        init = true;
    }
    sizeInput.on('input', function () {
        update(true, true);
    });
    colorInput.on('change', function () {
        update(true, false);
    })
})
function update(color, size) {
    if (color) { color = colorInput.val(); }
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
    $('.box').on('mousedown', function () {
        isMouseDown = true;
        $(this).css('background-color', color);
    });

    $(document).on('mouseup', function () {
        isMouseDown = false;
    });

    $('.box').on('mouseenter', function () {
        if (isMouseDown) {
            $(this).css('background-color', color);
        }
    });
}
