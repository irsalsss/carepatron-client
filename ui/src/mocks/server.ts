
import clientHandlers from "@/handlers/client/client-handlers";
import { setupServer } from "msw/node";

const handlers = [...clientHandlers];

export const server = setupServer(...handlers);
