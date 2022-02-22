import qs from "qs";
import "isomorphic-fetch";
import { handler } from "./handler";
import { paths } from "../../api-schema";
import { routeFor } from "./routeFor";
import { signature } from "../signature";

export const request = async <U extends keyof paths, M extends keyof paths[U]>(
    url: U,
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
    const {headers, secret} = req || {};

    const isGET = method === "get";
    const isServer = typeof window === "undefined";

    const route = routeFor(url, params || {});

    if(/\/{.+}/.test(route)) {
        const params = route.match(/{[A-z]+}/g)?.map((value) => value.replace(/{([A-z]+)}/g, "$1")).join(", ")
        throw new Error(`You didn't pass parameters ${params} `);
    }
    const raw = { ...(data || {}), api_key: headers?.apikey, secret };
    const body = isGET
        ? qs.stringify(raw, {arrayFormat: "brackets"})
        : JSON.stringify(raw);
    const {
        href,
        pathname
    } = new URL("/public/api" + route + (isGET && body ? `?${body}` : ""), "https://api.3commas.io");
    const response = await fetch(
        href,
        {
            method: method as string,
            headers: {
                "content-type": "application/json",
                ...(!isServer ? {"x-requested-with": "XMLHttpRequest"} : {}),
                ...(secret
                    ? {"signature": signature(secret, pathname, body)}
                    : {}),
                ...(headers || {}),
            },
            ...(!isGET && body ? {body} : {}),
        }
    );
    // @ts-ignore
    return await handler<paths[U][M]["responses"][200 | 201 | 202 | 203 | 204]>(response, {method, body: !isGET && body})
};
