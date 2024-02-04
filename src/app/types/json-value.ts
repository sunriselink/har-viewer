export type JSONValue = string | number | boolean | JSONObject | JSONArray | null | undefined;

interface JSONObject {
    [key: string]: JSONValue;
}

interface JSONArray extends Array<JSONValue> {}
