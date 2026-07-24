/** @vitest-environment jsdom */
import { MemoryRouter } from "react-router-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import EditTag from "../pages/EditTag";

const mockPatch = vi.fn();
const mockGet = vi.fn().mockResolvedValue({
    data: {
        title: "Ancienne tâche",
        project: "proj123",
    }
});
vi.mock('../services/api.js', () => ({
    patch: (...args) => mockPatch(...args),
    get: (...args) => mockGet(...args),
}))

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: () => mockNavigate,
        useParams: () => ({ id: 'task123' }),
    }
})

vi.mock('../context/AuthContext', () => ({
    useAuth: () => ({ token: 'fake-token' })
}))

describe("EditTag", () => {
    it('Soumet le formulaire avec les bonnes valeurs', async () => {
        render(<EditTag></EditTag>, { wrapper: MemoryRouter });

        // Attendre que les données initiales soient chargées avant d'interagir
        await screen.findByDisplayValue("Ancienne tâche");

        fireEvent.change(screen.getByPlaceholderText("Titre"), {
            target: { value: "Tâche modifiée" },
        });


        fireEvent.click(screen.getByText("Modifier"));

        await waitFor(() => {
            expect(mockPatch).toHaveBeenCalledWith('api/task/task123', {
                title: "Tâche modifiée",
               
            });
        });

        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith('/editTag/', {
                state: { projectId: "proj123" },
            });
        });
    });
});