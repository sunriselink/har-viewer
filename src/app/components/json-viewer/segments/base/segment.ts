import { JSONValue } from '../../../../types/json-value';
import { UUID } from '../../../../utils/uuid';

export abstract class Segment<T extends JSONValue = JSONValue> {
    public readonly id = UUID.getNext();
    public readonly fieldName: string;
    public readonly value: T;
    public readonly stringValue: string;

    protected constructor(fieldName: string, value: T) {
        this.fieldName = fieldName;
        this.value = value;
        this.stringValue = this.stringify(value);
    }

    public abstract stringify(value: T): string;
}
