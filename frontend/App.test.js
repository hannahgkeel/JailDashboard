import React from "react";
import { render } from "@testing-library/react";
import App from "./App";
import Search from "./components/Search";

test("renders search component", () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(<Search />);
  expect(linkElement).toBeInTheDocument();
});
