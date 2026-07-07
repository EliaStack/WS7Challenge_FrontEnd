import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { post } from "../services/api";


function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); //Utiliser pour la redirection de page

    const handleSubmit = async (e) => {
        e.preventDefault(); //Evite le rechargement de la page
        if (!email || password)
            return;

        //Appel API
        await post ('register', { email, password }) //Mettre url de l'api et les données à soumettres
        navigate('/login') //Redirection vers la page login
        console.log({ email, password });
    }

    return (

        <form onSubmit={handleSubmit}>
            <h2>Inscription</h2>
            <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <button>S'inscrire</button>
        </form>
    )
};

export default Register;