import { setupServer } from 'msw/node'

import { http, HttpResponse } from 'msw';

export const handlers = [
  http.post("*/heroes/create", () => {
    return HttpResponse.json({
      id: "123",
      name: "John",
      rank: "A",
      image_url: "https://google.com",

    }, { status: 200 });
  }),
  http.patch("*/heroes/:hero_id", () => {
    return HttpResponse.json({ id: "123" }, { status: 200 })
  }),
  http.delete("*/heroes/:hero_id", () => {
    return HttpResponse.json({}, { status: 200 })
  })
];

export const server = setupServer(...handlers)
