import { Segment, SegmentBuilder } from './segment';

export class BooleanSegment extends Segment {
    constructor(key: string, value: boolean) {
        super(key, value, 'boolean');
        this._description = `${value}`;
    }
}

export class BooleanSegmentBuilder extends SegmentBuilder<BooleanSegment> {
    public build(key: string, value: any): BooleanSegment {
        return new BooleanSegment(key, value);
    }

    public canBuild(value: any): boolean {
        return typeof value === 'boolean';
    }
}
