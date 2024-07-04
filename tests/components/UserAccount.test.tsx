import { render, screen } from "@testing-library/react";
import UserAccount from "../../src/components/UserAccount";
import { User } from "../../src/entities";

describe("UserAccount", () => {
    // Assert that the users name appears
    it("should render users name when provided", () => {
        const user: User = { id: 1, name: "Daniel", isAdmin: false };
        render(<UserAccount user={user} />);

        expect(screen.getByText(user.name)).toBeInTheDocument();
    });

    // Assert that the edit button appears when user is an admin
    it("should render edit button when user is admin", () => {
        const user: User = { id: 1, name: "Daniel", isAdmin: true };
        render(<UserAccount user={user} />);

        const button = screen.getByRole("button");
        expect(button).toBeInTheDocument();
        expect(button).toHaveTextContent(/edit/i);
    });

    // Assert that edit button does not appear when user is not an admin
    it("should not render edit button when user is not admin", () => {
        const user: User = { id: 1, name: "Daniel", isAdmin: false };
        render(<UserAccount user={user} />);

        const button = screen.queryByRole("button");
        expect(button).not.toBeInTheDocument();
    });
});
