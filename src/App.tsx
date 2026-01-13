// App.tsx
import { useState } from "react";
import "./App.css";

import EmployeeCard from "./components/EmployeeCard";

// Types correspondant à la réponse de randomuser.me
type Employee = {
  name: {
    first: string;
    last: string;
  };
  email: string;
  picture: {
    medium: string;
  };
};

// Valeur de départ (peut rester vide si vous préférez)
const sampleEmployee: Employee = {
  name: { first: "Charlie", last: "Thompson" },
  email: "charlie.thompson@example.com",
  picture: {
    medium: "https://randomuser.me/api/portraits/med/men/40.jpg",
  },
};

function App() {
  const [employee, setEmployee] = useState<Employee>(sampleEmployee);

  // Fonction appelée au clic du bouton
  const getEmployee = async () => {
    try {
      const response = await fetch("https://randomuser.me/api?nat=en");
      const data = await response.json();

      // randomuser.me renvoie un tableau `results`
      const newEmp = data.results[0];
      // On ne garde que les champs dont on a besoin
      const formatted: Employee = {
        name: {
          first: newEmp.name.first,
          last: newEmp.name.last,
        },
        email: newEmp.email,
        picture: {
          medium: newEmp.picture.medium,
        },
      };

      setEmployee(formatted);
    } catch (err) {
      console.error("Erreur lors de la récupération de l'employé :", err);
    }
  };

  return (
    <div className="App">
      {/* Bouton pour déclencher la récupération */}
      <button type="button" onClick={getEmployee}>
        Get Employee
      </button>

      {/* Affichage de la carte */}
      <EmployeeCard employee={employee} />
    </div>
  );
}

export default App;