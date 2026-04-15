import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";

// Mock the fetch API
global.fetch = jest.fn();

describe("App Component - API Mocking", () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it("should fetch and display users from API", async () => {
    // Mock data
    const mockUsers = [
      { id: 1, name: "John", email: "john@example.com" },
      { id: 2, name: "Jane", email: "jane@example.com" },
    ];

    // Mock the fetch response
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockUsers,
    });

    // Render component
    render(<App />);

    // Wait for data to load and verify it displays
    await waitFor(() => {
      expect(screen.getByText("John")).toBeInTheDocument();
      expect(screen.getByText("Jane")).toBeInTheDocument();
    });

    screen.debug(); // shows the results on screen ( good for backend as you don't necessarily see the output).

    // Verify fetch was called with correct URL (Jest.fn())
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith("http://localhost:3001/users");

    expect(fetch).toHaveBeenCalled();
  });

  it("should display error message when API fails", async () => {
    // Mock fetch to reject
    fetch.mockRejectedValueOnce(new Error("Network error"));

    render(<App />);

    // Wait for error message to appear
    await waitFor(() => {
      expect(screen.getByText(/Error: Network error/)).toBeInTheDocument();
    });
  });

  it("should display loading state initially", () => {
    // Mock fetch with a delay
    fetch.mockImplementationOnce(
      () =>
        new Promise((resolve) =>
          setTimeout(
            () =>
              resolve({
                ok: true,
                json: async () => [],
              }),
            100,
          ),
        ),
    );

    render(<App />);

    // Check loading text appears
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });
});
