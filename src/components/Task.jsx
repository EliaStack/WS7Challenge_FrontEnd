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
        <div className="bg-white p-5 rounded-xl border border-gray-400 border-l-[6px] border-l-blue-600 shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-300 mb-6 flex gap-4 items-center">

            {/* Colonne gauche */}
            <div className="flex-1">
                {/* ... (En-tête et Titre identiques) ... */}
                <div className="flex items-center gap-2 mb-2">
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase ${task.status === 'done' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {task.status === 'done' ? 'Terminée' : 'A faire'}
                    </span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">{task.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{task.description}</p>

                {/* Priorité et Échéance */}
                <div className="text-[11px] text-gray-500 font-bold uppercase flex gap-4 mb-4">
                    <p><strong>Priorité :</strong> {task.priority || 'Non définie'}</p>
                    <p><strong>Échéance :</strong> {task.dueAt ? new Date(task.dueAt).toLocaleDateString() : 'Aucune'}</p>
                </div>

                {/* Bloc commentaires unifié */}
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 text-sm italic text-gray-700">
                    <p className="text-[10px] font-bold text-gray-400 uppercase mb-2 not-italic">Commentaires :</p>

                    {/* Affichage des Tags comme des commentaires listés */}

                    {task.tags && task.tags.map((tag, idx) => (
                        <p key={`tag-${idx}`} className="bg-gray-50 p-0 rounded-lg border border-gray-100 text-sm italic text-gray-700">
                            • {tag.name || 'Nom du tag inconnu'}
                        </p>
                    ))}

                    {/* Affichage des commentaires */}
                    {Array.isArray(task.comments) && task.comments.map((c, i) => (
                        <p key={`com-${i}`} className="mb-1">• {c}</p>
                    ))}
                </div>
            </div>

            {/* Colonne centrale : Boutons */}
            <div className="flex flex-col items-center justify-center gap-2 min-w-[120px]">
                {task.status !== 'done' && (
                    <button className="bg-green-500 text-black hover:bg-green-600 px-4 py-2 rounded-lg text-xs font-bold uppercase transition w-full shadow-sm" onClick={() => markAsFinished()}>Terminer</button>
                )}
                <Link className="bg-orange-400 text-black hover:bg-orange-500 px-4 py-2 rounded-lg text-xs font-bold uppercase transition w-full shadow-sm text-center" to={`/edit/${task.id}`}>Modifier</Link>
                <button className="bg-red-500 text-black hover:bg-red-600 px-4 py-2 rounded-lg text-xs font-bold uppercase transition w-full shadow-sm" onClick={() => deleteTask()}>Supprimer</button>
            </div>

            {/* Colonne droite : Responsable */}
            <div className="flex items-center gap-4 border-l border-gray-300 pl-4 min-w-[150px]">
                <div className="flex flex-col text-right text-xs">
                    <span className="font-bold text-black uppercase tracking-wide">Responsable :</span> 
                    <span className="text-sm font-semibold text-gray-800 mb-4">{task.assignee ? `${task.assignee.firstName} ${task.assignee.lastName}`: 'Personne'}</span>
                    {/*<span className="font-bold text-gray-400 uppercase">ID : {task.project || 'N/A'}</span>*/}
                </div>
            </div>
        </div>
    )
}

export default Task;
