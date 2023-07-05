import qs from "qs";
import { paths } from "../../api-schema";
import { signature } from "../signature";

export const request = async <U extends keyof paths, M extends keyof paths[U]>(
  route: string,
  method: M,
  // @ts-ignore
  params: paths[U][M]["parameters"]["path"],
  // @ts-ignore
  data: paths[U][M]["parameters"]["body" | "query"],
  req?: {
    headers?: Record<string, string>;
    secret?: string;
  },
) => {
  const {secret} = req || {};

  const isGET = method === "get";

  const raw = { ...(data || {})};
  const body = isGET
    ? qs.stringify(raw, {arrayFormat: "brackets"})
    : JSON.stringify(raw);

  const {
    pathname
  } = new URL("/public/api" + route + (isGET && body ? `?${body}` : ""), "https://api.3commas.io");
    const signatureValue = secret ? signature(secret, pathname, body): '';

  return {// @ts-ignore
      valuesForSignature: {
          signatureValue,
          secret,
          pathname,
          body,
      }
  }
};
