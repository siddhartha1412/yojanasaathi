function openAdminLogin() {
  const pwd = prompt("Enter Admin Password:");
  if (pwd === "yojana123") {
    window.location.href = "admin.html";
  } else {
    alert("Incorrect password!");
  }
}
