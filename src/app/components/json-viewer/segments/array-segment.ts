import { JSONArray, JSONValue } from '../../../types/json-value';
import { Segment } from './base/segment';
import { SegmentBuilder } from './base/segment-builder';

export class ArraySegment extends Segment<JSONArray> {
    constructor(key: string, value: JSONArray) {
        super(key, value);
    }

    public override stringify(value: JSONArray): string {
        return `Array[${value.length}] ${JSON.stringify(value)}`;
    }
}

export class ArraySegmentBuilder extends SegmentBuilder<JSONArray, ArraySegment> {
    public override canBuild(value: JSONValue): boolean {
        return Array.isArray(value);
    }

    public override build(fieldName: string, value: JSONArray): ArraySegment {
        return new ArraySegment(fieldName, value);
    }
}
