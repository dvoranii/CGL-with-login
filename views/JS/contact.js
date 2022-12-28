const baseUrl = window.location.href;
const fullName = document.getElementById("fullName");
const submitBtn = document.getElementById("submit");
const email = document.getElementById("email");
const phone = document.getElementById("phone");

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  postInfo(e);
});

// Let's create a module for this if possible
// finish the rest of the form inputs first
async function postInfo(e) {
  e.preventDefault();
  const res = await fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fullName: fullName.value,
      phone: phone.value,
      email: email.value,
    }),
  });
}
