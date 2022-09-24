import {
  render,
  screen,
  waitFor,
} from "../../../test-utils/testing-library-utils";
import OrderEntry from "../OrderEntry";
import { rest } from "msw";
import { server } from "../../../mocks/server";
import userEvent from "@testing-library/user-event";

test("handles error for scoops and toppings routes", async () => {
  server.resetHandlers(
    rest.get("http://localhost:3030/scoops", (req, res, ctx) =>
      res(ctx.status(500))
    ),
    rest.get("http://localhost:3030/toppings", (req, res, ctx) =>
      res(ctx.status(500))
    )
  );
  render(<OrderEntry setOrderPhase={jest.fn()} />);
  await waitFor(async () => {
    const alerts = await screen.findAllByRole("alert");
    expect(alerts).toHaveLength(2);
  });
});

test("disables order button for no scoops", async () => {
  render(<OrderEntry />);
  const orderBtn = screen.getByRole("button", {
    name: /order/i,
  });
  // expect the button to be disabled at the beginning
  expect(orderBtn).toBeDisabled();

  const scoops = await screen.findAllByRole("spinbutton");
  const scoopInput = scoops[0];

  // expect the button to be enabled
  userEvent.clear(scoopInput);
  userEvent.type(scoopInput, "1");
  expect(orderBtn).toBeEnabled();
  // expect the button to be disabled again
  userEvent.clear(scoopInput);
  userEvent.type(scoopInput, "0");
  expect(orderBtn).toBeDisabled();
});
