import React, {useState, useEffect} from "react";
import axios from "axios";

const CreateEvent = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [organizerId, setOrganizerId] = useState("");

  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [organizers, setOrganizers] = useState([]);

  useEffect(() => {
    const fetchOrganizers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/users");
        const organizers = response.data.filter(
          (user) => user.user_type === "Organizador"
        );
        setOrganizers(organizers);
      } catch (error) {
        console.error("Erro ao buscar organizadores:", error);
        setErrorMessage("Falha ao carregar organizadores. Tente novamente.");
      }
    };

    fetchOrganizers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log({
      title: name,
      description,
      date,
      time,
      location,
      organizer_id: organizerId,
    });

    try {
      await axios.post("http://localhost:3000/api/events", {
        title: name,
        description,
        date,
        time,
        location,
        organizer_id: organizerId,
      });

      setSuccess(true);
      setErrorMessage("");
      setName("");
      setDescription("");
      setDate("");
      setTime("");
      setLocation("");
      setOrganizerId("");
    } catch (error) {
      console.error("Erro ao criar evento:", error);
      setErrorMessage("Falha ao criar evento. Tente novamente.");
    }
  };

  return (
    <div>
      <h1>Criar Evento</h1>

      {success && <p style={{color: "green"}}>Evento criado com sucesso!</p>}
      {errorMessage && <p style={{color: "red"}}>{errorMessage}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome do Evento:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Descrição:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Data:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Hora:</label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Local:</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Organizador:</label>
          <select
            value={organizerId}
            onChange={(e) => {
              console.log("ID do organizador selecionado:", e.target.value);
              setOrganizerId(e.target.value);
            }}
            required
          >
            <option value="" disabled>
              Selecione um organizador
            </option>
            {organizers.map((organizer) => (
              <option key={organizer.user_id} value={organizer.user_id}>
                {organizer.full_name}
              </option>
            ))}
          </select>
        </div>

        <button type="submit">Criar</button>
      </form>
    </div>
  );
};

export default CreateEvent;
