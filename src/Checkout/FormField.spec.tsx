import {
  render,
  fireEvent,
  screen,
  getByLabelText,
} from "@testing-library/react";
import { FormField } from "./FormField";
describe("FormField", () => {
  it("renders correctly", () => {
    render(<FormField label="Foo label" name="foo" />);

    const input = screen.getByLabelText("Foo label:");

    expect(input).toBeInTheDocument();
    expect(input).not.toHaveClass("is-error");
    expect(input).toHaveAttribute("name", "foo");
  });
  describe("with error", () => {
    it("renders error message", () => {
      render(
        <FormField
          label="Foo label"
          name="foo"
          errors={{ message: "Example error" }}
        />
      );
      expect(screen.getByText("Error: Example error")).toBeInTheDocument();
    });
  });
  describe("on change", () => {
    it("normalizes the input", () => {
      render(
        <FormField
          label="Foo label"
          name="foo"
          errors={{ message: "Example error" }}
          normalize={(value: string) => value.toUpperCase()}
        />
      );

      const input = screen.getByLabelText("Foo label:") as HTMLInputElement;
      fireEvent.change(input, { target: { value: "test" } });
      expect(input.value).toEqual("TEST");
    });
  });
});
