
const form = document.getElementById("registrationForm");
const tbody = document.getElementById("tableBody");

// Load existing entries from localStorage
let registrations = JSON.parse(localStorage.getItem("registrations")) || [];

function displayTable() {
  tbody.innerHTML = "";
  registrations.forEach(user => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${user.name}</td>
      <td>${user.email}</td>
      <td>${user.password}</td>
      <td>${user.dob}</td>
      <td>${user.acceptTerms ? "true" : "false"}</td>
    `;
    tbody.appendChild(row);
  });
}

function calculateAge(dobString) {
  const today = new Date();
  const birthDate = new Date(dobString);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const dob = document.getElementById("dob").value;
  const acceptTerms = document.getElementById("accept-terms").checked;

  if (!name || !email || !password || !dob || !acceptTerms) {
    alert("Please fill all fields and accept the terms.");
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  const age = calculateAge(dob);
  if (age < 18 || age > 55) {
    alert("You must be between 18 and 55 years old to register.");
    return;
  }

  const newUser = { name, email, password, dob, acceptTerms };
  registrations.push(newUser);
  localStorage.setItem("registrations", JSON.stringify(registrations));

  displayTable();
  form.reset();
});

window.addEventListener("DOMContentLoaded", displayTable);
