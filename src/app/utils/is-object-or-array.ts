import { JSONArray, JSONObject, JSONValue } from '../types/json-value';

export function isObjectOrArray(value: JSONValue): value is JSONObject | JSONArray {
    return value != null && typeof value === 'object';
}
