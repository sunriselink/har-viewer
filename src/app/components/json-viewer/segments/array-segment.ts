import { JSONValue } from '../../../types/json-value';
import { Segment, SegmentBuilder } from './segment';

export class ArraySegment extends Segment<JSONValue[]> {
    constructor(key: string, value: JSONValue[]) {
        super(key, value, 'array');
        this._expandable = true;
        this._description = `Array[${value.length}] ${JSON.stringify(value)}`;
    }
}

export class ArraySegmentBuilder extends SegmentBuilder<JSONValue[], ArraySegment> {
    public build(key: string, value: JSONValue[]): ArraySegment {
        return new ArraySegment(key, value);
    }

    public canBuild(value: JSONValue): boolean {
        return Array.isArray(value);
    }
}
