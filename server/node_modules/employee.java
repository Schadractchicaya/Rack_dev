import java.util.*;

class Employee {
    private String name;
    private String position;
    private double salary;

    public Employee(String name, String position, double salary) {
        this.name = name;
        this.position = position;
        this.salary = salary;
    }

    public double getSalary() {
        return salary;
    }

    @Override
    public String toString() {
        return "Employee{name='" + name + "', position='" + position + "', salary=" + salary + "}";
    }

    public static List<Employee> sortBySalaryDescending(List<Employee> employees) {
        employees.sort((e1, e2) -> Double.compare(e2.getSalary(), e1.getSalary()));
        return employees;
    }

    public static void main(String[] args) {
        List<Employee> employees = new ArrayList<>();
        employees.add(new Employee("Alice", "Manager", 60000));
        employees.add(new Employee("Bob", "Developer", 50000));
        employees.add(new Employee("Charlie", "Designer", 55000));
        
        System.out.println("Liste triée par salaire décroissant :");
        List<Employee> sortedEmployees = sortBySalaryDescending(employees);
        sortedEmployees.forEach(System.out::println);
    }
}
