const form = document.getElementById("employee-form");
const tableBody = document.querySelector("#employee-table tbody");
const searchInput = document.getElementById("search");

function loadEmployees() {
  const employees = JSON.parse(localStorage.getItem("employees")) || [];
  tableBody.innerHTML = "";
  employees.forEach((employee, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${employee.name}</td>
            <td>${employee.department}</td>
            <td>${employee.email}</td>
            <td>${employee.role}</td>
            <td><button class="delete-btn" onclick="deleteEmployee(${index})">Delete</button></td>
        `;
    tableBody.appendChild(row);
  });
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const employee = {
    name: document.getElementById("name").value,
    department: document.getElementById("department").value,
    email: document.getElementById("email").value,
    role: document.getElementById("role").value
  };

  const employees = JSON.parse(localStorage.getItem("employees")) || [];
  employees.push(employee);
  localStorage.setItem("employees", JSON.stringify(employees));
  loadEmployees();
  form.reset();
});

function deleteEmployee(index) {
  const employees = JSON.parse(localStorage.getItem("employees")) || [];
  employees.splice(index, 1);
  localStorage.setItem("employees", JSON.stringify(employees));
  loadEmployees();
}

document.getElementById("export-btn").addEventListener("click", function () {
  const employees = JSON.parse(localStorage.getItem("employees")) || [];
  if (employees.length === 0) {
    alert("No data to export.");
    return;
  }

  let csv = "Name,Department,Email,Role\n";

  employees.forEach((emp) => {
    csv += `${emp.name},${emp.department},${emp.email},${emp.role}\n`;
  });

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", "employees.csv");
  link.click();
});

searchInput.addEventListener("input", function () {
  const query = this.value.toLowerCase();
  const rows = document.querySelectorAll("#employee-table tbody tr");
  rows.forEach((row) => {
    const name = row.cells[0].textContent.toLowerCase();
    const dept = row.cells[1].textContent.toLowerCase();
    row.style.display =
      name.includes(query) || dept.includes(query) ? "" : "none";
  });
});

loadEmployees();
