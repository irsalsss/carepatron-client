import { env } from "@/config/env";
import MOCK_CLIENT_LIST from "@/mocks/client/client-mock";
import { rest } from "msw";

const clientHandlers = [
  rest.get(env.API_URL + "/clients", (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(MOCK_CLIENT_LIST));
  }),

  rest.put(env.API_URL + "/clients/:id", (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(MOCK_CLIENT_LIST[0]));
  }),

  rest.post(env.API_URL + "/clients", (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(MOCK_CLIENT_LIST[0]));
  }),
];

export default clientHandlers;
