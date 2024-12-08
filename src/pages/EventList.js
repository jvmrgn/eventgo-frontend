import React, {useEffect, useState} from "react";
import axios from "axios";

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [organizers, setOrganizers] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/events");
        setEvents(response.data);
      } catch (error) {
        console.error("Erro ao buscar eventos:", error);
      }
    };

    const fetchOrganizers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/users");
        const organizersData = response.data.filter(
          (user) => user.user_type === "Organizador"
        );
        setOrganizers(organizersData);
      } catch (error) {
        console.error("Erro ao buscar organizadores:", error);
      }
    };

    fetchEvents();
    fetchOrganizers();
  }, []);

  return (
    <div>
      <h1>Lista de Eventos</h1>
      {events.length > 0 ? (
        <ul>
          {events.map((event) => {
            const organizer = organizers.find(
              (user) => user.user_id === event.organizer_id
            );
            const organizerName = organizer
              ? organizer.full_name
              : "Organizador não encontrado";

            return (
              <li key={event.event_id}>
                <strong>{event.title}</strong>: {event.description} |
                Organizador do evento: {organizerName}
              </li>
            );
          })}
        </ul>
      ) : (
        <p>Nenhum evento encontrado.</p>
      )}
    </div>
  );
};

export default EventList;
