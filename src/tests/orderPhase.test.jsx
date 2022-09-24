import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

test("order phases for happy path", async () => {
  // render app
  render(<App />);
  // add ice cream scoops and toppings
  const grandTotal = screen.getByText(/grand total/i);

  // adding 1 scoop of vanilla, 2$ each
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: /vanilla/i,
  });
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "1");

  // check grand total
  expect(grandTotal).toHaveTextContent("2");

  // adding 1 topping
  const checkboxes = await screen.findAllByRole("checkbox");
  const firstCheckbox = checkboxes[0];
  userEvent.click(firstCheckbox);

  // check grand total
  expect(grandTotal).toHaveTextContent("3.5");
  // find and click order button
  const orderButton = screen.getByRole("button", {
    name: /order/i,
  });

  userEvent.click(orderButton);
  // check summary information based on order
  const scoopsTotal = screen.getByText(/scoops/i);
  expect(scoopsTotal).toHaveTextContent("2");

  const toppingsTotal = screen.getByText(/toppings/i);
  expect(toppingsTotal).toHaveTextContent("1.5");
  // accept terms and conditions and click button to confirm order
  const termsAndConditions = screen.getByRole("checkbox", { name: /agree/i });
  userEvent.click(termsAndConditions);
  const confirmOrderBtn = screen.getByRole("button", {
    name: /confirm order/i,
  });
  userEvent.click(confirmOrderBtn);
  // confirm order number on confirmation page
  const orderNumber = await screen.findByText(/your order number is/i);
  expect(orderNumber).toBeInTheDocument();
  // click new order button on confirmation page
  const newOrderBtn = screen.getByRole("button", {
    name: /create new order/i,
  });
  userEvent.click(newOrderBtn);
  // check that scoops and toppings subtotals have been reset
  const scoopsSubtotal = await screen.findByText(/scoops total/i);
  const toppingsSubtotal = await screen.findByText(/toppings total/i);
  expect(scoopsSubtotal).toHaveTextContent("0");
  expect(toppingsSubtotal).toHaveTextContent("0");
  // waiting to avoid act(...) error
  await screen.findAllByRole("img", { name: /scoop$/i });
});
