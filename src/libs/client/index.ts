import { request } from "../request";
import { routes } from "./routes"
import { paths } from "../../api-schema";

interface Options {
  key: string,
  secret: string,
  forcedMode?: "real" | "paper",
}

export class ThreeCommasApiClient {
  private readonly key: string;
  private readonly secret: string;
  private readonly forcedMode: string;

  constructor({ key, secret, forcedMode }: Options) {
    if(!key || !secret) {
      throw new Error("[key] and [secret] required parameters")
    }
    this.key = key;
    this.secret = secret;
    this.forcedMode = forcedMode ?? "real";
  }

  public fetch = <K extends keyof typeof routes, M extends keyof paths[typeof routes[K]]>
  (path: string,
   method: M,
   // @ts-ignore
   params: paths[typeof routes[K]][M]["parameters"]["path"],
   // @ts-ignore
   data: paths[typeof routes[K]][M]["parameters"]["body" | "query"],
   req?: {
     headers?: Record<string, string>;
   }) => {
    return request(path, method, params, data, {
      headers: {
        ...(req?.headers || {}),
        apikey: this.key,
      },
      secret: this.secret
    });
  }
}
