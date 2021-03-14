import { Segment, SegmentBuilder } from './segment';

export class NumberSegment extends Segment {
    constructor(key: string, value: number) {
        super(key, value, 'number');
        this._description = `${value}`;
    }
}

export class NumberSegmentBuilder extends SegmentBuilder<NumberSegment> {
    public build(key: string, value: any): NumberSegment {
        return new NumberSegment(key, value);
    }

    public canBuild(value: any): boolean {
        return typeof value === 'number';
    }
}
