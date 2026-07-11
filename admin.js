import { db } from "./firebase.js";

import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const table = document.getElementById("studentTable");
let editingStudentId = null;
// Load all students
async function loadStudents() {

  table.innerHTML = "";

  const querySnapshot = await getDocs(collection(db, "students"));

  querySnapshot.forEach((studentdoc) => {

    const student = studentdoc.data();

    table.innerHTML += `
      <tr>
        <td>${student.name}</td>
        <td>${student.class}</td>
        <td>${student.attendance}%</td>
        <td>${student.marks}%</td>
        <td>${student.fees}</td>
        <td>
<button class="editBtn" data-id="${studentDoc.id}">
Edit
</button>

<button class="deleteBtn" data-id="${studentDoc.id}">
Delete
</button>
</td>
      </tr>
    `;

  });

}

// Add student
document.querySelector(".add-btn").addEventListener("click", async () => {

  const inputs = document.querySelectorAll(".section input");
  const fees = document.querySelector("select");

  await addDoc(collection(db, "students"), {
    name: inputs[0].value,
    class: inputs[1].value,
    attendance: Number(inputs[2].value),
    marks: Number(inputs[3].value),
    fees: fees.value
  });

  alert("Student Added Successfully!");

  loadStudents();

});

loadStudents();
document.addEventListener("click", async (e) => {

  if (e.target.classList.contains("deleteBtn")) {

    const id = e.target.dataset.id;

    if (confirm("Delete this student?")) {

      await deleteDoc(doc(db, "students", id));

      alert("Student Deleted");

      loadStudents();

    }

  }

});
document.addEventListener("click", async (e) => {

  if (e.target.classList.contains("editBtn")) {

    editingStudentId = e.target.dataset.id;

    const row = e.target.closest("tr");
    const cells = row.querySelectorAll("td");

    const inputs = document.querySelectorAll(".section input");
    const fees = document.querySelector("select");

    inputs[0].value = cells[0].textContent;
    inputs[1].value = cells[1].textContent;
    inputs[2].value = cells[2].textContent.replace("%","");
    inputs[3].value = cells[3].textContent.replace("%","");
    fees.value = cells[4].textContent;

    document.querySelector(".add-btn").style.display = "none";
    document.querySelector(".update-btn").style.display = "inline-block";

  }

});
document.querySelector(".update-btn").addEventListener("click", async () => {

  const inputs = document.querySelectorAll(".section input");
  const fees = document.querySelector("select");

  await updateDoc(doc(db, "students", editingStudentId), {

    name: inputs[0].value,
    class: inputs[1].value,
    attendance: Number(inputs[2].value),
    marks: Number(inputs[3].value),
    fees: fees.value

  });

  alert("Student Updated Successfully!");

  document.querySelector(".add-btn").style.display = "inline-block";
  document.querySelector(".update-btn").style.display = "none";

  loadStudents();

});
