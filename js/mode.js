const sunPath ="M49.5 25C49.5 38.531 38.531 49.5 25 49.5C11.469 49.5 0.5 38.531 0.5 25C0.5 11.469 11.469 0.5 25 0.5C38.531 0.5 49.5 11.469 49.5 25Z";

const moonPath ="M18 26C25.9194 37.3101 40.0788 41.3091 40.0788 41.3091C28.7687 49.2285 13.1801 46.4798 5.26062 35.1697C-2.65882 23.8596 0.0898771 8.27092 11.4 0.351486C11.4 0.351486 10.0806 14.6899 18 26Z";

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
