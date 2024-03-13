import { JSONValue } from '../../../types/json-value';
import { Segment } from './base/segment';
import { SegmentBuilder } from './base/segment-builder';

export class UnknownSegment extends Segment {
    public override stringify(value: JSONValue): string {
        let stringValue: string;

        try {
            stringValue = JSON.stringify(value);
        } catch {
            stringValue = `${value}`;
        }

        return stringValue ?? 'undefined';
    }
}

export class UnknownSegmentBuilder extends SegmentBuilder<JSONValue, UnknownSegment> {
    public override canBuild(): boolean {
        return true;
    }

    public override build(fieldName: string, value: JSONValue): UnknownSegment {
        return new UnknownSegment(fieldName, value);
    }
}
