import axios from "axios";
import { Link } from "react-router-dom";


function Task({ task, onUpdate }) {
    const token = localStorage.getItem('token');
    //Supprimer une tâche
    const deleteTask = async () => {
        await axios.delete('http://localhost:3000/api/task/' + task.id, {
            headers: { Authorization: 'Bearer ' + token }
        });
        onUpdate();
    };

    //Marquer une tâche comme fini
    const markAsFinished = async () => {

        await axios.patch('http://localhost:3000/api/task/' + task.id, { status: 'done' }, {
            headers: { Authorization: 'Bearer ' + token }
        });
        onUpdate();
    }

    return (
        <div className="border rounded p-4 mb-3 shadow flex justify-between items-center bg-white hover:bg-gray-50 transition">
            <div> {/* En React il faut mettre key */}
                <div className="flex items-center gap-3">
                    <span className={`text-xs px-2 py-1 rounded-full ${task.status === 'done' ? 'bg-green-200 text-green-800}' : 'bg-yellow-100 text-yellow-800'}`}>{task.status === 'done' ? 'Terminée' : 'A faire'}</span>
                    <p className="text-lg font-semibold ">{task.title}</p>
                </div>
                <p className="text-sm text-gray-600 mt-1">{task.description}</p>
            </div>
            <div className="flex gap-2">
                {task.status === 'todo' && <button className="bg-green-500 text-white px-3 py-1 rounded" onClick={() => markAsFinished()}>Terminer</button>}
                <Link className="bg-yellow-500 text-white px-3 py-1 rounded" to={`/edit/${task.id}`}>Modifier</Link>
                <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={() => deleteTask()}>Supprimer</button>
            </div>
        </div>)
}

export default Task;
