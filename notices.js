import { db } from "./firebase.js";

import {
collection,
getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const noticeContainer = document.getElementById("noticeContainer");

async function loadNotices(){

noticeContainer.innerHTML="";

const snapshot=await getDocs(collection(db,"notices"));

if(snapshot.empty){

noticeContainer.innerHTML="<h3>No notices available.</h3>";

return;

}

snapshot.forEach((doc)=>{

const notice=doc.data();

noticeContainer.innerHTML+=`

<div class="notice">

<h2>${notice.title}</h2>

<div class="date">${notice.date}</div>

<p>${notice.message}</p>

</div>

`;

});

}

loadNotices();
