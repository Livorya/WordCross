
$('body').on('click', changeColor);

function changeColor(e){
    e.preventDefault();
    let background = $(this).css('background-color', 'beige');
}