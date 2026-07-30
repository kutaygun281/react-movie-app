import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
import { MovieCard } from "./MovieCard";

const mockMovie = {
  id: 1,
  title: "Interstellar",
  vote_average: 8.7,
  poster_path: "/poster.jpg",
  overview: "Space movie",
};

describe("MovieCard", () => {
  it("renders movie information", () => {
    render(
      <BrowserRouter>
        <MovieCard
          mov={mockMovie}
          handleClick={vi.fn()}
          handleDetail={vi.fn()}
        />
      </BrowserRouter>
    );

    expect(screen.getByText("Interstellar")).toBeInTheDocument();
    expect(screen.getByText("8.7")).toBeInTheDocument();

    const image = screen.getByRole("img");
    expect(image).toHaveAttribute(
      "src",
      "https://image.tmdb.org/t/p/w500/poster.jpg"
    );
    expect(image).toHaveAttribute("alt", "Interstellar");
  });

  it("calls handleClick when Add to favorite button is clicked", () => {
    const handleClick = vi.fn();

    render(
      <BrowserRouter>
        <MovieCard
          mov={mockMovie}
          handleClick={handleClick}
          handleDetail={vi.fn()}
        />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByText("Add to favorite"));

    expect(handleClick).toHaveBeenCalledTimes(1);
    expect(handleClick).toHaveBeenCalledWith(mockMovie);
  });

  it("calls handleDetail when Details button is clicked", () => {
    const handleDetail = vi.fn();

    render(
      <BrowserRouter>
        <MovieCard
          mov={mockMovie}
          handleClick={vi.fn()}
          handleDetail={handleDetail}
        />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByText("Details"));

    expect(handleDetail).toHaveBeenCalledTimes(1);
    expect(handleDetail).toHaveBeenCalledWith(mockMovie);
  });
});