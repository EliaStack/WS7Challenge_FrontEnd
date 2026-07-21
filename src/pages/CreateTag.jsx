import { useState } from "react";
import axios from 'axios';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { post } from "../services/api";
import { useEffect } from "react";



function CreateTag() {
    const navigate = useNavigate();
    const location = useLocation();
    const projectTitle = location.state?.projectTitle;
    const projectId = location.state?.projectId;


    const [name, setTitle] = useState('');
    const [project, setProject] = useState(projectId);


    const handleSubmit = async (e) => {
        e.preventDefault(); //Evite le rechargement de la page
        //Appel API
        await post('api/tags/tagCreate', { name, project })
        navigate('/projects', {
            state: {
                projectId: projectId
            }
        });
        console.log('createtag : tag créer')
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2>Créer une tâche</h2>
                <input placeholder="Titre" value={name} onChange={(e) => setTitle(e.target.value)} />
                <input readOnly placeholder="Projet concerné" value={projectTitle} onChange={(e) => setProject(e.target.value)}></input>
                <button>Créer</button>
            </form>
            <div className="flex justify-center mt-8">
                <Link
                    to="/projects"
                    className="bg-blue-500 text-white hover:bg-blue-600 px-6 py-3 rounded-lg font-semibold transition shadow-sm"
                >
                    ← Retour aux projets
                </Link>
            </div>
        </div>
    )
};

export default CreateTag;