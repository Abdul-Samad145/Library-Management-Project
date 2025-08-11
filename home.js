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
      
        try {
         
          const response = await fetch('http://localhost:3000/add-book', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(bookData),
            credentials: 'include' 
          });
      
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to add book');
          }
      
          const result = await response.json();
          alert("Book added successfully!");
          this.reset();
        } catch (error) {
          console.error('Error:', error);
          alert(`Error: ${error.message}`);
        }
      });