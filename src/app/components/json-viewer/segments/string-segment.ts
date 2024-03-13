import { JSONValue } from '../../../types/json-value';
import { truncate } from '../../../utils/truncate';
import { Segment } from './base/segment';
import { SegmentBuilder } from './base/segment-builder';

const STRING_LENGTH_LIMIT = 128;

export class StringSegment extends Segment<string> {
    constructor(key: string, value: string) {
        super(key, value);
    }

    public override stringify(value: string): string {
        if (value.length > STRING_LENGTH_LIMIT) {
            // 2 символа на кавычки
            value = truncate(value, STRING_LENGTH_LIMIT - 2);
        }

        return `"${value}"`;
    }
}

export class StringSegmentBuilder extends SegmentBuilder<string, StringSegment> {
    public override canBuild(value: JSONValue): boolean {
        return typeof value === 'string';
    }

    public override build(fieldName: string, value: string): StringSegment {
        return new StringSegment(fieldName, value);
    }
}
