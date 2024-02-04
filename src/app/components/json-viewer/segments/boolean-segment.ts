import { JSONValue } from '../../../types/json-value';
import { Segment, SegmentBuilder } from './segment';

export class BooleanSegment extends Segment<boolean> {
    constructor(key: string, value: boolean) {
        super(key, value, 'boolean');
        this._description = `${value}`;
    }
}

export class BooleanSegmentBuilder extends SegmentBuilder<boolean, BooleanSegment> {
    public build(key: string, value: boolean): BooleanSegment {
        return new BooleanSegment(key, value);
    }

    public canBuild(value: JSONValue): boolean {
        return typeof value === 'boolean';
    }
}
