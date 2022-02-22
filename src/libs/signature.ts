import HmacSHA256 from "crypto-js/hmac-sha256";
import Hex from "crypto-js/enc-hex";

export const signature = (secret: string, url: string, params?: string) => {
    const p = params ? `${url}?${params}` : url;
    return HmacSHA256(p, secret).toString(Hex);
}