import axios from "axios";
import { Link } from "react-router-dom";
import { deleteMany } from "../../../backend/models/user";


function Tag({ tag, onUpdate }) {
    const token = localStorage.getItem('token');
    //Supprimer une tâche
    const deleteTag = async () => {
        await axios.delete('http://localhost:3000/api/tags/' + tag.id, {
            headers: { Authorization: 'Bearer ' + token }
        });
        onUpdate();
    };

    //Modifier une tâche
    const modifyTag = async () => {
        await axios.patch('http://localhost:3000/api/tags/' + tag.id, {
            headers: { Authorization: 'Bearer ' + token }
        });
        onUpdate();
    }

    console.log("Tag reçu :", tag);
    return (
        <div className="bg-white p-5 rounded-xl border border-gray-200 border-l-[6px] border-l-blue-600 shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-300 mb-6 flex gap-4 items-center">

            {/* Colonne gauche */}
            <div className="flex-1">
                {/* Bloc commentaires unifié */}
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 text-sm italic text-gray-700">
                    <p className="text-[10px] font-bold text-gray-400 uppercase mb-2 not-italic">Commentaires du projet:</p>

                    {/* Affichage des Tags comme des commentaires listés */}
                    {tag.tags && tag.tags.map((tag, idx) => (
                        <p key={`tag-${idx}`} className="bg-gray-50 p-0 rounded-lg border border-gray-100 text-sm italic text-gray-700">
                            • Tag : {tag.name || 'Nom du tag inconnu'}
                        </p>
                    ))}

                    {/* Affichage des commentaires */}
                    {Array.isArray(tag.comments) && tag.comments.map((c, i) => (
                        <p key={`com-${i}`} className="mb-1">• {c}</p>
                    ))}
                </div>
            </div>

            {/* Colonne centrale : Boutons */}
            <div className="flex flex-col items-center justify-center gap-2 min-w-[120px]">
                <button className="bg-orange-400 text-black hover:bg-orange-500 px-4 py-2 rounded-lg text-xs font-bold uppercase transition w-full shadow-sm text-center" onClick={() => modifyTag()}>Modifier</button>
                 <button className="bg-red-500 text-black hover:bg-red-600 px-4 py-2 rounded-lg text-xs font-bold uppercase transition w-full shadow-sm" onClick={() => deleteTag()}>Supprimer</button>       
            </div>

        </div>
    )
}

export default Tag;
