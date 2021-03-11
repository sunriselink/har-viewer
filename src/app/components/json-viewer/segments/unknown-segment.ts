import { Segment, SegmentBuilder } from './segment';

export class UnknownSegment extends Segment {
    constructor(key: string, value: string) {
        super(key, value, 'unknown');

        try {
            this._description = JSON.stringify(value);
        } catch {
            this._description = `${value}`;
        }
    }
}

export class UnknownSegmentBuilder extends SegmentBuilder<UnknownSegment> {
    public build(key: string, value: any): UnknownSegment {
        return new UnknownSegment(key, value);
    }

    public canBuild(value: any): boolean {
        return true;
    }
}