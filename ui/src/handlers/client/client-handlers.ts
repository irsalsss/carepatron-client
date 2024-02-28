import { env } from "@/config/env";
import MOCK_CLIENT_LIST from "@/mocks/client/client-mock";
import { rest } from "msw";

const clientHandlers = [
  rest.get(env.API_URL + "/clients", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        status_code: 200,
        message: "Success get client list!",
        data: MOCK_CLIENT_LIST,
      })
    );
  }),

  rest.put(env.API_URL + "/clients", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        status_code: 200,
        message: "Success update client!",
        data: {
          id: 1,
          first_name: "Luke - edited",
          last_name: "Skywalker - edited",
          job: "Jedi knight - edited",
          description: "Son of Anakin Skywalker edited",
        },
      })
    );
  }),

  rest.post(env.API_URL + "/clients", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        status_code: 200,
        message: "Success create client!",
        data: MOCK_CLIENT_LIST[0],
      })
    );
  }),
];

export default clientHandlers;