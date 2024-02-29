import { render } from "@/utils/test/react-testing-setup";
import ClientsTableHeader from "./clients-table-header";

describe("ClientsTableHeader", () => {
  it("should render client table header successfully", () => {
    const { baseElement } = render(<ClientsTableHeader />);

    expect(baseElement).toMatchSnapshot();
    expect(baseElement).toBeTruthy();
  });
});
