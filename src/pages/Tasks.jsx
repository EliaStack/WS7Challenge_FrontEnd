import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Task from "../components/Task";
import { get } from "../services/api";
import { useLocation } from 'react-router-dom';

function Tasks() {
    // 1. Déclaration unique des états
    const location = useLocation();
    // On extrait le projectId envoyé via le state du Link
    const projectId = location.state?.projectId;
    const [tasks, setTasks] = useState([]);
    const [pagination, setPagination] = useState({ page: 1, totalPages: 1 });

    const fetchTasks = async (page = 1) => {
        try {
            // Vérification de sécurité : si on n'a pas de projectId, on arrête
            if (!projectId) {
                console.error("Aucun projectId trouvé dans le state.");
                return;
            }

            // On utilise ici la variable projectId récupérée
            const result = await get(`/api/task/taskUser/${projectId}?page=${page}`);

            setTasks(result.data.tasks);
            setPagination(result.data.pagination);
        } catch (error) {
            console.error("Erreur lors de la récupération :", error);
        }
    };

    // N'oubliez pas d'appeler fetchTasks dans le useEffect quand projectId change
    useEffect(() => {
        if (projectId) {
            fetchTasks();
        }
    }, [projectId]);

    return (
        <div>
            <div>
                <h2>Mes Tâches</h2>
                <Link className="inline-block mb-4 text-blue-600 underline" to="/create">
                    + Nouvelle tâche
                </Link>

              {tasks.map(task => (
                    <Task task={task} key={task.id} onUpdate={() => fetchTasks(pagination.page)} />
                ))}
            </div>

            {/*PAGINATION*/}
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
    );
}

export default Tasks;