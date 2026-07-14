import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Tag from "../components/Tag";
import { get } from "../services/api";
import { useLocation } from 'react-router-dom';
import axios from "axios";

function Tags() {
    // 1. Déclaration unique des états
    const location = useLocation();
    // On extrait le projectId envoyé via le state du Link
    const projectId = location.state?.projectId;
    const [tags, setTags] = useState([]);
    const [pagination, setPagination] = useState({ page: 1, totalPages: 1 });

    const fetchTags = async (page = 1) => {
        try {
            // Vérification de sécurité : si on n'a pas de projectId, on arrête
            if (!projectId) {
                console.error("Aucun projectId trouvé dans le state.");
                return;
            }

            // On récupére les commentaires relatif au projet
            const result = await get(`/api/tags?page=${page}`);

            setTags(result.data.tags);
            setPagination(result.data.pagination);
        } catch (error) {
            console.error("Erreur lors de la récupération :", error);
        }
    };

    //Créer une tâche
    const CreateTag = async () => {
        await axios.patch('http://localhost:3000/api/tags/tagCreate' + tag.id, {
            headers: { Authorization: 'Bearer ' + token }
        });
        onUpdate();
    }

    // N'oubliez pas d'appeler fetchTags dans le useEffect quand projectId change
    useEffect(() => {
        if (projectId) {
            fetchTags();
        }
    }, [projectId]);

    return (
        <div>
            <div>
                <div>
                    <h2>Commentaires du projet:</h2>
                    <button className="inline-block mb-4 text-blue-600 underline" onClick={() => CreateTag()}>+ Nouvelle tâche</button>
                </div>

                {tags.map(tag => (
                    <Tag tag={tag} key={tag.id} onUpdate={() => fetchTags(pagination.page)} />
                ))}
            </div>

            {/*PAGINATION*/}
            <div className="flex gap-4 mt-6 items-center">
                <button
                    disabled={pagination.page === 1}
                    onClick={() => fetchTags(pagination.page - 1)}
                    className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
                >
                    Précédent
                </button>

                <span>Page {pagination.page} sur {pagination.totalPages}</span>

                <button
                    disabled={pagination.page === pagination.totalPages}
                    onClick={() => fetchTags(pagination.page + 1)}
                    className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
                >
                    Suivant
                </button>
            </div>
            <div>
                <Link className="inline-block mb-4 text-blue-600 underline" to="/projects">
                    retour
                </Link>
            </div>
        </div>
    );
}

export default Tags;