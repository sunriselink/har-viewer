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
}

export interface IHAREntryResponse {
    status: number;
    statusText: string;
    redirectURL: string;
    headers: IHAREntryKeyValue[];
    content: IHAREntryResponseContent;
}

export interface IHAREntryResponseContent {
    size: number;
    mimeType: string;
    text: string;
}

export interface IHAREntryKeyValue {
    name: string;
    value: string;
}
