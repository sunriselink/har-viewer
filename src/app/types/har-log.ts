export interface IHAR {
    readonly log?: IHARLog;
}

export interface IHARLog {
    readonly entries?: IHAREntry[];
}

export interface IHAREntry {
    readonly _fromCache: 'disk';
    readonly request: IHAREntryRequest;
    readonly response: IHAREntryResponse;
    readonly serverIPAddress: string;
    readonly startedDateTime: string;
    readonly time?: number;
}

export interface IHAREntryRequest {
    readonly bodySize: number;
    readonly method: string;
    readonly url: string;
    readonly headers: IHAREntryKeyValue[];
    readonly queryString: IHAREntryKeyValue[];
    readonly postData?: IHAREntryData;
}

export interface IHAREntryResponse {
    readonly bodySize: number;
    readonly status: number;
    readonly redirectURL: string;
    readonly headers: IHAREntryKeyValue[];
    readonly content?: IHAREntryData;
}

export interface IHAREntryData {
    readonly size: number;
    readonly mimeType: string;
    readonly text: string;
}

export interface IHAREntryKeyValue {
    readonly name: string;
    readonly value: string;
}
