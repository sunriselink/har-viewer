import { JSONValue } from '../../../types/json-value';
import { Segment, SegmentBuilder } from './segment';

export class ObjectSegment extends Segment {
    constructor(key: string, value: JSONValue) {
        super(key, value, 'object');
        this._expandable = true;
        this._description = `Object ${JSON.stringify(value)}`;
    }
}

export class ObjectSegmentBuilder extends SegmentBuilder<JSONValue, ObjectSegment> {
    public build(key: string, value: JSONValue): ObjectSegment {
        return new ObjectSegment(key, value);
    }

    public canBuild(value: JSONValue): boolean {
        return typeof value === 'object' && value !== null && !Array.isArray(value) && !(value instanceof Date);
    }
}
