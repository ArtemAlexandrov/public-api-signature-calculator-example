import type { Response } from "node-fetch";
export const handler = async <Data>(response: Response, options: { method: string; body: unknown }) =>
  new Promise<{ data: Data, status: number }>(async (resolve, reject) => {
    const { status, url } = response;
    try {
      const text = await response.text();
      try {
        return resolve({ data: JSON.parse(text), status });
      } catch (parseError) {
        return reject({
          status,
          message: text,
          url,
          ...options,
        })
      }
    } catch (responseError) {
      return reject({
        status,
        url,
        ...options,
      })
    }
  })
