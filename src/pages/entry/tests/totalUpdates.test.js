import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { OrderDetailsProvider } from "../../../contexts/OrderDetails";
import Options from "../Options";

test("update scoop subtotal when scoops change", async () => {
  render(<Options optionType="scoops" />, { wrapper: OrderDetailsProvider });
  // we can use exact option as false
  const scoopsSubtotal = screen.getByText(/scoops total/i);
  // make sure total starts out $0.00
  expect(scoopsSubtotal).toHaveTextContent("0.00");
  // update vanilla scoops to 1 and check the subtotal (price $2 each)
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "1");
  expect(scoopsSubtotal).toHaveTextContent("2.00");
  // update chocolate scoops to 2 and check the subtotal (price $2 each)
  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });
  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, "2");
  expect(scoopsSubtotal).toHaveTextContent("6.00");
});
