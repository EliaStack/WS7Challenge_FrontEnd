import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { post } from "../services/api";



function CreatTask() {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault(); //Evite le rechargement de la page
        //Appel API
        post('tasks', { title, description, status: 'todo' })
        navigate('/tasks');
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Créer une tâche</h2>
            <input placeholder="Titre" value={title} onChange={(e) => setTitle(e.target.value)} />
            <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
            <button>Créer</button>
        </form>
    )
};

export default CreatTask;