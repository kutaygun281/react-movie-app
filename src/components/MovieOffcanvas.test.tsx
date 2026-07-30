import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import MovieOffcanvas from "./MovieOffcanvas";

const mockMovie = {
  id: 1,
  title: "Interstellar",
  vote_average: 8.7,
  poster_path: "/poster.jpg",
  overview: "A science fiction movie.",
};

describe("MovieOffcanvas", () => {
  it("renders movie information when show is true", () => {
    render(
      <MovieOffcanvas
        show={true}
        selectedMovie={mockMovie}
        onHide={vi.fn()}
        addToFavorite={vi.fn()}
      />
    );

expect(screen.getAllByText("Interstellar")).toHaveLength(2);
    expect(
      screen.getByText("A science fiction movie.")
    ).toBeInTheDocument();
    expect(screen.getByText("⭐ 8.7")).toBeInTheDocument();

    const image = screen.getByRole("img");
    expect(image).toHaveAttribute(
      "src",
      "https://image.tmdb.org/t/p/w500/poster.jpg"
    );
    expect(image).toHaveAttribute("alt", "Interstellar");
  });

  it("calls addToFavorite when button is clicked", () => {
    const addToFavorite = vi.fn();

    render(
      <MovieOffcanvas
        show={true}
        selectedMovie={mockMovie}
        onHide={vi.fn()}
        addToFavorite={addToFavorite}
      />
    );

    fireEvent.click(screen.getByText("Add to Favorites"));

    expect(addToFavorite).toHaveBeenCalledTimes(1);
    expect(addToFavorite).toHaveBeenCalledWith(mockMovie);
  });

  it("does not render movie title when selectedMovie is null", () => {
    render(
      <MovieOffcanvas
        show={true}
        selectedMovie={null}
        onHide={vi.fn()}
        addToFavorite={vi.fn()}
      />
    );

    expect(screen.queryByText("Interstellar")).not.toBeInTheDocument();
  });

  it("does not render offcanvas content when show is false", () => {
    render(
      <MovieOffcanvas
        show={false}
        selectedMovie={mockMovie}
        onHide={vi.fn()}
        addToFavorite={vi.fn()}
      />
    );

    expect(screen.queryByText("Interstellar")).not.toBeInTheDocument();
  });
});