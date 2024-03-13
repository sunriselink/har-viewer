import { JSONValue } from '../../../types/json-value';
import { Segment } from './base/segment';
import { SegmentBuilder } from './base/segment-builder';

export class NullSegment extends Segment<null> {
    public override stringify(): string {
        return 'null';
    }
}

export class NullSegmentBuilder extends SegmentBuilder<null, NullSegment> {
    public override canBuild(value: JSONValue): boolean {
        return value === null;
    }

    public override build(fieldName: string, value: null): NullSegment {
        return new NullSegment(fieldName, value);
    }
}
