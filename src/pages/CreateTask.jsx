import { useState } from "react";
import axios from 'axios';
import { useLocation, useNavigate } from "react-router-dom";
import { post } from "../services/api";
import { Link } from "react-router-dom";



function CreateTask() {
    const navigate = useNavigate();
    const location = useLocation();
    const projectId = location.state?.projectId;
    const projectTitle = location.state?.projectTitle;
    const assigneeId = location.state?.assigneeId;
    const assigneeName = location.state?.assigneeName;
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueAt, setDueAt] = useState('')
    const [priority, setPriority] = useState('Low');
    const [status, setStatus] = useState('open');
    const [project, setProject] = useState('');
    // const [assignee, setAssignee] = useState(assigneeName);
    const [comment, setComment] = useState('');

    console.log(projectTitle);
    console.log(assigneeName);

    const handleSubmit = async (e) => {
        console.log('CreateTask-1')
        e.preventDefault(); //Evite le rechargement de la page
        //Appel API
        console.log('CreateTask-2')

        await post('api/task/taskCreate', { title, description, dueAt, priority, status, project: projectId, assignee: assigneeId, comment })
        console.log('CreateTask-3')

        //Retour vers la page tasks mais en gardant l'id du projet pour que les tâches s'affiche
        navigate('/tasks', {
            state: {
                projectId: projectId
            }
        });
    }

    return (
        <div className="max-w-2xl mx-auto px-4 py-6 md:px-0">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <h2 className="bg-blue-600 text-white text-xl font-semibold px-4 py-2 rounded mb-2 text-center">
                    Créer une tâche
                </h2>

                <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold text-gray-700">Titre de la tâche :</label>
                    <input placeholder="Titre" value={title} onChange={(e) => setTitle(e.target.value)} className="border border-gray-300 rounded px-3 py-2 w-full" />
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold text-gray-700">Description de la tâche :</label>
                    <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="border border-gray-300 rounded px-3 py-2 w-full min-h-[90px]"></textarea>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex flex-col gap-1 flex-1">
                        <label className="text-sm font-semibold text-gray-700">Date d'échéance :</label>
                        <input type="date" value={dueAt} onChange={(e) => setDueAt(e.target.value)} className="border border-gray-300 rounded px-3 py-2 w-full" />
                    </div>

                    <div className="flex flex-col gap-1 flex-1">
                        <label className="text-sm font-semibold text-gray-700">Priorité de la tâche :</label>
                        <select value={priority} onChange={(e) => setPriority(e.target.value)} className="border border-gray-300 rounded px-3 py-2 w-full">
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                    </div>
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold text-gray-700">Status :</label>
                    <select value={status} onChange={(e) => setStatus(e.target.value)} className="border border-gray-300 rounded px-3 py-2 w-full">
                        <option value="open">Open</option>
                        <option value="in_progress">In progress</option>
                    </select>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex flex-col gap-1 flex-1">
                        <label className="text-sm font-semibold text-gray-700">Projet concerné :</label>
                        <input readOnly placeholder="Project" value={projectTitle} onChange={(e) => setProject(e.target.value)} className="border border-gray-300 rounded px-3 py-2 w-full bg-gray-100" />
                    </div>

                    <div className="flex flex-col gap-1 flex-1">
                        <label className="text-sm font-semibold text-gray-700">Assigné à :</label>
                        <input readOnly placeholder="Assigned" value={assigneeName} className="border border-gray-300 rounded px-3 py-2 w-full bg-gray-100" />
                    </div>
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold text-gray-700">Commentaires :</label>
                    <textarea placeholder="Description" value={comment} onChange={(e) => setComment(e.target.value)} className="border border-gray-300 rounded px-3 py-2 w-full min-h-[90px]"></textarea>
                </div>

                <button className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-lg font-semibold transition shadow-sm w-full">Créer</button>

            <div className="flex justify-center mt-4">
                <Link
                    to="/projects"
                    className="bg-blue-500 text-white hover:bg-blue-600 px-6 py-3 rounded-lg font-semibold transition shadow-sm w-full sm:w-auto text-center"
                >
                    ← Retour aux projets
                </Link>
            </div>
            </form>
        </div>
    )
};

export default CreateTask;