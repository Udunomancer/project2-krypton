$(document).ready(function() {
  // Getting references to our form and input
  var signUpForm = $(".sign-up");
  var nameInput = $("#user-name");
  var emailInput = $("#email");
  var passwordInput = $("#password");
  

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", function(event) {
    event.preventDefault();
    var userData = {
      name: nameInput.val().trim(),
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };
    // console.log(userData);
    if (!userData.email || !userData.password || !userData.name) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(userData.email, userData.password, userData.name);
    emailInput.val("");
    passwordInput.val("");
    nameInput.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to login page
  // Otherwise we log any errors
  function signUpUser(email, password, name) {
    $.post("/api/signup", {
      email: email,
      password: password,
      name: name
    })
      .then(function(data) {
        window.location.replace("/login");
       console.log(data);
      })
      .catch((err) => {
        res.status(500);
      });
  }

  // function handleLoginErr(err) {
  //   $("#alert .msg").text(err.responseJSON);
  //   $("#alert").fadeIn(500);
  // }
});