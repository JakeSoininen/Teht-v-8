import { useState } from "react";
import { useAthletes } from "../context/AthleteContext";

function AthleteList({ onEdit }) {
  const { athletes, loading, error, deleteAthlete } = useAthletes();
  const [deleteError, setDeleteError] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  async function handleDelete(athlete) {
    const confirmed = window.confirm(
      `Haluatko varmasti poistaa urheilijan ${athlete.first_name} ${athlete.last_name}?`,
    );

    if (!confirmed) return;

    setDeleteError("");
    setDeletingId(athlete.id);

    try {
      await deleteAthlete(athlete.id);
    } catch (err) {
      setDeleteError(err.message || "Poistaminen epäonnistui");
    } finally {
      setDeletingId(null);
    }
  }

  if (loading) {
    return <p className="text-secondary">Ladataan urheilijoita...</p>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <>
      {deleteError && <div className="alert alert-danger">{deleteError}</div>}

      {athletes.length === 0 ? (
        <div className="alert alert-info">
          Tietokannassa ei ole vielä urheilijoita.
        </div>
      ) : (
        <div className="row g-4">
          {athletes.map((athlete) => (
            <div className="col-12 col-md-6 col-lg-4" key={athlete.id}>
              <div className="card h-100 shadow-sm">
                {athlete.image_url && (
                  <img
                    src={athlete.image_url}
                    className="card-img-top"
                    alt={`${athlete.first_name} ${athlete.last_name}`}
                    style={{ height: "220px", objectFit: "cover" }}
                  />
                )}

                <div className="card-body">
                  <h2 className="h5 card-title">
                    {athlete.first_name} {athlete.last_name}
                  </h2>

                  {athlete.nickname && (
                    <p className="text-secondary mb-2">“{athlete.nickname}”</p>
                  )}

                  <p className="mb-1">
                    <strong>Laji:</strong> {athlete.sport}
                  </p>
                  <p className="mb-1">
                    <strong>Syntymäaika:</strong>{" "}
                    {athlete.birth_date
                      ? String(athlete.birth_date).slice(0, 10)
                      : "Ei tiedossa"}
                  </p>
                  <p className="mb-1">
                    <strong>Paino:</strong>{" "}
                    {athlete.weight != null
                      ? `${athlete.weight} kg`
                      : "Ei tiedossa"}
                  </p>
                  <p className="mb-0">
                    <strong>Saavutukset:</strong>{" "}
                    {athlete.achievements || "Ei kirjattuja saavutuksia"}
                  </p>
                </div>

                <div className="card-footer bg-white d-flex gap-2">
                  <button
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => onEdit(athlete)}
                  >
                    Muokkaa
                  </button>

                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => handleDelete(athlete)}
                    disabled={deletingId === athlete.id}
                  >
                    {deletingId === athlete.id ? "Poistetaan..." : "Poista"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default AthleteList;
