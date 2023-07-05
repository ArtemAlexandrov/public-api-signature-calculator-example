import HmacSHA256 from "crypto-js/hmac-sha256";
import Hex from "crypto-js/enc-hex";

export const signature = (secret: string, url: string, params?: string) => {
    return HmacSHA256(params ? `${url}?${params}` : url, secret).toString(Hex);
}
