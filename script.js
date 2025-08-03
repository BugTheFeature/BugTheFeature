const goodNames = ["Bug","Ice","Ghost","Rooster","Black","Apollo","Dust","Cheek","Drifter","Seal","Fire","Charger","Overwatch","Doc","Phaze","One","Seven","Grave","Chess","Hive","Striker","Crow","Twin","Lacky","Comb","Break","Brake","Skyfall","Downfall","Ferris","Iron","Burn","Maze","Cookie","Blackscare","Bigshot","Reacher","Flame","Brech","Action","Arch","Decon","Impact","Duty","Chaos","Bit","Cycle"];

const badNames = ["Moabibta","Ayalegga","Setropi","Snacku","Ranjid","Garry","Fives","Fox","Hunter","Echo","Nizi","Jackson","Morty","Etarak","Bobby","Randy","Gru","Terentiev","Kudsagow"];

function checkName() {
  const name = document.getElementById("nameInput").value.trim();
  const result = document.getElementById("result");
  const suggestions = document.getElementById("suggestions");
  suggestions.innerHTML = "";

  if (!name || name.length > 20) {
    result.textContent = "❌ Ungültiger Name.";
    return;
  }

  const lower = name.toLowerCase();

  if (badNames.some(b => lower.includes(b.toLowerCase())) || /[^a-zA-Z]/.test(name)) {
    result.textContent = "❌ Nicht lore-konform.";
    return;
  }

  if (goodNames.includes(name)) {
    result.textContent = "✅ Lore-konform.";
    return;
  }

  // Unsicher → speichern
  result.textContent = "⚠️ Unsicher – gespeichert zur Überprüfung.";
  const entryRef = db.ref("unsure_names").push();
  entryRef.set({
    name: name,
    timestamp: new Date().toISOString(),
    status: "pending"
  });

  // Vorschläge ausgeben
  for (let i = 0; i < 5; i++) {
    const suggestion = goodNames[Math.floor(Math.random() * goodNames.length)];
    const li = document.createElement("li");
    li.textContent = suggestion;
    suggestions.appendChild(li);
  }
}
