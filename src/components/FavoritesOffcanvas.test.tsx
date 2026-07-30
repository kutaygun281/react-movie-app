import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import FavoritesOffcanvas from "./FavoritesOffCanvas";

const mockFavorites = [
  {
    id: 1,
    title: "Interstellar",
    vote_average: 8.7,
    poster_path: "/poster1.jpg",
    overview: "Space movie",
  },
  {
    id: 2,
    title: "Dune",
    vote_average: 8.3,
    poster_path: "/poster2.jpg",
    overview: "Sci-fi",
  },
];

describe("FavoritesOffCanvas", () => {
  it("renders favorite movies", () => {
    render(
      <FavoritesOffcanvas
        show={true}
        onHide={vi.fn()}
        favorites={mockFavorites}
        removeFavorite={vi.fn()}
      />
    );

    expect(screen.getByText(/Favorite Movies/i)).toBeInTheDocument();

    expect(screen.getByText("Interstellar")).toBeInTheDocument();
    expect(screen.getByText("Dune")).toBeInTheDocument();

    expect(screen.getAllByRole("img")).toHaveLength(2);
  });

  it("shows empty message", () => {
    render(
      <FavoritesOffcanvas
        show={true}
        onHide={vi.fn()}
        favorites={[]}
        removeFavorite={vi.fn()}
      />
    );

    expect(
      screen.getByText("No favorite movies yet.")
    ).toBeInTheDocument();
  });

  it("calls removeFavorite", () => {
    const removeFavorite = vi.fn();

    render(
      <FavoritesOffcanvas
        show={true}
        onHide={vi.fn()}
        favorites={mockFavorites}
        removeFavorite={removeFavorite}
      />
    );

    fireEvent.click(screen.getAllByText("Remove")[0]);

    expect(removeFavorite).toHaveBeenCalledTimes(1);
    expect(removeFavorite).toHaveBeenCalledWith(mockFavorites[0]);
  });

  it("does not render when show is false", () => {
    render(
      <FavoritesOffcanvas
        show={false}
        onHide={vi.fn()}
        favorites={mockFavorites}
        removeFavorite={vi.fn()}
      />
    );

    expect(screen.queryByText("Interstellar")).not.toBeInTheDocument();
  });
});