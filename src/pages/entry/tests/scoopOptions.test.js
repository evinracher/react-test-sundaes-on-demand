import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ScoopOption from "../ScoopOption";

test("input turns red when invalid scoops count", () => {
  render(<ScoopOption name="vanilla" updateItemCount={jest.fn()} />);
  const input = screen.getByRole("spinbutton");
  userEvent.clear(input);
  userEvent.type(input, "-1");
  expect(input).toHaveClass("is-invalid");
});
