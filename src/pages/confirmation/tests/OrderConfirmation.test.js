import { rest } from "msw";
import { server } from "../../../mocks/server";
import { render, screen } from "../../../test-utils/testing-library-utils";
import OrderConfirmation from "../OrderConfirmation";

test("shows error alert when order request fails", async () => {
  server.resetHandlers(
    rest.post("http://localhost:3030/order", (_, res, ctx) => {
      res(ctx.status(500));
    })
  );
  render(<OrderConfirmation />);
  const errorAlert = await screen.findByRole("alert");
  expect(errorAlert).toHaveTextContent(/An unexpected error occurred/i);
});
