
$('.categoryBtn').on('click', function(e) {
    e.preventDefault();
    $('.categoryBtn').css('color', 'white');
    $(this).css('color', 'lightgreen');
    let id =  $(this).attr('id');
    console.log(id);
})

$('#startBtn').on('click', function(e) {
    e.preventDefault();
    let inputvalue = $('#roundInput').val();
    console.log(inputvalue);
})












