import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { JSONValue } from '../../types/json-value';
import { JsonViewerService } from './json-viewer.service';
import { ArraySegment } from './segments/array-segment';
import { Segment } from './segments/base/segment';
import { BooleanSegment } from './segments/boolean-segment';
import { NullSegment } from './segments/null-segment';
import { NumberSegment } from './segments/number-segment';
import { ObjectSegment } from './segments/object-segment';
import { StringSegment } from './segments/string-segment';
import { UnknownSegment } from './segments/unknown-segment';

describe('JsonViewerService', () => {
    let service: JsonViewerService;

    beforeEach(() => {
        service = TestBed.inject(JsonViewerService);
    });

    it('should return empty array when empty value', () => {
        expect(service.createSegments(void 0)).toEqual([]);
        expect(service.createSegments(null)).toEqual([]);
        expect(service.createSegments({})).toEqual([]);
    });

    it('should create segments', () => {
        const testObj = {
            stringProp: 'string_value',
            longStringProp:
                '111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111',
            numberProp: 5,
            booleanProp: true,
            nullProp: null,
            undefinedProp: void 0,
            objectProp: {
                foo: 1,
                bar: 'baz',
            },
            arrayProp: [1, 2, 3],
        };

        const segments = service.createSegments(testObj);
        const [stringSeg, longStringSeg, numberSeg, booleanSeg, nullSeg, undefinedSeg, objectSeg, arraySeg] = segments;

        expect(segments).toHaveSize(8);

        checkSegment(stringSeg, StringSegment, {
            fieldName: 'stringProp',
            value: 'string_value',
            stringValue: '"string_value"',
        });

        checkSegment(longStringSeg, StringSegment, {
            fieldName: 'longStringProp',
            value: '111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111',
            stringValue:
                '"11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111..."',
        });

        checkSegment(numberSeg, NumberSegment, {
            fieldName: 'numberProp',
            value: 5,
            stringValue: '5',
        });

        checkSegment(booleanSeg, BooleanSegment, {
            fieldName: 'booleanProp',
            value: true,
            stringValue: 'true',
        });

        checkSegment(nullSeg, NullSegment, {
            fieldName: 'nullProp',
            value: null,
            stringValue: 'null',
        });

        checkSegment(undefinedSeg, UnknownSegment, {
            fieldName: 'undefinedProp',
            value: void 0,
            stringValue: 'undefined',
        });

        checkSegment(objectSeg, ObjectSegment, {
            fieldName: 'objectProp',
            value: {
                foo: 1,
                bar: 'baz',
            },
            stringValue: 'Object {"foo":1,"bar":"baz"}',
        });

        checkSegment(arraySeg, ArraySegment, {
            fieldName: 'arrayProp',
            value: [1, 2, 3],
            stringValue: 'Array[3] [1,2,3]',
        });
    });
});

interface ISegmentCheckValue {
    fieldName: string;
    value: JSONValue;
    stringValue: string;
}

function checkSegment<T>(segment: Segment, type: Type<T>, values: ISegmentCheckValue): void {
    expect(segment).toBeInstanceOf(type);
    expect(segment.fieldName).toBe(values.fieldName);
    expect(segment.value).toEqual(values.value);
    expect(segment.stringValue).toBe(values.stringValue);
}
