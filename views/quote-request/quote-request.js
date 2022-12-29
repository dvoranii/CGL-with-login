const baseUrl = window.location.href;
const firstName = document.getElementById("name");
const email = document.getElementById("email");
const message = document.getElementById("message");
const phone = document.getElementById("phone");
const submitBtn = document.getElementById("submit");

// turn into module
// port dynamic form UI functionality from other app
async function postInfo(e) {
  e.preventDefault();
  const res = await fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      firstName: firstName.value,
      email: email.value,
      phone: phone.value,
    }),
  });
}
