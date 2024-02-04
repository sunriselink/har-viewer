import { JSONValue } from '../../../types/json-value';

export abstract class Segment<T extends JSONValue = JSONValue> {
    protected _key: string;
    protected _description: string = '';
    protected _value: T;
    protected _expandable: boolean;
    protected _expanded: boolean;
    protected _limited: boolean;
    protected _type: string;

    protected constructor(key: string, value: T, type: string) {
        this._key = key;
        this._value = value;
        this._expandable = false;
        this._expanded = false;
        this._limited = false;
        this._type = type;
    }

    public get type(): string {
        return this._type;
    }

    public get limited(): boolean {
        return this._limited;
    }

    public get expanded(): boolean {
        return this._expanded;
    }

    public get expandable(): boolean {
        return this._expandable;
    }

    public get value(): T {
        return this._value;
    }

    public get description(): string {
        return this._description;
    }

    public get key(): string {
        return this._key;
    }

    public toggle(): void {
        this._expanded = !this._expanded;
    }
}

export abstract class SegmentBuilder<TValue extends JSONValue, TSegment extends Segment<TValue>> {
    public abstract build(key: string, value: TValue): TSegment;
    public abstract canBuild(value: JSONValue): boolean;
}
