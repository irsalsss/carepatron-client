import { renderHook, waitFor } from "@/utils/test/react-testing-setup";
import { wrapperReactQuery } from "@/utils/test/wrapper-testing";
import mapToCamelCase from "@/utils/map-to-camel-case/map-to-camel-case";
import MOCK_CLIENT_LIST from "@/mocks/client/client-mock";
import { prefetchGetClientsQuery, useGetClientsQuery } from "./use-get-clients";

describe("useGetClientsQuery", () => {
  it("should return GetClientsOutput", async () => {
    const { result } = renderHook(() => useGetClientsQuery(), {
      wrapper: wrapperReactQuery,
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBeTruthy();
    });

    expect(result.current.data).toStrictEqual(mapToCamelCase(MOCK_CLIENT_LIST));
  });

  it("should run prefetchGetClientsQuery", async () => {
    const { result } = renderHook(async () => await prefetchGetClientsQuery(), {
      wrapper: wrapperReactQuery,
    });

    expect(await result.current).toStrictEqual(
      mapToCamelCase(MOCK_CLIENT_LIST)
    );
  });
});
