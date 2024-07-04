import { render, screen } from "@testing-library/react";
import UserList from "../../src/components/UserList";
import { User } from "../../src/entities";

describe("UserList", () => {
    // Assert no users avaiable when empty users
    it("should render no users available when no users are provided", () => {
        render(<UserList users={[]} />);

        expect(screen.getByText(/no users available/i)).toBeInTheDocument();
    });

    // Assert users are rendered when provided
    it("should render users a list of users when provided", () => {
        const users: User[] = [
            { id: 1, name: "Daniel", isAdmin: false },
            { id: 2, name: "John", isAdmin: true },
        ];

        render(<UserList users={users} />);

        users.forEach((user) => {
            const link = screen.getByRole("link", { name: user.name });
            expect(link).toBeInTheDocument();
            expect(link).toHaveAttribute("href", `/users/${user.id}`);
        });
    });
});
