import { useState, useEffect } from "react";
import { useAthletes } from "../context/AthleteContext";

function AthleteForm({ editingAthlete, onCancel, onSaved }) {
  const { addAthlete, updateAthlete } = useAthletes();

  const emptyForm = {
    first_name: "",
    last_name: "",
    nickname: "",
    birth_date: "",
    weight: "",
    image_url: "",
    sport: "",
    achievements: "",
  };

  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (editingAthlete) {
      setForm({
        first_name: editingAthlete.first_name || "",
        last_name: editingAthlete.last_name || "",
        nickname: editingAthlete.nickname || "",
        birth_date: editingAthlete.birth_date
          ? String(editingAthlete.birth_date).slice(0, 10)
          : "",
        weight: editingAthlete.weight ?? "",
        image_url: editingAthlete.image_url || "",
        sport: editingAthlete.sport || "",
        achievements: editingAthlete.achievements || "",
      });
    } else {
      setForm(emptyForm);
    }
  }, [editingAthlete]);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setSaving(true);

    const athlete = {
      ...form,
      weight: form.weight === "" ? null : Number(form.weight),
      birth_date: form.birth_date || null,
      nickname: form.nickname || null,
      image_url: form.image_url || null,
      achievements: form.achievements || null,
    };

    try {
      if (editingAthlete) {
        await updateAthlete(editingAthlete.id, athlete);
      } else {
        await addAthlete(athlete);
      }

      setForm(emptyForm);
      onSaved?.();
    } catch (err) {
      setError(err.message || "Tallennus epäonnistui");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body p-4">
        <h2 className="h4 mb-3">
          {editingAthlete ? "Muokkaa urheilijaa" : "Lisää urheilija"}
        </h2>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Etunimi *</label>
              <input
                className="form-control"
                name="first_name"
                value={form.first_name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Sukunimi *</label>
              <input
                className="form-control"
                name="last_name"
                value={form.last_name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Lempinimi</label>
              <input
                className="form-control"
                name="nickname"
                value={form.nickname}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Laji *</label>
              <input
                className="form-control"
                name="sport"
                value={form.sport}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Syntymäaika</label>
              <input
                className="form-control"
                type="date"
                name="birth_date"
                value={form.birth_date}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Paino (kg)</label>
              <input
                className="form-control"
                type="number"
                min="0"
                step="0.01"
                name="weight"
                value={form.weight}
                onChange={handleChange}
              />
            </div>

            <div className="col-12">
              <label className="form-label">Kuvan URL-osoite</label>
              <input
                className="form-control"
                type="url"
                name="image_url"
                value={form.image_url}
                onChange={handleChange}
                placeholder="https://esimerkki.fi/kuva.jpg"
              />
            </div>

            <div className="col-12">
              <label className="form-label">Saavutukset</label>
              <textarea
                className="form-control"
                name="achievements"
                value={form.achievements}
                onChange={handleChange}
                rows="3"
              />
            </div>
          </div>

          <div className="d-flex gap-2 mt-4">
            <button className="btn btn-primary" type="submit" disabled={saving}>
              {saving ? "Tallennetaan..." : "Tallenna urheilija"}
            </button>

            {editingAthlete && (
              <button
                className="btn btn-secondary"
                type="button"
                onClick={onCancel}
              >
                Peruuta
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default AthleteForm;
