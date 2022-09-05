import {
  fireEvent,
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SummaryForm from "../SummaryForm";

test("checkbox enables confirm order button", () => {
  render(<SummaryForm />);

  const checkbox = screen.getByRole("checkbox", { name: /i agree/i });
  const button = screen.getByRole("button", { name: "Confirm order" });
  expect(checkbox).not.toBeChecked();
  userEvent.click(checkbox);
  expect(button).toBeEnabled();
  userEvent.click(checkbox);
  expect(button).toBeDisabled();
});

test("popover response to hover", async () => {
  render(<SummaryForm />);
  // popover starts out hidden
  const nullPopover = screen.queryByText(/no ice cream will actually/i);
  expect(nullPopover).not.toBeInTheDocument();

  // popover appears upon mouseover of checkbox label
  const termsAndConditions = screen.getByText(/terms and conditions/i);
  userEvent.hover(termsAndConditions);
  const popover = screen.getByText(/no ice cream will actually/i);
  expect(popover).toBeInTheDocument(); // it is not necessary, because we are querying it, but it is a best practice

  // popover disappears when mouse out
  userEvent.unhover(termsAndConditions);
  await waitForElementToBeRemoved(() =>
    screen.queryByText(/no ice cream will actually/i)
  );
});
