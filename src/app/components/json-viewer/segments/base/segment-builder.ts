import { JSONValue } from '../../../../types/json-value';
import { Segment } from './segment';

export abstract class SegmentBuilder<TValue extends JSONValue, TSegment extends Segment<TValue>> {
    public abstract canBuild(value: JSONValue): boolean;
    public abstract build(fieldName: string, value: TValue): TSegment;
}
