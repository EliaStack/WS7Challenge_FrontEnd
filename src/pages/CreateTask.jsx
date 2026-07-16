import { useState } from "react";
import axios from 'axios';
import { useLocation, useNavigate } from "react-router-dom";
import { post } from "../services/api";



function CreatTask() {
    const navigate = useNavigate();
    const location = useLocation();
    const projectId = location.state?.projectId;
    const assigneeId = location.state?.assigneeId;
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueAt, setDueAt] = useState('')
    const [priority, setPriority] = useState('Low');
    const [status, setStatus] = useState('open');
    const [project, setProject] = useState(projectId);
    const [assignee, setAssignee] = useState(assigneeId);
    const [comment, setComment] = useState('');

    console.log("projectId =", projectId);
    console.log("assigneeId =", assigneeId);

    const handleSubmit = async (e) => {
        console.log('CreateTask-1')
        e.preventDefault(); //Evite le rechargement de la page
        //Appel API
        console.log('CreateTask-2')

        await post('api/task/taskCreate', { title, description, dueAt, priority, status, project, assignee, comment })
        console.log('CreateTask-3')
        
        //Retour vers la page tasks mais en gardant l'id du projet pour que les tâches s'affiche
        navigate('/tasks', {
            state: {
                projectId: project
            }
        });
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Créer une tâche</h2>
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
                <option value="closed">Closed</option>
            </select>
            <label>Projet concerné :</label>
            <input readOnly placeholder="Project" value={project} onChange={(e) => setProject(e.target.value)} />
            <label>Assigné à :</label>
            <input readOnly placeholder="Assigned" value={assignee} onChange={(e) => setAssignee(e.target.value)} />
            <label>Commentaires :</label>
            <textarea placeholder="Description" value={comment} onChange={(e) => setComment(e.target.value)}></textarea>

            <button>Créer</button>
        </form>
    )
};

export default CreatTask;