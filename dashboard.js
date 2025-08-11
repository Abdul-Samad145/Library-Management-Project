  async function fetchData(endpoint, tableId, headers) {
      try {
        const res = await fetch(`http://localhost:5000/${endpoint}`);
        const data = await res.json();
        const table = document.getElementById(tableId);
        const tbody = table.querySelector("tbody");
        tbody.innerHTML = ""; 
  
        data.forEach(row => {
          const tr = document.createElement("tr");
          tr.innerHTML = headers.map(h => `<td>${row[h] ?? ''}</td>`).join("");
          tbody.appendChild(tr);
        });
      } catch (error) {
        console.error(`Error fetching ${endpoint}:`, error);
      }
    }
  
    fetchData('issued-books', 'issuedTable', ['student_name', 'student_id', 'total_books_issued']);
    fetchData('returned-books', 'returnedTable', ['student_name', 'student_id', 'total_books_returned']);
    fetchData('low-stock-books', 'stockTable', ['title', 'author', 'quantity']);
    fetchData('overdue-penalties', 'penaltyTable', ['student_name', 'student_id', 'book_name', 'overdue_days', 'penalty']);
