window.addEventListener('load', () => {
    const partialHeader = dcoument.getElementById('header');
});
// script.js
function handleClick() {
    
    //preventDefault();
    //alert(10);
    if (confirm("Do you really want to leave?")) {
        // handle the case where the user clicked "OK"
        fetch('/logout', {method: 'POST'});
        fetch("/header");
    } else {
        // handle the case where the user clicked "Cancel"
   }
}