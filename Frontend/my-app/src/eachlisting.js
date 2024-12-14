
    //will need to alter this file for the specific item uploaded (alter unique identifier)
    //you can prob keep this id for the pie listing and then create a new one for the specific listing being uploaded
    
    // Check if this listing is already bookmarked
    const bookmarkButton = document.getElementById("bookmarkButton");
    const pieListingId = "made-pies-listing";  // Unique identifier for this listing
  
    // Check the bookmark status in localStorage
    const isBookmarked = localStorage.getItem(pieListingId) === "true";
    
    // Update the button based on bookmark status
    if (isBookmarked) {
      bookmarkButton.textContent = "✅ Saved";
    }
  
    // Toggle bookmark status when the button is clicked
    bookmarkButton.addEventListener("click", function() {
      const currentStatus = localStorage.getItem(pieListingId);
      
      if (currentStatus === "true") {
        localStorage.setItem(pieListingId, "false");
        bookmarkButton.textContent = "✓ Save";
        alert("This listing has been removed from your Saved Items in History.");
      } else {
        localStorage.setItem(pieListingId, "true");
        bookmarkButton.textContent = "✅ Saved";
        alert("This listing has been added to your Saved Items in History.");
      }
    });