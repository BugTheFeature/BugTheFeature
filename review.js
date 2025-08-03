let currentPassword = "Admin";

function login() {
  const input = document.getElementById("adminPassword").value;
  db.ref("settings/admin_password").once("value", snap => {
    currentPassword = snap.val() || "Admin";
    if (input === currentPassword) {
      document.getElementById("adminPanel").style.display = "block";
      document.getElementById("loginBox").style.display = "none";
      loadNames();
    } else {
      alert("Falsches Passwort!");
    }
  });
}

function loadNames() {
  const list = document.getElementById("nameList");
  list.innerHTML = "";
  db.ref("unsure_names").once("value", snap => {
    snap.forEach(child => {
      const entry = child.val();
      if (entry.status === "pending") {
        const li = document.createElement("li");
        li.textContent = entry.name + " ";
        const yes = document.createElement("button");
        yes.textContent = "✅";
        yes.onclick = () => review(child.key, entry.name, "approved");
        const no = document.createElement("button");
        no.textContent = "❌";
        no.onclick = () => review(child.key, entry.name, "denied");
        li.appendChild(yes);
        li.appendChild(no);
        list.appendChild(li);
      }
    });
  });
}

function review(key, name, result) {
  db.ref("reviewed_names/" + key).set({
    name: name,
    result: result,
    reviewed_by: "Admin",
    reviewed_at: new Date().toISOString()
  });
  db.ref("unsure_names/" + key).update({ status: result });
  loadNames();
}

function changePassword() {
  const code = document.getElementById("maintenanceCode").value;
  const newPw = document.getElementById("newPassword").value;
  if (code === "Lili liebt es Ausbilder AVs zu machen") {
    db.ref("settings").update({ admin_password: newPw });
    alert("Passwort geändert.");
  } else {
    alert("Falscher Wartungscode!");
  }
}
