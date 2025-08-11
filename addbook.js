 function navigate(page) {
      window.location.href = page;
    }

   function logout() {

  localStorage.removeItem('currentUser');
  window.location.href = 'signin.html';
}

    document.getElementById("addBookForm").addEventListener("submit", async function(e) {
        e.preventDefault();
        

        const bookData = {
          title: document.getElementById("title").value,
          author: document.getElementById("author").value,
          isbn: document.getElementById("isbn").value,
          publisher: document.getElementById("publisher").value,
          year: document.getElementById("year").value,
          category: document.getElementById("category").value,
          quantity: document.getElementById("quantity").value
        };
    
        console.log("Submitting book data:", bookData);
    
        try {
     
          const response = await fetch('http://localhost:5000/add-book', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(bookData)
          });
    
          console.log("Response status:", response.status);
          
          const result = await response.json();
          console.log("Server response:", result);
          
          if (response.ok) {
            alert("Book added successfully!");
            this.reset();
          } else {
            alert("Error: " + (result.message || "Failed to add book"));
          }
        } catch (error) {
          console.error('Error:', error);
          alert("Network error - please try again. Check console for details.");
        }
      });