import { JSONValue } from '../../../types/json-value';
import { Segment } from './base/segment';
import { SegmentBuilder } from './base/segment-builder';

export class NumberSegment extends Segment<number> {
    public override stringify(value: number): string {
        return `${value}`;
    }
}

export class NumberSegmentBuilder extends SegmentBuilder<number, NumberSegment> {
    public override canBuild(value: JSONValue): boolean {
        return typeof value === 'number';
    }

    public override build(fieldName: string, value: number): NumberSegment {
        return new NumberSegment(fieldName, value);
    }
}
