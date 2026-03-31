function toggleTheme() {
 const html = document.documentElement;
 const currentTheme = html.getAttribute("data-theme");
 const newTheme = currentTheme === "light" ? "dark" : "light";
 html.setAttribute("data-theme", newTheme);


 // Optional: Change button icon based on theme
 const btn = document.getElementById("theme-btn");
 if (newTheme === "dark") {
   btn.innerHTML = "☀️ Light Mode";
 } else {
   btn.innerHTML = "🌙 Dark Mode";
 }
}

function toggleTheme() {
  const html = document.documentElement;
  const profilePic = document.getElementById("profile-pic");
  
  // 1. Check current theme
  const currentTheme = html.getAttribute("data-theme");
  const newTheme = currentTheme === "light" ? "dark" : "light";
  
  // 2. Set the new theme attribute
  html.setAttribute("data-theme", newTheme);
  
  // 3. Swap the Image
  if (newTheme === "dark") {
    profilePic.src = "images/profile-night.png"; // Your night photo path
  } else {
    profilePic.src = "images/profile2.png";      // Your original photo path
  }
  
  // 4. Optional: Save selection so it stays when the page refreshes
  localStorage.setItem("theme", newTheme);

   const btn = document.getElementById("theme-btn");
 if (newTheme === "dark") {
   btn.innerHTML = "☀️ Light Mode";
 } else {
   btn.innerHTML = "🌙 Dark Mode";
 }
}
