import { db } from "./firebase.js";

import {
collection,
addDoc,
getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Load all students
async function loadStudents(){

const table=document.getElementById("studentTable");

table.innerHTML="";

const querySnapshot=await getDocs(collection(db,"students"));

querySnapshot.forEach((doc)=>{

const student=doc.data();

table.innerHTML+=`
<tr>
<td>${student.name}</td>
<td>${student.class}</td>
<td>${student.attendance}%</td>
<td>${student.marks}%</td>
<td>${student.fees}</td>
<td>
<button>Edit</button>
<button>Delete</button>
</td>
</tr>
`;

});

}

// Add student
const addButton=document.querySelector(".add-btn");

addButton.addEventListener("click",async()=>{

const inputs=document.querySelectorAll(".section input");

const fees=document.querySelector("select");

try{

await addDoc(collection(db,"students"),{

name:inputs[0].value,

class:inputs[1].value,

attendance:Number(inputs[2].value),

marks:Number(inputs[3].value),

fees:fees.value

});

alert("Student Added Successfully!");

loadStudents();

}catch(error){

alert(error.message);

}

});

// First load
loadStudents();
