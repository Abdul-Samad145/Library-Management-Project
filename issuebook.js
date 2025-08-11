 document.getElementById("issueBookForm").addEventListener("submit", async function(e) {
      e.preventDefault();

      const issueData = {
        book_name: document.getElementById("book_name").value,
        student_name: document.getElementById("student_name").value,
        student_id: document.getElementById("student_id").value,
        issue_date: document.getElementById("issue_date").value,
        return_date: document.getElementById("return_date").value
      };

      try {
        const response = await fetch("http://localhost:5000/issue-book", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(issueData)
        });

        const result = await response.json();

        if (response.ok) {
          alert("Book issued successfully!");
          this.reset();
        } else {
          alert("Error: " + (result.message || "Failed to issue book"));
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Network error");
      }
    });