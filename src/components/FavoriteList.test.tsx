import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import FavoriteList from "./FavoriteList";

const mockMovie = {
  id: 1,
  title: "Interstellar",
  vote_average: 8.7,
  poster_path: "/poster.jpg",
  overview: "Space movie",
};

describe("FavoriteList", () => {
  it("renders favorite movie", () => {
    render(
      <FavoriteList
        fav={mockMovie}
        handleRemove={vi.fn()}
      />
    );

    expect(screen.getByText("Interstellar")).toBeInTheDocument();
  });

  it("calls handleRemove when remove button is clicked", () => {
    const handleRemove = vi.fn();

    render(
      <FavoriteList
        fav={mockMovie}
        handleRemove={handleRemove}
      />
    );

    fireEvent.click(screen.getByRole("button"));

    expect(handleRemove).toHaveBeenCalledTimes(1);
    expect(handleRemove).toHaveBeenCalledWith(mockMovie);
  });
});