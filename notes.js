import { db } from "./firebase.js";

import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const notesContainer = document.getElementById("notesContainer");

async function loadNotes() {

  notesContainer.innerHTML = "";

  const querySnapshot = await getDocs(collection(db, "notes"));

  if (querySnapshot.empty) {
    notesContainer.innerHTML = "<h3>No study materials available.</h3>";
    return;
  }

  querySnapshot.forEach((doc) => {

    const note = doc.data();

    notesContainer.innerHTML += `
      <div class="note">
        <h3>${note.title}</h3>

        <p><b>Class:</b> ${note.class}</p>

        <p><b>Subject:</b> ${note.subject}</p>

        <a href="${note.link}" target="_blank">
          📄 Open PDF
        </a>
      </div>
    `;

  });

}

loadNotes();
