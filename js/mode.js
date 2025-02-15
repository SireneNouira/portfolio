const sunPath =
  "M49.5 25C49.5 38.531 38.531 49.5 25 49.5C11.469 49.5 0.5 38.531 0.5 25C0.5 11.469 11.469 0.5 25 0.5C38.531 0.5 49.5 11.469 49.5 25Z";

const moonPath =
  "M18 26C25.9194 37.3101 40.0788 41.3091 40.0788 41.3091C28.7687 49.2285 13.1801 46.4798 5.26062 35.1697C-2.65882 23.8596 0.0898771 8.27092 11.4 0.351486C11.4 0.351486 10.0806 14.6899 18 26Z";

const pathElement = document.getElementById("myPath");


let toggle = localStorage.getItem("toggle") === "true";


applyMode();

pathElement.addEventListener("click", handleMode);

function handleMode() {
  toggle = !toggle; 
  localStorage.setItem("toggle", toggle); 
  applyMode(); 
}

function applyMode() {
  if (toggle) {
    // Mode clair
    pathElement.setAttribute("d", sunPath);
    document.documentElement.style.setProperty("--bg-color", "#FFFFFF");
    document.documentElement.style.setProperty("--seconde-bg-color", "#F0F0F0");
    document.documentElement.style.setProperty("--text-color", "#000000");
    document.documentElement.style.setProperty("--paillette-color", "#f4fefe");
  } else {
   // Mode sombre (réinitialiser les styles)
   pathElement.setAttribute("d", moonPath);
   document.documentElement.style.removeProperty("--bg-color");
   document.documentElement.style.removeProperty("--seconde-bg-color");
   document.documentElement.style.removeProperty("--text-color");
   document.documentElement.style.removeProperty("--paillette-color");
 }
}