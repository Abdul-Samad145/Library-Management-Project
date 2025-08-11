 function navigate(page) {
      window.location.href = page;
    }

    function logout() {
 
  localStorage.removeItem('currentUser');
  window.location.href = 'signin.html';
}


     fetch('http://localhost:5000/penalties')
    .then(response => response.json())
    .then(data => {
      const penaltyTable = document.getElementById('penaltyTable');
      penaltyTable.innerHTML = ''; // Clear any existing rows
      
      data.forEach(row => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${row.student_id}</td>
          <td>${row.student_name}</td>
          <td>${row.book_name}</td>
          <td>${row.issue_date}</td>
          <td>${row.return_date}</td>
          <td>Rs. ${row.penalty_amount}</td>
        `;
        penaltyTable.appendChild(tr);
      });
    })
    .catch(err => console.error('Error fetching penalty data:', err));
