//javascript for the listing.html file
//only select 3 categories and only select one checkbox


//select 3 categories at a time
document.getElementById('categories').addEventListener('change', function (event) {
    const selectedOptions = Array.from(this.selectedOptions); // Get selected options
    if (selectedOptions.length > 3) {
        alert('You can select up to 3 categories only.'); //alert to notify user
        event.target.options[event.target.selectedIndex].selected = false; // Deselect the last selection
    }
});


// Select all checkboxes in the group
const checkboxes = document.querySelectorAll('.checkbox-group input[type="checkbox"]');

checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
            // Uncheck all other checkboxes
            checkboxes.forEach((otherCheckbox) => {
                if (otherCheckbox !== checkbox) {
                    otherCheckbox.checked = false;
                }
            });
        }
    });
});
