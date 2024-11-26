// Helper Functions for Local Storage Operations
function getUsers() {
    return JSON.parse(localStorage.getItem("users")) || [];
  }
  
  function saveUsers(users) {
    localStorage.setItem("users", JSON.stringify(users));
  }
  
  // Function to render users in the table
  function renderUsers(page = 1, perPage = 10) {
    const users = getUsers();
    const tbody = document.querySelector("#userTable tbody");
    const totalUsers = users.length;
  
    // Pagination Logic
    const startIndex = (page - 1) * perPage;
    const endIndex = Math.min(startIndex + perPage, totalUsers);
    const currentUsers = users.slice(startIndex, endIndex);
  
    // Clear existing table rows
    tbody.innerHTML = '';
  
    if (currentUsers.length === 0) {
      tbody.innerHTML = "<tr><td colspan='5'>No users found</td></tr>";
    } else {
      currentUsers.forEach(user => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${user.id}</td>
          <td>${user.firstName}</td>
          <td>${user.lastName}</td>
          <td>${user.email}</td>
          <td>${user.department}</td>
        `;
        tbody.appendChild(row);
      });
    }
  
    // Render Pagination
    const pagination = document.querySelector("#pagination");
    const totalPages = Math.ceil(totalUsers / perPage);
    let paginationHTML = '';
  
    for (let i = 1; i <= totalPages; i++) {
      paginationHTML += `
        <button class="pagination-btn" onclick="changePage(${i})">${i}</button>
      `;
    }
  
    pagination.innerHTML = paginationHTML;
    setActivePage(page);
  }
  
  // Set Active Page Style
  function setActivePage(page) {
    const buttons = document.querySelectorAll(".pagination-btn");
    buttons.forEach((btn, index) => {
      if (index + 1 === page) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });
  }
  
  // Change Page
  function changePage(page) {
    renderUsers(page);
  }
  
  // Add User
  if (document.getElementById("addUserBtn")) {
    document.getElementById("addUserBtn").addEventListener("click", () => {
      const id = document.getElementById("userId").value.trim();
      const firstName = document.getElementById("firstName").value.trim();
      const lastName = document.getElementById("lastName").value.trim();
      const email = document.getElementById("email").value.trim();
      const department = document.getElementById("department").value.trim();
  
      if (!id || !firstName || !lastName || !email || !department) {
        alert("All fields are required!");
        return;
      }
  
      const users = getUsers();
  
      if (users.some(user => user.id === id)) {
        alert("User ID already exists!");
        return;
      }
  
      users.push({ id, firstName, lastName, email, department });
      saveUsers(users);
  
      alert("User added successfully!");
      document.getElementById("userForm").reset();
      renderUsers(1); // Re-render users after adding a new user
    });
  }
  
  // Update User
  if (document.getElementById("updateUserBtn")) {
    document.getElementById("updateUserBtn").addEventListener("click", () => {
      const id = document.getElementById("updateId").value.trim();
      const firstName = document.getElementById("updateFirstName").value.trim();
      const lastName = document.getElementById("updateLastName").value.trim();
      const email = document.getElementById("updateEmail").value.trim();
      const department = document.getElementById("updateDepartment").value.trim();
  
      if (!id) {
        alert("User ID is required to update details!");
        return;
      }
  
      const users = getUsers();
      const userIndex = users.findIndex(user => user.id === id);
  
      if (userIndex === -1) {
        alert("User not found!");
        return;
      }
  
      if (firstName) users[userIndex].firstName = firstName;
      if (lastName) users[userIndex].lastName = lastName;
      if (email) users[userIndex].email = email;
      if (department) users[userIndex].department = department;
  
      saveUsers(users);
  
      alert("User updated successfully!");
      document.getElementById("updateForm").reset();
      renderUsers(1); // Re-render users after updating
    });
  }
  
  // Delete User
  if (document.getElementById("deleteUserBtn")) {
    document.getElementById("deleteUserBtn").addEventListener("click", () => {
      const id = document.getElementById("deleteId").value.trim();
  
      if (!id) {
        alert("User ID is required to delete a user!");
        return;
      }
  
      let users = getUsers();
      const userIndex = users.findIndex(user => user.id === id);
  
      if (userIndex === -1) {
        alert("User not found!");
        return;
      }
  
      users = users.filter(user => user.id !== id);
      saveUsers(users);
  
      alert("User deleted successfully!");
      document.getElementById("deleteForm").reset();
      renderUsers(1); // Re-render users after deletion
    });
  }
  
  // View Users
  if (document.getElementById("userTable")) {
    renderUsers(1); // Initial render
  }
  