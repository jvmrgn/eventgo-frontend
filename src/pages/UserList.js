import React, {useEffect, useState} from "react";
import api from "../api";

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api
      .get("/users")
      .then((response) => setUsers(response.data))
      .catch((error) => console.error("Erro ao buscar usuários:", error));
  }, []);

  return (
    <div>
      <h1>Usuários</h1>
      <ul>
        {users.map((user) => (
          <li key={user.user_id}>
            Nome: {user.full_name} Apelido: ({user.nickname}) Tipo de usuário:{" "}
            {user.user_type}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
