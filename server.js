const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());





// Connect to MySQL workbench 
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "  ",
  database: "  "
});



// Check connection true or false 
db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    return;
  }
  console.log("Connected to MySQL database.");
});















// ----------------- ROUTE FOR ADD BOOK -----------------
app.post("/add-book", (req, res) => {
  const { title, author, isbn, publisher, year, category, quantity } = req.body;
  const sql = ` INSERT INTO books2 (title, author, isbn, publisher, year, category, quantity)
  VALUES (?, ?, ?, ?, ?, ?, ?)
  ON DUPLICATE KEY UPDATE quantity = quantity + VALUES(quantity);
`;

  db.query(sql, [title, author, isbn, publisher, year, category, quantity], (err, result) => {
    if (err) {
      console.error("Error adding book:", err);
      return res.status(500).json({ message: "Database error" });
    }
    res.status(200).json({ message: "Book added successfully" });
  });
});












// ----------------- NEW ROUTE FOR ISSUE BOOK -----------------
app.post("/issue-book", (req, res) => {
  const { book_name, student_name, student_id, issue_date, return_date } = req.body;
  const sql = `INSERT INTO issued_books2 (book_name, student_name, student_id, issue_date, return_date) VALUES (?, ?, ?, ?, ?)`;

  db.query(sql, [book_name, student_name, student_id, issue_date, return_date], (err, result) => {
    if (err) {
      console.error("Error issuing book:", err);
      return res.status(500).json({ message: "Database error" });
    }
    res.status(200).json({ message: "Book issued successfully" });
  });
});












// for search books record 
app.get('/searchbook', (req, res) => {
  const searchTitle = req.query.title.toLowerCase();
  
  if (!searchTitle) {
    return res.json([]);
  }

  const sql = 'SELECT id, title, author, isbn, publisher, year, category, quantity FROM library2.books2 WHERE LOWER(title) LIKE ?';
  db.query(sql, [`%${searchTitle}%`], (err, result) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(result);
  });
});


// for issued book list to see

app.get('/issued_books2', (req, res) => {
  const sql = `
    SELECT student_name AS studentName, book_name AS bookTitle, issue_date AS issueDate
    FROM  library2.issued_books2
  `;
  
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(result);
  });
});







app.get('/test', (req, res) => {
  res.send('Server is working!');
});



//  Dashboard

app.get('/issued-books', (req, res) => {
  const sql = `SELECT student_name, student_id, COUNT(*) AS total_books_issued FROM issued_books2 GROUP BY student_name, student_id`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});


// this is for return book
app.get('/returned-books', (req, res) => {
  const sql = `SELECT 
  student_name, 
  student_id, 
  COUNT(*) AS total_books_returned 
FROM returned_books 
WHERE actual_return_date IS NOT NULL 
GROUP BY student_name, student_id;
`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});


// this is for stock 
app.get('/low-stock-books', (req, res) => {
  const sql = `SELECT * FROM books2 WHERE quantity < 5`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});








//  this is for return book form;

app.post('/return-book', (req, res) => {
  const { studentId, studentName, bookTitle, returnDate } = req.body;

  const insertSQL = `
    INSERT INTO returned_books (student_id, student_name, book_name, actual_return_date)
    VALUES (?, ?, ?, ?)
  `;

  db.query(insertSQL, [studentId, studentName, bookTitle, returnDate], (err, result) => {
    if (err) {
      console.error('Error inserting return record:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    res.status(200).json({ message: 'Book return recorded successfully' });
  });
});






//  this is for penalty page;

app.get('/penalties', (req, res) => {
 const query = 'SELECT student_id, student_name, book_name, issue_date, return_date, penalty_amount FROM library2.penalties ORDER BY id DESC';

  
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching penalties:', err);
      return res.status(500).json({ error: err.message });
    }
    
    res.json(results); // this Send penalty data to frontend
  });
});


// Start server
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});


