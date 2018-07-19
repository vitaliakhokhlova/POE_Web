var afficher = false;
$('a').click(function () {
    if(afficher ^= true) {
        displayContenu();
        $('a').text('Cacher le contenu');
    }
    else{
        $('#content').html('');
        $('a').text('Afficher le contenu');
    }
})

function displayContenu() {
    $.ajax({
        url: 'content.html',
        dataType: 'html',
        success: function (results) {
            $('#content').html(results);
        },
        error: function (results, code) {
            alert('KO');
        },
        complete: function (results) {
        }
    });
    return false;
}