import { JSONValue } from '../../../types/json-value';
import { Segment, SegmentBuilder } from './segment';

export class NullSegment extends Segment<null> {
    constructor(key: string, value: null) {
        super(key, value, 'null');
        this._description = 'null';
    }
}

export class NullSegmentBuilder extends SegmentBuilder<null, NullSegment> {
    public build(key: string, value: null): NullSegment {
        return new NullSegment(key, value);
    }

    public canBuild(value: JSONValue): boolean {
        return value === null;
    }
}
