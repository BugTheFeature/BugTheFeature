import { db } from './firebase.js';
import {
  collection, getDocs, updateDoc, doc, deleteDoc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

let password = localStorage.getItem("adminPassword") || "Admin";

document.getElementById("loginButton").addEventListener("click", async () => {
  const entered = document.getElementById("adminPassword").value;
  if (entered === password) {
    document.getElementById("adminPanel").style.display = "block";
    document.getElementById("loginSection").style.display = "none";
    loadNames();
  } else {
    alert("Falsches Passwort.");
  }
});

document.getElementById("changePass").addEventListener("click", () => {
  const code = document.getElementById("codeInput").value;
  const newPass = document.getElementById("newPass").value;
  if (code === "Lili liebt es Ausbilder AVs zu machen") {
    localStorage.setItem("adminPassword", newPass);
    password = newPass;
    alert("Passwort geändert.");
  } else {
    alert("Falscher Wartungscode.");
  }
});

async function loadNames() {
  const query = await getDocs(collection(db, "unsichere_namen"));
  const list = document.getElementById("nameList");
  list.innerHTML = "";

  query.forEach(docSnap => {
    const li = document.createElement("li");
    li.textContent = docSnap.data().name;
    const yes = document.createElement("button");
    const no = document.createElement("button");
    yes.textContent = "✅";
    no.textContent = "❌";

    yes.onclick = async () => {
      await updateDoc(doc(db, "unsichere_namen", docSnap.id), { status: "akzeptiert" });
      li.remove();
    };
    no.onclick = async () => {
      await deleteDoc(doc(db, "unsichere_namen", docSnap.id));
      li.remove();
    };

    li.appendChild(yes);
    li.appendChild(no);
    list.appendChild(li);
  });
}
