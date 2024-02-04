import { JSONValue } from '../../../types/json-value';
import { Segment, SegmentBuilder } from './segment';

export class NumberSegment extends Segment<number> {
    constructor(key: string, value: number) {
        super(key, value, 'number');
        this._description = `${value}`;
    }
}

export class NumberSegmentBuilder extends SegmentBuilder<number, NumberSegment> {
    public build(key: string, value: number): NumberSegment {
        return new NumberSegment(key, value);
    }

    public canBuild(value: JSONValue): boolean {
        return typeof value === 'number';
    }
}
