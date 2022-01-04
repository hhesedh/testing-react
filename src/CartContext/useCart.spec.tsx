import { useCart } from "./useCart";
import { renderHook, act } from "@testing-library/react-hooks";
import { Product } from "../shared/types";

describe("useCart", () => {
  beforeEach(() => {
    jest.spyOn(Object.getPrototypeOf(localStorage), "setItem");
  });
  afterEach(() => {
    localStorage.clear();
    jest.restoreAllMocks();
  });

  describe("on mount", () => {
    it("loads data from localStorage", () => {
      const products: Product[] = [
        {
          name: "Product foo",
          price: 0,
          image: "image.jpg",
        },
      ];
      localStorage.setItem("products", JSON.stringify(products));

      const { result } = renderHook(useCart);

      expect(result.current.products).toEqual(products);
    });
  });

  describe("#addToCart", () => {
    it("adds item to the cart", () => {
      const product: Product = {
        name: "Product foo",
        price: 0,
        image: "image.jpg",
      };
      const { result } = renderHook(useCart);

      act(() => {
        result.current.addToCart(product);
      });

      expect(result.current.products).toEqual([product]);
      expect(localStorage.setItem).toHaveBeenCalledWith(
        "products",
        JSON.stringify([product])
      );
    });

    it("no adds item to the cart if item in localStorage", () => {
      const product: Product = {
        name: "Product foo",
        price: 0,
        image: "image.jpg",
      };

      localStorage.setItem("products", JSON.stringify([product]));

      const { result } = renderHook(useCart);

      act(() => {
        result.current.addToCart(product);
      });

      expect(result.current.products).toEqual([product]);
      expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    });
  });

  describe("#removeFromCart", () => {
    it("removes item from the cart", () => {
      const product: Product = {
        name: "Product foo",
        price: 0,
        image: "image.jpg",
      };
      localStorage.setItem("products", JSON.stringify([product]));

      const { result } = renderHook(useCart);

      act(() => {
        result.current.removeFromCart(product);
      });

      expect(result.current.products).toEqual([]);

      expect(localStorage.setItem).toHaveBeenCalledWith("products", "[]");
    });
  });

  describe("#totalPrice", () => {
    it("returns total products price", () => {
      const product: Product = {
        name: "Product foo",
        price: 21,
        image: "image.jpg",
      };
      localStorage.setItem("products", JSON.stringify([product, product]));

      const { result } = renderHook(useCart);

      expect(result.current.totalPrice()).toEqual(42);
    });
  });

  describe("#clearCart", () => {
    it("removes all the products from the cart", () => {
      const product: Product = {
        name: "Product foo",
        price: 21,
        image: "image.jpg",
      };
      localStorage.setItem("products", JSON.stringify([product, product]));
      const { result } = renderHook(useCart);

      act(() => {
        result.current.clearCart();
      });

      expect(result.current.products).toEqual([]);
      expect(localStorage.setItem).toHaveBeenCalledWith("products", "[]");
    });
  });
});
