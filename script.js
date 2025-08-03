import { db } from './firebase.js';
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const allowedNames = [
  "Bug", "Ice", "Ghost", "Rooster", "Black", "Apollo", "Dust", "Cheek", "Drifter", "Seal", "Fire", "Charger",
  "Overwatch", "Doc", "Phaze", "One", "Seven", "Grave", "Chess", "Hive", "Striker", "Crow", "Twin", "Lacky",
  "Comb", "Break", "Brake", "Skyfall", "Downfall", "Ferris", "Iron", "Burn", "Maze", "Cookie", "Blackscare",
  "Bigshot", "Reacher", "Flame", "Brech", "Action", "Arch", "Decon", "Impact", "Duty", "Chaos", "Bit", "Cycle"
];

document.getElementById("checkButton").addEventListener("click", async () => {
  const name = document.getElementById("nameInput").value.trim();
  const result = document.getElementById("result");

  const valid = /^[a-zA-Z]+$/.test(name) && !["fives", "fox", "hunter", "echo", "nazi", "nizi", "jackson", "morty", "bobby", "randy", "gru", "garry"].some(bad => name.toLowerCase().includes(bad));
  
  if (allowedNames.includes(name)) {
    result.textContent = "✅ Name ist gültig.";
  } else if (valid && name.length <= 12) {
    result.textContent = "⚠️ Name fragwürdig – wird gespeichert.";
    await addDoc(collection(db, "unsichere_namen"), {
      name: name,
      status: "unbestätigt",
      time: new Date()
    });
  } else {
    result.textContent = "❌ Ungültiger Name.";
  }
});
