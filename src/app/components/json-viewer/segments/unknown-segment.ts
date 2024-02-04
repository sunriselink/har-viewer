import { JSONValue } from '../../../types/json-value';
import { Segment, SegmentBuilder } from './segment';

export class UnknownSegment extends Segment {
    constructor(key: string, value: JSONValue) {
        super(key, value, 'unknown');

        try {
            this._description = JSON.stringify(value);

            if (this._description === void 0) {
                this._description = 'undefined';
            }
        } catch {
            this._description = `${value}`;
        }
    }
}

export class UnknownSegmentBuilder extends SegmentBuilder<JSONValue, UnknownSegment> {
    public build(key: string, value: JSONValue): UnknownSegment {
        return new UnknownSegment(key, value);
    }

    public canBuild(): boolean {
        return true;
    }
}
