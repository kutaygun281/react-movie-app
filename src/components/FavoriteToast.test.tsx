import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import FavoriteToast from "./FavoriteToast";

describe("FavoriteToast", () => {
  it("renders toast message when show is true", () => {
    render(
      <FavoriteToast
        show={true}
        message="Interstellar added to favorites!"
        onClose={vi.fn()}
      />
    );

    expect(screen.getByText("Favorites")).toBeInTheDocument();
    expect(
      screen.getByText("Interstellar added to favorites!")
    ).toBeInTheDocument();
  });

  it("does not render message when show is false", () => {
    render(
      <FavoriteToast
        show={false}
        message="Interstellar added to favorites!"
        onClose={vi.fn()}
      />
    );

    expect(
      screen.queryByText("Interstellar added to favorites!")
    ).not.toBeInTheDocument();
  });
});