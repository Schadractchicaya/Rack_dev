var express = require('express');
var mongoose = require('mongoose');

var index = express();
index.use(express.json()); // Middleware pour parser les requêtes JSON

// 1️⃣ Connexion à MongoDB avec Mongoose
var uri = "mongodb://localhost:27017/myDatabase"; // URI de la base de données
mongoose.connect(uri)
    .then(function () {
        console.log("✅ Connecté à MongoDB avec Mongoose");
    })
    .catch(function (err) {
        console.error("❌ Erreur de connexion à MongoDB :", err);
    });

// 2️⃣ Définition du schéma pour la collection "employees"
var employeeSchema = new mongoose.Schema({
    name: String,
    position: String,
    salary: Number
});

var Employee = mongoose.model("Employee", employeeSchema); // Modèle MongoDB

// 3️⃣ Fonction pour calculer la prime
function calculerPrime(salary, position) {
    return (position.toLowerCase() === "manager") ? salary * 0.10 : salary * 0.05;
}

// 4️⃣ Route d'accueil
index.get('/', function (req, res) {
    res.send('<h1>Bienvenue sur l\'API des employés !</h1><p>Utilisez <code>/employees</code> pour voir la liste des employés.</p>');
});

// 5️⃣ Route pour ajouter un employé avec sa prime
index.post("/employees", async function (req, res) {
    try {
        var { name, position, salary } = req.body;
        var prime = calculerPrime(salary, position); // Calcul de la prime

        var newEmployee = new Employee({ name, position, salary });
        await newEmployee.save(); // Sauvegarde dans MongoDB

        res.status(201).json({
            message: "✅ Employé ajouté avec succès",
            employee: {
                name: newEmployee.name,
                position: newEmployee.position,
                salary: newEmployee.salary,
                prime: prime.toFixed(2) // Afficher la prime avec 2 décimales
            }
        });
    } catch (err) {
        res.status(500).json({ message: "❌ Erreur lors de l'ajout de l'employé", error: err.message });
    }
});

// 6️⃣ Route pour récupérer tous les employés et afficher sous forme de tableau HTML
index.get("/employees", async function (req, res) {
    try {
        var employees = await Employee.find();

        // Construction du tableau HTML
        var tableHTML = `
            <h1>✅ Liste des Employés</h1>
            <table border="1" cellspacing="0" cellpadding="10">
                <tr>
                    <th>Nom</th>
                    <th>Poste</th>
                    <th>Salaire (€)</th>
                    <th>Prime (€)</th>
                </tr>
        `;

        employees.forEach(emp => {
            var prime = calculerPrime(emp.salary, emp.position).toFixed(2);
            tableHTML += `
                <tr>
                    <td>${emp.name}</td>
                    <td>${emp.position}</td>
                    <td>${emp.salary}</td>
                    <td>${prime}</td>
                </tr>
            `;
        });

        tableHTML += `</table>`;

        res.send(tableHTML);
    } catch (err) {
        res.status(500).send("<h3>❌ Erreur lors de la récupération des employés</h3><p>" + err.message + "</p>");
    }
});

// 7️⃣ Démarrer le serveur sur le port 5000
var PORT = process.env.PORT || 5000;
index.listen(PORT, function () {
    console.log("✅ Index listening on port " + PORT);
});
