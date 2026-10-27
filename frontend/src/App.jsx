import { useState } from "react";
import AthleteList from "./components/AthleteList";
import AthleteForm from "./components/AthleteForm";

function App() {
  const [editingAthlete, setEditingAthlete] = useState(null);
  const [formKey, setFormKey] = useState(0);

  function handleEdit(athlete) {
    setEditingAthlete(athlete);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleSaved() {
    setEditingAthlete(null);
    setFormKey((previous) => previous + 1);
  }

  function handleCancel() {
    setEditingAthlete(null);
    setFormKey((previous) => previous + 1);
  }

  return (
    <div className="min-vh-100 bg-light">
      <header className="bg-primary text-white py-4 shadow-sm">
        <div className="container">
          <h1 className="h2 mb-1">Urheilijat</h1>
          <p className="mb-0">Urheilijoiden tietojen hallinta</p>
        </div>
      </header>

      <main className="container py-5">
        <AthleteForm
          key={formKey}
          editingAthlete={editingAthlete}
          onCancel={handleCancel}
          onSaved={handleSaved}
        />

        <div className="mb-4">
          <h2 className="h4">Urheilijalista</h2>
          <p className="text-secondary">
            Tiedot haetaan MariaDB-tietokannasta REST-rajapinnan kautta.
          </p>
        </div>

        <AthleteList onEdit={handleEdit} />
      </main>

      <footer className="container pb-4 text-secondary small">
        Urheilijat-sovellus · React + Express + MariaDB
      </footer>
    </div>
  );
}

export default App;
