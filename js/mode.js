const sunPath =
  "M55 27.5C55 42.6878 42.6878 55 27.5 55C12.3122 55 0 42.6878 0 27.5C0 12.3122 12.3122 0 27.5 0C42.6878 0 55 12.3122 55 27.5Z";
const moonPath =
  "M15.5 27.5C15.5 42.6878 27.5 55 27.5 55C12.3122 55 0 42.6878 0 27.5C0 12.3122 12.3122 0 27.5 0C27.5 0 15.5 12.3122 15.5 27.5Z";

const pathElement = document.getElementById("myPath");
let toggle = true;
pathElement.addEventListener("click", handleMode);

function handleMode() {
 
  const currentD = pathElement.getAttribute("d");

  
  if (currentD === moonPath) {
    pathElement.setAttribute("d", sunPath);
    toggle = false;
  } else {
    pathElement.setAttribute("d", moonPath);
    toggle = true;
  }

  if (toggle = true) {
    const rootStyles = getComputedStyle(document.documentElement);
    const bgColor = rootStyles.getPropertyValue('--bg-color').trim();
    const secondBgColor = rootStyles.getPropertyValue('--seconde-bg-color').trim();
    const textColor = rootStyles.getPropertyValue('--text-color').trim();

    document.documentElement.style.setProperty('--bg-color', bgColor === '#080808' ? '#FFFFFF' : '#080808');
    document.documentElement.style.setProperty('--seconde-bg-color', secondBgColor === '#131313' ? '#F0F0F0' : '#131313');
    document.documentElement.style.setProperty('--text-color', textColor === 'white' ? '#000000' : 'white');
  }
  
}
