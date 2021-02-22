export interface IHAR {
    log: IHARLog;
}

export interface IHARLog {
    entries: IHAREntry[];
}

export interface IHAREntry {
    request: IHAREntryRequest;
    response: IHAREntryResponse;
    serverIPAddress: string;
    startedDateTime: string;
    time: number;
}

export interface IHAREntryRequest {
    method: string;
    url: string;
    headers: IHAREntryKeyValue[];
    queryString: IHAREntryKeyValue[];
    postData: IHAREntryData;
}

export interface IHAREntryResponse {
    status: number;
    statusText: string;
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
