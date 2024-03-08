import { IHAREntry, IHAREntryRequest, IHAREntryResponse } from '../types/har-log';
import { UUID } from '../utils/uuid';

export class HAREntry {
    public readonly id: number = UUID.getNext();
    public readonly fromDiskCache: boolean;
    public readonly request: IHAREntryRequest;
    public readonly response: IHAREntryResponse;
    public readonly serverIPAddress: string;
    public readonly startedDateTime: string;
    public readonly time: number;

    constructor(entry: IHAREntry) {
        this.fromDiskCache = entry._fromCache === 'disk';
        this.request = entry.request;
        this.response = entry.response;
        this.serverIPAddress = entry.serverIPAddress;
        this.startedDateTime = entry.startedDateTime;
        this.time = entry.time ?? 0;
    }
}
