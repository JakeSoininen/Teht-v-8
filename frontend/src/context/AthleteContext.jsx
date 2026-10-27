import { createContext, useContext, useEffect, useState } from "react";

const AthleteContext = createContext();

const API_URL = "http://localhost:3001/api/athletes";

export function AthleteProvider({ children }) {
  const [athletes, setAthletes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function fetchAthletes() {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Urheilijoiden haku epäonnistui");
      }

      const data = await response.json();
      setAthletes(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAthletes();
  }, []);

  async function addAthlete(athlete) {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(athlete),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || "Lisääminen epäonnistui");
    }

    const createdAthlete = await response.json();

    setAthletes((previous) => [...previous, createdAthlete]);

    return createdAthlete;
  }

  async function updateAthlete(id, athlete) {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(athlete),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || "Päivittäminen epäonnistui");
    }

    const updatedAthlete = await response.json();

    setAthletes((previous) =>
      previous.map((item) =>
        item.id === updatedAthlete.id ? updatedAthlete : item,
      ),
    );

    return updatedAthlete;
  }

  async function deleteAthlete(id) {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      let message = "Poistaminen epäonnistui";

      if (response.status !== 204) {
        const data = await response.json();
        message = data.message || message;
      }

      throw new Error(message);
    }

    setAthletes((previous) =>
      previous.filter((item) => item.id !== Number(id)),
    );
  }

  return (
    <AthleteContext.Provider
      value={{
        athletes,
        loading,
        error,
        fetchAthletes,
        addAthlete,
        updateAthlete,
        deleteAthlete,
      }}
    >
      {children}
    </AthleteContext.Provider>
  );
}

export function useAthletes() {
  return useContext(AthleteContext);
}
