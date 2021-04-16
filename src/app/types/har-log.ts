export interface IHAR {
    log: IHARLog;
}

export interface IHARLog {
    entries: IHAREntry[];
}

export interface IHAREntry {
    _fromCache: 'disk';
    request: IHAREntryRequest;
    response: IHAREntryResponse;
    serverIPAddress: string;
    startedDateTime: string;
    time: number;
}

export interface IHAREntryRequest {
    bodySize: number;
    method: string;
    url: string;
    headers: IHAREntryKeyValue[];
    queryString: IHAREntryKeyValue[];
    postData: IHAREntryData;
}

export interface IHAREntryResponse {
    bodySize: number;
    status: number;
    redirectURL: string;
    headers: IHAREntryKeyValue[];
    content: IHAREntryData;
}

export interface IHAREntryData {
    size: number;
    mimeType: string;
    text: string;
}

export interface IHAREntryKeyValue {
    name: string;
    value: string;
}
