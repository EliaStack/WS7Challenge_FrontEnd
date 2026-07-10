import axios from "axios";
import { Link } from "react-router-dom";


function Project({ project, onUpdate }) {
    const token = localStorage.getItem('token');
    //Supprimer une tâche
    const deleteProject = async () => {
        await axios.delete('http://localhost:3000/api/projet/' + project.id, {
            headers: { Authorization: 'Bearer ' + token }
        });
        onUpdate();
    };

    //Marquer une tâche comme fini
    const markAsFinished = async () => {

        await axios.patch('http://localhost:3000/api/projet/' + project.id, { status: 'done' }, {
            headers: { Authorization: 'Bearer ' + token }
        });
        onUpdate();
    }

    return (
<div className="bg-gray-50 p-5 rounded-xl border border-gray-200 border-l-[6px] border-l-blue-600 shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-300 mb-6 flex gap-4 items-center">

    {/* Colonne gauche : Remplacée par un Link pour le clic */}
    <Link to= "/tasks" state={{ projectId: project._id }} className="flex-1 block hover:bg-gray-100/50 p-2 rounded-lg transition-colors cursor-pointer">
        <div className="flex items-center gap-2 mb-2">
            <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide ${project.status === 'Actif' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                {project.status === 'Actif' ? 'Archivé' : 'A faire'}
            </span>
        </div>
        
        <h3 className="text-lg font-bold text-gray-900 mb-1">{project.title}</h3>
        <p className="text-sm text-gray-600 mb-4 leading-relaxed">{project.description}</p>
        
        <div className="text-[11px] text-gray-500 font-bold uppercase tracking-wider">
            Démarré le : {project.dueAt ? new Date(project.dueAt).toLocaleDateString() : 'Non défini'}
        </div>
    </Link>

    {/* Colonne centrale : Boutons (PAS DE CLIC GLOBAL ICI) */}
    <div className="flex flex-col items-center justify-center gap-2 min-w-[120px]">
        {project.status !== 'done' && (
            <button 
                className="bg-green-500 text-black hover:bg-green-600 px-4 py-2 rounded-lg text-xs font-bold uppercase transition w-full shadow-sm" 
                onClick={(e) => { e.stopPropagation(); markAsFinished(); }}
            >
                Terminer
            </button>
        )}
        <Link 
            className="bg-orange-400 text-black hover:bg-orange-500 px-4 py-2 rounded-lg text-xs font-bold uppercase transition w-full shadow-sm text-center" 
            to={`/edit/${project.id}`}
        >
            Modifier
        </Link>
        <button 
            className="bg-red-500 text-black hover:bg-red-600 px-4 py-2 rounded-lg text-xs font-bold uppercase transition w-full shadow-sm" 
            onClick={(e) => { e.stopPropagation(); deleteProject(); }}
        >
            Supprimer
        </button>
    </div>

    {/* Colonne droite : Responsables */}
    <div className="flex items-center gap-4 border-l border-gray-300 pl-4 min-w-[150px]">
        <div className="flex flex-col text-right">
            <span className="text-xs font-bold text-black uppercase tracking-wide">Responsable :</span>
            <span className="text-sm font-semibold text-gray-800 mb-2">
                {project.owner ? `${project.owner.firstName} ${project.owner.lastName}` : 'Non assigné'}
            </span>
            <span className="text-xs font-bold text-black uppercase tracking-wide">Membres :</span>
            <div className="flex flex-col">
                {project.members && project.members.length > 0 
                    ? project.members.map((m, index) => (
                        <span key={index} className="text-sm font-semibold text-gray-800">
                            {m.firstName} {m.lastName}
                        </span>
                    )) 
                    : <span className="text-sm font-semibold text-gray-800 italic">Personne</span>
                }
            </div>
        </div>
    </div>
</div>
    )
}

export default Project;
