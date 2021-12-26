import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { CheckoutForm } from "./CheckoutForm";

describe("CheckoutForm", () => {
  it("renders correctly", () => {
    const { container } = render(<CheckoutForm />);

    expect(container.innerHTML).toMatch("Cardholders Name");
    expect(container.innerHTML).toMatch("Card Number");
    expect(container.innerHTML).toMatch("Expiration Date");
    expect(container.innerHTML).toMatch("CVV");
  });
  describe("with invalid inputs", () => {
    it("shows errors", async () => {
      const { container } = render(<CheckoutForm />);
      fireEvent.click(screen.getByText("Place order"));

      await waitFor(async () => {
        expect(container.innerHTML).toMatch("cardNumber is a required field");
      });
    });
  });

  describe("with valid inputs", () => {
    describe("on place order button click", () => {
      it("calls submit function with form data", async () => {
        const mockSubmit = jest.fn();

        render(<CheckoutForm submit={mockSubmit} />);

        fireEvent.change(screen.getByLabelText("Cardholders Name:"), {
          target: { value: "Bibo Bobbins" },
        });

        fireEvent.change(screen.getByLabelText("Card Number:"), {
          target: { value: "0000 0000 0000 0000" },
        });
        fireEvent.change(screen.getByLabelText("Expiration Date:"), {
          target: { value: "3020-05" },
        });
        fireEvent.change(screen.getByLabelText("CVV:"), {
          target: { value: "123" },
        });

        fireEvent.click(screen.getByText("Place order"));

        await waitFor(() => {
          expect(mockSubmit).toHaveBeenCalled();
        });
      });
    });
  });
});
