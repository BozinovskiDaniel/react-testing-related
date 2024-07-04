import { render, screen } from "@testing-library/react";
import ProductImageGallery from "../../src/components/ProductImageGallery";

describe("ProductImageGallery", () => {
    // Assert that the DOM is empty wnen imageUrls is empty
    it("should not render any images when imageUrls is empty", () => {
        const { container } = render(<ProductImageGallery imageUrls={[]} />);

        expect(container).toBeEmptyDOMElement();
    });

    // Assert that images are rendered when imageUrls is provided
    it("should render images when imageUrls is provided", () => {
        const imageUrls = ["url1", "url2"];
        render(<ProductImageGallery imageUrls={imageUrls} />);

        const allImages = screen.getAllByRole("img");
        expect(allImages).toHaveLength(2);

        allImages.forEach((img, index) => {
            expect(img).toHaveAttribute("src", imageUrls[index]);
        });
    });
});
