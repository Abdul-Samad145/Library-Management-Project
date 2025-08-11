  function navigate(page) {
      window.location.href = page;
    }

   function logout() {

  localStorage.removeItem('currentUser');
  window.location.href = 'signin.html';
}


    document.getElementById('returnBookForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const data = {
      studentId: document.getElementById('studentId').value,
      studentName: document.getElementById('studentName').value,
      bookTitle: document.getElementById('bookTitle').value,
      returnDate: document.getElementById('returnDate').value
    };

    
    fetch('http://localhost:5000/return-book', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(response => {
      alert(response.message);
      document.getElementById('returnBookForm').reset();
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Error returning book.');
    });
  });