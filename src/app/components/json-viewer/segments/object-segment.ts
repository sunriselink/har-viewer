import { JSONObject, JSONValue } from '../../../types/json-value';
import { isObjectOrArray } from '../../../utils/is-object-or-array';
import { Segment } from './base/segment';
import { SegmentBuilder } from './base/segment-builder';

export class ObjectSegment extends Segment<JSONObject> {
    constructor(key: string, value: JSONObject) {
        super(key, value);
    }

    public override stringify(value: JSONValue): string {
        return `Object ${JSON.stringify(value)}`;
    }
}

export class ObjectSegmentBuilder extends SegmentBuilder<JSONObject, ObjectSegment> {
    public canBuild(value: JSONValue): boolean {
        return isObjectOrArray(value) && !Array.isArray(value);
    }

    public override build(fieldName: string, value: JSONObject): ObjectSegment {
        return new ObjectSegment(fieldName, value);
    }
}
