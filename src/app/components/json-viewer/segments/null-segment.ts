import { Segment, SegmentBuilder } from './segment';

export class NullSegment extends Segment {
    constructor(key: string, value: any) {
        super(key, value, 'null');
        this._description = 'null';
    }
}

export class NullSegmentBuilder extends SegmentBuilder<NullSegment> {
    public build(key: string, value: any): NullSegment {
        return new NullSegment(key, value);
    }

    public canBuild(value: any): boolean {
        return value === null;
    }
}
