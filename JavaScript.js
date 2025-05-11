// Configura Firebase
const firebaseConfig = {
    apiKey: "TU_API_KEY",
    authDomain: "TU_AUTH_DOMAIN",
    databaseURL: "TU_DATABASE_URL",
    projectId: "TU_PROJECT_ID",
    storageBucket: "TU_STORAGE_BUCKET",
    messagingSenderId: "TU_MESSAGING_SENDER_ID",
    appId: "TU_APP_ID"
};

const app = firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// Insertar un nuevo registro
document.getElementById('myForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    if (name && email) {
        const newUserRef = db.ref('users').push();
        newUserRef.set({
            name: name,
            email: email
        }).then(() => {
            alert('Registro exitoso');
            document.getElementById('myForm').reset();
        }).catch((error) => {
            alert('Error al registrar: ' + error.message);
        });
    }
});

// Consultar los registros de la base de datos
document.getElementById('fetchDataBtn').addEventListener('click', function () {
    const dataList = document.getElementById('dataList');
    dataList.innerHTML = '';  // Limpiar la lista antes de mostrar nuevos datos

    db.ref('users').once('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            const userData = childSnapshot.val();
            const li = document.createElement('li');
            li.textContent = `Nombre: ${userData.name}, Correo: ${userData.email}`;
            dataList.appendChild(li);
        });
    });
});
