import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { get, patch } from "../services/api";


function EditTask() {
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = useParams();
    const { token } = useAuth();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueAt, setDueAt] = useState('')
    const [priority, setPriority] = useState('');
    const [status, setStatus] = useState('');
    const [comment, setComment] = useState('');
    const [projectId, setProjectId] = useState(location.state?.projectId || '');

    useEffect(() => {
        get('api/task/' + id)
            .then(response => {
                setTitle(response.data.title);
                setDescription(response.data.description);
                setDueAt(response.data.dueAt ? response.data.dueAt.split('T')[0] : '');
                setPriority(response.data.priority);
                setStatus(response.data.status);
                setComment(response.data.comment);

                if (!projectId) {
                    setProjectId(response.data.project?._id || response.data.project);
                }
            });
    }, [id])

    const handleSubmit = async (e) => {
        e.preventDefault(); //Evite le rechargement de la page
        try {
            //Appel API
            await patch('api/task/' + id, { title, description, dueAt, priority, status, comment })
            navigate('/tasks', {
                state: {
                    projectId: projectId
                }
            });
        } catch (error) {
            console.error("Erreur modification :", error);
        }

    }

    return (
        <form onSubmit={handleSubmit}>
            <h2 className="bg-blue-600 text-white text-xl font-semibold px-4 py-2 rounded mb-6 text-center">Modifier la tâche : {title} </h2>

            <label>Titre de la tâche :</label>
            <input placeholder="Titre" value={title} onChange={(e) => setTitle(e.target.value)} />
            <label>Description de la tâche :</label>
            <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
            <label>Date d'échéance :</label>
            <input type="date" value={dueAt} onChange={(e) => setDueAt(e.target.value)} className="border border-gray-300 rounded px-3 py-2" />
            <label>Priorité de la tâche :</label>
            <select value={priority} onChange={(e) => setPriority(e.target.value)} className="border border-gray-300 rounded px-3 py-2">
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
            </select>
            <label>Status :</label>
            <select
                value={status} onChange={(e) => setStatus(e.target.value)} className="border border-gray-300 rounded px-3 py-2">
                <option value="open">Open</option>
                <option value="in_progress">In progress</option>
            </select>
            <br></br>
            <label>Commentaires :</label>
            <textarea placeholder="Description" value={comment} onChange={(e) => setComment(e.target.value)}></textarea>

            <button>Modifier</button>
        </form>
    )
};


export default EditTask;
