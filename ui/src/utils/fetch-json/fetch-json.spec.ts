import MOCK_CLIENT_LIST from "@/mocks/client/client-mock";
import fetchJson from "./fetch-json";

describe("fetchJson", () => {
  it("should return GetClientsOutput", async () => {
    const output = await fetchJson("/clients");

    expect(output).toStrictEqual(MOCK_CLIENT_LIST);
  });
});
