import { fireEvent, screen } from "@testing-library/react";
import { Header } from "./Header";

jest.mock("./CartWidget", () => ({
  CartWidget: () => <div>Cart widget</div>,
}));

describe("Header", () => {
  it("renders correctly", () => {
    const { container } = renderWithRouter(() => <Header />);
    expect(container.innerHTML).toMatch("Goblin Store");
    expect(container.innerHTML).toMatch("Cart widget");
  });

  it("navigates to / on header title click", () => {
    const { history } = renderWithRouter(() => <Header />);
    fireEvent.click(screen.getByText("Goblin Store"));
    expect(history.location.pathname).toEqual("/");
  });
});
