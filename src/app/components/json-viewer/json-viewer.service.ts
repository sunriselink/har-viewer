import { Injectable } from '@angular/core';
import { JSONValue } from '../../types/json-value';
import { ArraySegmentBuilder } from './segments/array-segment';
import { BooleanSegmentBuilder } from './segments/boolean-segment';
import { NullSegmentBuilder } from './segments/null-segment';
import { NumberSegmentBuilder } from './segments/number-segment';
import { ObjectSegmentBuilder } from './segments/object-segment';
import { Segment, SegmentBuilder } from './segments/segment';
import { StringSegmentBuilder } from './segments/string-segment';
import { UnknownSegmentBuilder } from './segments/unknown-segment';

@Injectable({
    providedIn: 'root',
})
export class JsonViewerService {
    private readonly unknownBuilder = new UnknownSegmentBuilder();
    private readonly builders: SegmentBuilder<JSONValue, Segment>[] = [
        new StringSegmentBuilder(),
        new NumberSegmentBuilder(),
        new BooleanSegmentBuilder(),
        new ObjectSegmentBuilder(),
        new ArraySegmentBuilder(),
        new NullSegmentBuilder(),
    ];

    public createSegments(json: JSONValue): Segment[] {
        if (!json) {
            return [];
        }

        return Object.entries(json).map(([key, value]: [string, JSONValue]) => this.createSegment(key, value));
    }

    private createSegment(key: string, value: JSONValue): Segment {
        const builder = this.builders.find(x => x.canBuild(value)) || this.unknownBuilder;
        return builder.build(key, value);
    }
}
