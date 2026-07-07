import { Link } from 'react-router-dom';
import './Header.css';
import { useNavigate } from "react-router-dom";


function Header() {
    const token = localStorage.getItem('token'); //Récupération du token
    const navigate = useNavigate(); //Utiliser pour la redirection de page

    //Déconnexion
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login')
    }

    return ( //Le code se met dedans
        <header className="bg-blue-600 text-white p-4">
            <div className="max-w-6xl mx-auto flex justify-between items-center">
                <h1 className="text-xl font-bold">TaskManager</h1>
                <nav>
                    {token && <Link className="mr-4" to="/">Accueil</Link>}
                    {!token && <Link className="mr-4" to="/tasks">Tâches</Link>}
                    {!token && <Link className='mr-4' to="/login">Connexion</Link>}
                    {token && <Link className='mr-4' to="/register">Inscription</Link>}

                    <button className="underline" onClick={handleLogout}>Déconnexion</button>
                </nav>
            </div>
        </header>
    )
}


export default Header;



