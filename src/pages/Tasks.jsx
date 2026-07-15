import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Task from "../components/Task";
import { get } from "../services/api";
import { useLocation } from 'react-router-dom';
import Tags from "../pages/Tags";
import Tag from "../components/Tag";


function Tasks() {
    // 1. Déclaration unique des états
    const location = useLocation();
    // On extrait le projectId envoyé via le state du Link
    const projectId = location.state?.projectId;
    const [tasks, setTasks] = useState([]);
    const [pagination, setPagination] = useState({ page: 1, totalPages: 1 });

    const [tags, setTags] = useState([]);
    const [tagsPagination, setTagsPagination] = useState({ page: 1, totalPages: 1 });


    const fetchTasks = async (page = 1) => {
        try {
            console.log('fetchtasks 1');
            // Vérification de sécurité : si on n'a pas de projectId, on arrête
            if (!projectId) {
                console.log('fetchtasks 2');
                console.error("Aucun projectId trouvé dans le state.");
                return;
            }
            console.log('fetchtasks 3');
            // On utilise ici la variable projectId récupérée
            const result = await get(`/api/task/taskUser/${projectId}?page=${page}`);
            console.log('fetchtasks : Récup data OK');
            setTasks(result.data.tasks);
            setPagination(result.data.pagination);
        } catch (error) {
            console.error("Erreur lors de la récupération :", error);
        }
    };

    const fetchTags = async (page = 1) => {
        try {
            console.log('fetchTags 1');
            // Vérification de sécurité : si on n'a pas de projectId, on arrête
            if (!projectId) {
                console.log('fetchTags 2');
                console.error("Aucun projectId trouvé dans le state.");
                return;
            }
            console.log('fetchTags 3');
            // On récupére les commentaires relatif au projet
            const result = await get(`/api/tags/${projectId}?page=${page}`);

            console.log('fetchTags : Récup data OK');
            setTags(result.data.tags);
            setPagination(result.data.pagination);
        } catch (error) {
            console.error("Erreur lors de la récupération :", error);
        }
    };

    // N'oubliez pas d'appeler fetchTasks dans le useEffect quand projectId change
    useEffect(() => {
        if (projectId) {
            fetchTasks();
            fetchTags();
        }
    }, [projectId]);

    return (
        <div>
            {/*TASKS*/}
            <div>
                <div>
                    <h2>Mes Tâches</h2>
                    <Link className="inline-block mb-4 text-blue-600 underline" to="/create">
                        + Nouvelle tâche
                    </Link>
                    {tasks.map((task) => (
                        <Task key={task.id} task={task} onUpdate={() => fetchTasks(pagination.page)} />
                    ))}
                </div>

                {/*PAGINATION TASKS*/}
                <div className="flex gap-4 mt-6 items-center">
                    <button
                        disabled={pagination.page === 1}
                        onClick={() => fetchTasks(pagination.page - 1)}
                        className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
                    >
                        Précédent
                    </button>

                    <span>Page {pagination.page} sur {pagination.totalPages}</span>

                    <button
                        disabled={pagination.page === pagination.totalPages}
                        onClick={() => fetchTasks(pagination.page + 1)}
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
            {/*TAGS*/}
            {/*TAGS*/}
            <div className="mt-12 border-t pt-8">
                <div>
                    <h2>Commentaires du projet:</h2>
                    <Link className="inline-block mb-4 text-blue-600 underline" to="/tags">
                        Voir tous les tags
                    </Link>
                    {tags.map((tag) => (
                        <Tag key={tag.id} tag={tag} onUpdate={() => fetchTags(tagsPagination.page)} />
                    ))}
                </div>


                {/*PAGINATION TAGS*/}
                <div className="flex gap-4 mt-6 items-center">
                    <button
                        disabled={tagsPagination.page === 1}
                        onClick={() => fetchTags(tagsPagination.page - 1)}
                        className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
                    >
                        Précédent
                    </button>

                    <span>Page {tagsPagination.page} sur {tagsPagination.totalPages}</span>

                    <button
                        disabled={tagsPagination.page === tagsPagination.totalPages}
                        onClick={() => fetchTags(tagsPagination.page + 1)}
                        className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
                    >
                        Suivant
                    </button>
                </div>
            </div>

        </div>

    );
}

export default Tasks;