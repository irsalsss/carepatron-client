import mapToCamelCase from "@/utils/map-to-camel-case/map-to-camel-case";
import { getClients } from "./get-clients";
import MOCK_CLIENT_LIST from "@/mocks/client/client-mock";

describe("getClients", () => {
  it("should return GetContactsOutput", async () => {
    const output = await getClients();

    expect(output).toStrictEqual(mapToCamelCase(MOCK_CLIENT_LIST));
  });
});
