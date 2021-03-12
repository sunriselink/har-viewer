import { truncate } from '../../../utils/truncate';
import { Segment, SegmentBuilder } from './segment';

const STRING_LENGTH_LIMIT = 128;

export class StringSegment extends Segment {
    constructor(key: string, value: any) {
        super(key, value, 'string');

        if (value.length > STRING_LENGTH_LIMIT) {
            value = truncate(value, STRING_LENGTH_LIMIT);
            this._limited = true;
        }

        this._description = `"${value}"`;
    }
}

export class StringSegmentBuilder extends SegmentBuilder<StringSegment> {
    public build(key: string, value: any): StringSegment {
        return new StringSegment(key, value);
    }

    public canBuild(value: any): boolean {
        return typeof value === 'string';
    }
}
