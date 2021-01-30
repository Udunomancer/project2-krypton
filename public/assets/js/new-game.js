$(document).ready(function () {
    $('select').formSelect();
});

$(".submitButton").on("click", function (e) {
    e.preventDefault();
    alert("submitted");
})