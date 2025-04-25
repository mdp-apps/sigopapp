import { RequestHandler } from "msw/lib/core/handlers/RequestHandler";
import { http, HttpResponse } from "msw";

export const handlers: Array<RequestHandler> = [
  http.post(
    "/validasesion",
    () => {
      return HttpResponse.json({
        id: "15d42a4d-1948-4de4-ba78-b8a893feaf45",
        firstName: "John",
      });
    }
  )
];