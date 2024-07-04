import { render, screen } from "@testing-library/react";
import ExpandableText from "../../src/components/ExpandableText";
import userEvent from "@testing-library/user-event";

describe("ExpandableText", () => {
    const limit = 255;
    const longText = "a".repeat(limit + 1);
    const truncatedText = longText.substring(0, limit) + "...";

    // Assert that component renders short text
    it("should render short text", () => {
        render(<ExpandableText text="Short text" />);

        const text = screen.getByText("Short text");
        expect(text).toBeInTheDocument();
    });

    // Assert that component renders long text with ellipsis and Show More button
    it("should render long text with ellipsis and Show More button", () => {
        render(<ExpandableText text={longText} />);

        const text = screen.getByText(truncatedText);
        expect(text).toBeInTheDocument();

        const button = screen.getByRole("button");
        expect(button).toBeInTheDocument();
        expect(button).toHaveTextContent("Show More");
    });

    // Assert that component expands text when Show More button is clicked
    it("should show entire text when show more button is clicked", async () => {
        render(<ExpandableText text={longText} />);

        const button = screen.getByRole("button");
        const user = userEvent.setup();

        await user.click(button); // Click the show more button

        // Ensure entire text is displayed
        const text = screen.getByText(longText);
        expect(text).toBeInTheDocument();

        // Ensure button text changes to Show Less
        expect(button).toHaveTextContent(/less/i);
    });

    // Assert that component collapses text when Show Less button is clicked
    it("should show truncated text when show less button is clicked", async () => {
        render(<ExpandableText text={longText} />);

        const showMoreButton = screen.getByRole("button", { name: /more/i });
        const user = userEvent.setup();

        await user.click(showMoreButton); // Click the show more button

        const showLessButton = screen.getByRole("button", { name: /less/i });
        await user.click(showLessButton); // Click the show less button

        // Ensure truncated text is displayed
        const text = screen.getByText(truncatedText);
        expect(text).toBeInTheDocument();
    });
});
