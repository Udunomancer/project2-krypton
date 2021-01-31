$(document).ready(function () {
    $('select').formSelect();
});

$(".submitButton").on("click", function (e) {
    e.preventDefault();
    $.ajax({
        type: "POST",
        url: "/api/games/",
        data: "fake_data",
    })
})