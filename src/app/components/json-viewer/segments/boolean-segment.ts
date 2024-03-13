import { JSONValue } from '../../../types/json-value';
import { Segment } from './base/segment';
import { SegmentBuilder } from './base/segment-builder';

export class BooleanSegment extends Segment<boolean> {
    public override stringify(value: boolean): string {
        return `${value}`;
    }
}

export class BooleanSegmentBuilder extends SegmentBuilder<boolean, BooleanSegment> {
    public override canBuild(value: JSONValue): boolean {
        return typeof value === 'boolean';
    }

    public override build(fieldName: string, value: boolean): BooleanSegment {
        return new BooleanSegment(fieldName, value);
    }
}
