import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import UserList from "./pages/UserList";
import CreateUser from "./components/CreateUser";
import EventList from "./pages/EventList";
import CreateEvent from "./components/CreateEvent";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <a href="/users">Lista de Usuários</a> |{" "}
          <a href="/create-user">Criar Usuário</a> |{" "}
          <a href="/events">Lista de Eventos</a> |{" "}
          <a href="/create-event">Criar Evento</a>
        </nav>
        <Routes>
          <Route path="/users" element={<UserList />} />
          <Route path="/create-user" element={<CreateUser />} />

          <Route path="/events" element={<EventList />} />
          <Route path="/create-event" element={<CreateEvent />} />

          <Route path="*" element={<UserList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
