 function navigate(page) {
      window.location.href = page;
    }

  function logout() {

  localStorage.removeItem('currentUser');
  window.location.href = 'signin.html';
}



 async function fetchIssuedBooks() {
    try {
    
      const response = await fetch('http://localhost:5000/issued_books2');

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const issuedBooks = await response.json(); 

      const tableBody = document.getElementById('issuedBooksTable');
      tableBody.innerHTML = ''; 

      issuedBooks.forEach(book => {
        const row = document.createElement('tr');

        const studentCell = document.createElement('td');
        studentCell.textContent = book.studentName;

        const titleCell = document.createElement('td');
        titleCell.textContent = book.bookTitle;

        const dateCell = document.createElement('td');
        dateCell.textContent = book.issueDate;

        row.appendChild(studentCell);
        row.appendChild(titleCell);
        row.appendChild(dateCell);

        tableBody.appendChild(row);
      });



   
      document.getElementById('totalIssued').textContent = issuedBooks.length;

      
    } catch (error) {
      console.error('Error fetching issued books:', error);
    }
  }

  window.addEventListener('DOMContentLoaded', fetchIssuedBooks);
    