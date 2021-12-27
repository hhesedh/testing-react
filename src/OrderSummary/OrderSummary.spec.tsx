import { fireEvent, render, screen } from "@testing-library/react";
import { OrderSummary } from "./OrderSummary";

jest.mock("../shared/Loader", () => ({ Loader: () => <div>loader</div> }));

describe("OrderSummary", () => {
  afterEach(jest.clearAllMocks);
  describe("while order data being loaded", () => {
    it("renders loader", () => {
      const stubUseOrder = () => ({
        order: undefined,
        isLoading: true,
      });

      render(<OrderSummary useOrderHook={stubUseOrder} />);

      expect(screen.getByText("loader")).toBeInTheDocument();
    });
  });
  describe("when order is loaded", () => {
    const stubUseOrder = () => ({
      isLoading: false,
      order: {
        products: [
          {
            name: "Product foo",
            price: 10,
            image: "image.png",
          },
        ],
      },
    });
    it("renders order info", () => {
      renderWithRouter(() => <OrderSummary useOrderHook={stubUseOrder} />);
      expect(screen.getByText("Product foo")).toBeInTheDocument();
    });
    it("navigates to main page on button click", () => {
      const { history } = renderWithRouter(() => (
        <OrderSummary useOrderHook={stubUseOrder} />
      ));

      fireEvent.click(screen.getByText("Back to the store"));

      expect(history.location.pathname).toEqual("/");
    });
  });
  describe("without order", () => {
    it("renders error message", () => {
      const stubUseOrder = () => ({
        isLoading: false,
        order: undefined,
      });

      render(<OrderSummary useOrderHook={stubUseOrder} />);
      expect(screen.getByText("Couldn't load order info.")).toBeInTheDocument();
    });
  });
});
