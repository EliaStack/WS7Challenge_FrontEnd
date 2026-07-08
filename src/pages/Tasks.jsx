import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Task from "../components/Task";
import { useAuth } from "../context/AuthContext";
import { get } from "../services/api";



function Tasks() {

    //Récupérer les tâches
    const { token } = useAuth();
    const [tasks, setTasks] = useState([]);

    const fetchTasks = async () => {
        try {
            const result = await get('api/task/taskGetAll');
            // On stocke uniquement le tableau
            setTasks(result.data.tasks);
        } catch (error) {
            console.error("Erreur lors de la récupération :", error);
        }
    };

    //Appeler qu'une seule fois fetchTask pour éviter que sa tourne en boucle
    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <div>
            <h2>Mes Tâches</h2>
            <Link className="inline-block mb-4 text-blue-600 underline" to="/create">+ Nouvelle tâche</Link>

            {tasks && tasks.tasks && tasks.tasks.map(task => (
                <Task task={task} key={task.id} onUpdate={fetchTasks} />
            ))}
        </div >
    )
};

export default Tasks;