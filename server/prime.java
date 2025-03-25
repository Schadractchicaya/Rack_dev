public class Prime {
    private String name;
    private String position;
    private double salary;

    // Constructeur
    public Prime(String name, String position, double salary) {
        this.name = name;
        this.position = position;
        this.salary = salary;
    }

    // Getters
    public String getName() {
        return name;
    }

    public String getPosition() {
        return position;
    }

    public double getSalary() {
        return salary;
    }

    // Méthode pour calculer la prime annuelle
    public double calculateBonus() {
        double bonusRate = position.equalsIgnoreCase("Manager") ? 0.10 : 0.05;
        return salary * bonusRate;
    }

    // Méthode pour obtenir le pourcentage de prime
    public double getBonusPercentage() {
        return position.equalsIgnoreCase("Manager") ? 10 : 5;
    }

    // Affichage des informations de l'employé avec sa prime et son pourcentage
    public void displayInfoWithBonus() {
        System.out.println("Nom: " + name + ", Poste: " + position + ", Salaire: " + salary + 
                " FCFA, Prime annuelle: " + calculateBonus() + " FCFA (" + getBonusPercentage() + "%)");
    }

    public static void main(String[] args) {
        // Création d'une liste d'employés
        Prime emp1 = new Prime("Alice", "Manager", 900000);
        Prime emp2 = new Prime("Bob", "Développeur", 750000);
        Prime emp3 = new Prime("Charlie", "Technicien", 500000);

        // Affichage des employés avec leur prime et leur pourcentage
        System.out.println("Liste des employés avec leurs primes:");
        emp1.displayInfoWithBonus();
        emp2.displayInfoWithBonus();
        emp3.displayInfoWithBonus();
    }
}
