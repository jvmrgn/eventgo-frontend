import React, {useState} from "react";
import api from "../api.js";

function CreateUser() {
  const [form, setForm] = useState({
    nickname: "",
    password: "",
    full_name: "",
    email: "",
    user_type: "Participante",
  });

  const handleChange = (e) => {
    const {name, value} = e.target;
    setForm({...form, [name]: value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    api
      .post("/users", form)
      .then(() => alert("Usuário criado com sucesso!"))
      .catch((error) => console.error("Erro ao criar usuário:", error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Criar Usuário</h1>
      <input
        type="text"
        name="nickname"
        placeholder="Apelido"
        value={form.nickname}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Senha"
        value={form.password}
        onChange={handleChange}
      />
      <input
        type="text"
        name="full_name"
        placeholder="Nome Completo"
        value={form.full_name}
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        placeholder="E-mail"
        value={form.email}
        onChange={handleChange}
      />
      <select name="user_type" value={form.user_type} onChange={handleChange}>
        <option value="Participante">Participante</option>
        <option value="Organizador">Organizador</option>
      </select>
      <button type="submit">Criar</button>
    </form>
  );
}

export default CreateUser;
