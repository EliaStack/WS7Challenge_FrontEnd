import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { get, patch } from "../services/api";


function EditTask() {
    const navigate = useNavigate();
    const location = useLocation();
    const tag = location.state?.tag;

    const { id } = useParams();
    const { token } = useAuth();
    const [name, setName] = useState(tag?.name || '');
    const [projectId, setProjectId] = useState(tag?.project._id || '');
    const projectTitle = tag.project.title;
 

    console.log('statetag: ', tag);

    useEffect(() => {
        
        get('/api/tags/' + id)
            .then(response => {
                console.log('Réponse brute API :', response);
                setName(response.data.name);
                setProjectId(response.data.project);
                if (!projectId) {
                    setProjectId(response.data.project?._id || response.data.project);
                }
            });
    }, [id])
        console.log('projectid:', projectId)
    const handleSubmit = async (e) => {
        e.preventDefault(); //Evite le rechargement de la page
        console.log('projectid:', projectId)
        try {
            //Appel API
            await patch('api/tags/' + id, { name, project:projectId })
            navigate('/tasks', {
                state: {
                   projectId: tag?.project?._id || tag?.project || projectId
                }
            });
        } catch (error) {
            console.error("Erreur modification :", error);
        }

    }

    return (
        <form onSubmit={handleSubmit}>
            <h2 className="bg-blue-600 text-white text-xl font-semibold px-4 py-2 rounded mb-6 text-center">Modifier la tâche : {name} </h2>

            <label>Titre du tag :</label>
            <input placeholder="Titre" value={name} onChange={(e) => setName(e.target.value)} />
            <label>Projet :</label>
            <input readOnly value={projectTitle} onChange={(e) => setProjectId(e.target.value)} className="border border-gray-300 rounded px-3 py-2" />

            <button>Modifier</button>
        </form>
    )
};


export default EditTask;
