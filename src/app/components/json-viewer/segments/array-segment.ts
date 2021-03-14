import { Segment, SegmentBuilder } from './segment';

export class ArraySegment extends Segment {
    constructor(key: string, value: any[]) {
        super(key, value, 'array');
        this._expandable = true;
        this._description = `Array[${value.length}] ${JSON.stringify(value)}`;
    }
}

export class ArraySegmentBuilder extends SegmentBuilder<ArraySegment> {
    public build(key: string, value: any): ArraySegment {
        return new ArraySegment(key, value);
    }

    public canBuild(value: any): boolean {
        return Array.isArray(value);
    }
}
