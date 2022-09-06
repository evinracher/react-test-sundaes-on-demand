import { render, screen } from "@testing-library/react";

import Options from "../Options";

test("displays image for each scoop option from server", () => {
  render(<Options optionType="scoops" />);

  // find images, name is alt text
  const scoopImages = screen.getAllByRole("img", { name: /scoop$/i });
  //   expect(scoopImages).toHaveLength()
  // confirm alt text of images
  const altText = scoopImages.map((element) => element.alt);
  expect(altText).toEqual(["Chocolate scoop", "Vanilla scoop"]);
});
