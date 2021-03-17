import { Segment, SegmentBuilder } from './segment';

export class ObjectSegment extends Segment {
    constructor(key: string, value: any) {
        super(key, value, 'object');
        this._expandable = true;
        this._description = `Object ${JSON.stringify(value)}`;
    }
}

export class ObjectSegmentBuilder extends SegmentBuilder<ObjectSegment> {
    public build(key: string, value: any): ObjectSegment {
        return new ObjectSegment(key, value);
    }

    public canBuild(value: any): boolean {
        return typeof value === 'object' && value !== null && !Array.isArray(value) && !(value instanceof Date);
    }
}
