import userEvent from "@testing-library/user-event";
import { render, screen } from "../../../test-utils/testing-library-utils";
import Options from "../Options";

test("displays image for each scoop option from server", async () => {
  render(<Options optionType="scoops" />);

  // find images, name is alt text
  const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i });
  expect(scoopImages).toHaveLength(2);
  // confirm alt text of images
  const altText = scoopImages.map((element) => element.alt);
  expect(altText).toEqual(["Chocolate scoop", "Vanilla scoop"]);
});

test("displays image for each topping option from server", async () => {
  render(<Options optionType="toppings" />);

  // find images, name is alt text
  const toppingImages = await screen.findAllByRole("img", {
    name: /topping$/i,
  });
  expect(toppingImages).toHaveLength(3);
  // confirm alt text of images
  const altText = toppingImages.map((element) => element.alt);

  expect(altText).toEqual([
    "M&Ms topping",
    "Hot fudge topping",
    "Peanut butter cups topping",
  ]);
});

test("scoops subtotal doesn't update when the input is invalid", async () => {
  render(<Options optionType="scoops" />);
  const scoops = await screen.findAllByRole("spinbutton");
  const scoopsInput = scoops[0];
  userEvent.clear(scoopsInput);
  userEvent.type(scoopsInput, "-1");

  // expect scoops total doesn't update
  const scoopsTotal = screen.getByText(/scoops total/i);
  expect(scoopsTotal).toHaveTextContent("0");
});
