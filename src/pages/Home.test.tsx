import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Home from "./Home";

const moviesResponse = {
  results: [
    {
      id: 1,
      title: "Interstellar",
      vote_average: 8.7,
      poster_path: "/poster.jpg",
      overview: "Space movie",
    },
  ],
  total_pages: 10,
};

const genresResponse = {
  genres: [
    {
      id: 28,
      name: "Action",
    },
  ],
};

describe("Home", () => {
  beforeEach(() => {
    vi.restoreAllMocks();

    vi.spyOn(globalThis, "fetch").mockImplementation((url) => {
      if (String(url).includes("/genre/movie/list")) {
        return Promise.resolve({
          json: () => Promise.resolve(genresResponse),
        } as Response);
      }

      return Promise.resolve({
        json: () => Promise.resolve(moviesResponse),
      } as Response);
    });
  });

  it("renders movies after successful api call", async () => {
    render(<Home />);

    expect(screen.getByRole("status")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("Interstellar")).toBeInTheDocument();
    });

    expect(fetch).toHaveBeenCalledTimes(2);
  });
  it("shows error message when api request fails", async () => {
  vi.spyOn(globalThis, "fetch").mockRejectedValueOnce(
    new Error("Network Error")
  );

  render(<Home />);

  await waitFor(() => {
    expect(screen.getByText("Something happened")).toBeInTheDocument();
  });
});
it("loads favorites from localStorage", () => {
  const favorites = [
    {
      id: 99,
      title: "Batman",
      vote_average: 8.5,
      poster_path: "/batman.jpg",
      overview: "Batman movie",
    },
  ];

  vi.spyOn(Storage.prototype, "getItem").mockReturnValue(
    JSON.stringify(favorites)
  );

  render(<Home />);

  expect(localStorage.getItem).toHaveBeenCalledWith("favorites");
});
});