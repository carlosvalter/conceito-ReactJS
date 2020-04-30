import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";


function App() {
  const [repositories, setRepositories] = useState([]);

  // Executa sempre q o componente for exibido
  useEffect(() => { // Não é possível usar async await, por isso .then
    api.get('repositories')
      .then(response => {
        setRepositories(response.data)
      })
  }, []);


  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Novo ${Date.now()}`,
      url: "http://github.com",
      techs: "techs"
    });

    // Atualiza o estado do array
    setRepositories([...repositories, response.data]);

  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    // Encontra o index do elemento no array
    const repositoryIndex = repositories.findIndex(repository => repository.id === id);
    // Remove o item do array
    repositories.splice(repositoryIndex, 1);
    // Atualiza o estado do array
    setRepositories([...repositories]); // ...copia todo o conteudo de repositories para a nova []
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository =>
          <li key={repository.id}>{repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
          </button>
          </li>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
