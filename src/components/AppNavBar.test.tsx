import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
import { AppNavBar } from "./AppNavBar";

const genres = [
  { id: 28, name: "Action" },
  { id: 35, name: "Comedy" },
];

describe("AppNavBar", () => {
  it("renders all controls", () => {
    render(
      <BrowserRouter>
        <AppNavBar
          searchTerm=""
          setSearchTerm={vi.fn()}
          genres={genres}
          selectedGenre={0}
          setSelectedGenre={vi.fn()}
          sortBy="popularity.desc"
          setSortBy={vi.fn()}
          favoritesCount={3}
          openFavorites={vi.fn()}
        />
      </BrowserRouter>
    );

    expect(screen.getByPlaceholderText("Search movie...")).toBeInTheDocument();
    expect(screen.getByText("❤️ Favorites (3)")).toBeInTheDocument();
    expect(screen.getByDisplayValue("All Genres")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Most Popular")).toBeInTheDocument();
  });

  it("calls setSearchTerm", () => {
    const setSearchTerm = vi.fn();

    render(
      <BrowserRouter>
        <AppNavBar
          searchTerm=""
          setSearchTerm={setSearchTerm}
          genres={genres}
          selectedGenre={0}
          setSelectedGenre={vi.fn()}
          sortBy="popularity.desc"
          setSortBy={vi.fn()}
          favoritesCount={0}
          openFavorites={vi.fn()}
        />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Search movie..."), {
      target: { value: "Batman" },
    });

    expect(setSearchTerm).toHaveBeenCalledWith("Batman");
  });

  it("calls openFavorites", () => {
    const openFavorites = vi.fn();

    render(
      <BrowserRouter>
        <AppNavBar
          searchTerm=""
          setSearchTerm={vi.fn()}
          genres={genres}
          selectedGenre={0}
          setSelectedGenre={vi.fn()}
          sortBy="popularity.desc"
          setSortBy={vi.fn()}
          favoritesCount={5}
          openFavorites={openFavorites}
        />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByText("❤️ Favorites (5)"));

    expect(openFavorites).toHaveBeenCalledTimes(1);
  });
})