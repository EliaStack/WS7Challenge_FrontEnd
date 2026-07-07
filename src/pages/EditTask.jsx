import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { get, patch } from "../services/api";


function EditTask() {
    const { id } = useParams();
    const { token } = useAuth();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        get('tasks/' + id)
            .then(response => {
                setTitle(response.data.title);
                setDescription(response.data.description);
            });
    }, [id])

    const handleSubmit = (e) => {
        e.preventDefault(); //Evite le rechargement de la page
        //Appel API
        patch('tasks/' + id, {title, description})
        navigate('/tasks');
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Modifier la tâche : {title} </h2>
            <input placeholder="Titre" value={title} onChange={(e) => setTitle(e.target.value)} />
            <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
            <button>Modifier</button>
        </form>
    )
};


export default EditTask;
