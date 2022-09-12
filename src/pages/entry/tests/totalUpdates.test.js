import { render, screen } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import { OrderDetailsProvider } from "../../../contexts/OrderDetails";
import Options from "../Options";

test("update scoop subtotal when scoops change", async () => {
  render(<Options optionType="scoops" />);
  // we can use exact option as false
  const scoopsSubtotal = screen.getByText(/scoops total/i);
  // make sure total starts out $0.00
  expect(scoopsSubtotal).toHaveTextContent("0.00");
  // update vanilla scoops to 1 and check the subtotal
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "1");
  expect(scoopsSubtotal).toHaveTextContent("2.00");
  // update chocolate scoops to 2 and check the subtotal
  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });
  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, "2");
  expect(scoopsSubtotal).toHaveTextContent("6.00");
});

test.only("update topping subtotal when toppings change", async () => {
  render(<Options optionType="toppings" />);
  const toppingsTotal = screen.getByText(/toppings total/i);
  // make sure total starts out $0.00
  expect(toppingsTotal).toHaveTextContent("0.00");
  // update one topping and check the subtotal
  const checkboxes = await screen.findAllByRole("checkbox");
  const firstCheckbox = checkboxes[0];
  userEvent.click(firstCheckbox);
  expect(toppingsTotal).toHaveTextContent("1.5");
  // update a second topping and check the subtotal
  const secondCheckbox = checkboxes[1];
  userEvent.click(secondCheckbox);
  expect(toppingsTotal).toHaveTextContent("3");
  // remove a topping and check the subtotal
  userEvent.click(firstCheckbox);
  expect(toppingsTotal).toHaveTextContent("1.5");
});
