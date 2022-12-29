const email = document.getElementById("email");
const password = document.getElementById("password");
const submitBtn = document.getElementById("submit");

const emailRegex = /^.+@.+\.[a-zA-Z]{2,}$/;

function isValidEmail(email) {
  return emailRegex.test(email);
}
console.log(isValidEmail);

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (
    !isValidEmail(email.value) &&
    (email.value == "" || email.value === null)
  ) {
    console.log("Empty");
    email.style.boxShadow = "0px 0px 5px red";
  } else if (!isValidEmail(email.value) && !email.value == "") {
    console.log("sdfsdf");
    email.style.boxShadow = "0px 0px 5px red";
  } else {
    console.log("good to go");
    email.style.boxShadow = "none";
  }
});
