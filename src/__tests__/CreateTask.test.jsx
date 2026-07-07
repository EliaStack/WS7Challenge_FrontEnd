/** @vitest-environment jsdom */  
import { MemoryRouter, useNavigate } from "react-router-dom";
import CreateTask from "../pages/CreateTask";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

//Création d'une fausse API pour les test (aide si API backend à lachée)
const mockPost = vi.fn();
vi.mock('../services/api.js', () => ({
    post: (...args) => mockPost(...args)
}))

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async() => {
    const actual = await vi.importActual('react-router-dom');
    return { 
        ...actual,
        useNavigate: () => mockNavigate,     //Test de surcharge
    }
})

describe("CreateTask", () => {
    //On pointe le lieux du test
    it('Soumet le formulaire avec les bonnes valeurs', () => {
        render(<CreateTask></CreateTask>, { wrapper: MemoryRouter }); //wrapper/meory pr mémoriser les différentes routes
        ////////////////////////////////////////

        //On met le test 
        //screen est propre à react et permet de tester beaucoup de chose
        //On a récupérer la balise titre
        fireEvent.change(screen.getByPlaceholderText("Titre"), {
            target: { value: "Nouvelle tâche" }, //Valeur de test
        });

        fireEvent.change(screen.getByPlaceholderText("Description"), {
            target: { value: "Contenu de la description" }, //Valeur de test
        });

        //Test du composant en lui-même
        fireEvent.click(screen.getByText("Créer"));

        //Résulat du test
        expect(mockPost).toHaveBeenCalledWith('tasks', {
            title: "Nouvelle tâche",
            description: "Contenu de la description",
            status: "todo",
        });

        //Test de la redirection
        expect(mockNavigate).toHaveBeenCalledWith('/tasks');
    });

});

