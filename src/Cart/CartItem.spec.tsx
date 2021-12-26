import { fireEvent, screen } from "@testing-library/react";
import React from "react";
import { Product } from "../shared/types";
import { CartItem } from "./CartItem";

describe("CartItem", () => {
  const product: Product = {
    name: "Product Foo",
    price: 100,
    image: "/image/source.png",
  };
  it("renders correctly", () => {
    const { container } = renderWithRouter(() => (
      <CartItem product={product} removeFromCart={() => {}} />
    ));

    expect(container.innerHTML).toMatch("Product Foo");
    expect(container.innerHTML).toMatch("100 Zm");
    expect(screen.getByAltText("Product Foo")).toHaveAttribute(
      "src",
      "/image/source.png"
    );
  });
  describe("on 'Remove' click", () => {
    it("calls passed in function", () => {
      const removeFromCartMock = jest.fn();

      renderWithRouter(() => (
        <CartItem product={product} removeFromCart={removeFromCartMock} />
      ));

      fireEvent.click(screen.getByText("Remove"));

      expect(removeFromCartMock).toBeCalledWith(product);
    });
  });
});
