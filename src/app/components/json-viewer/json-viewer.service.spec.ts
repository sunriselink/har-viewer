import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { JSONValue } from '../../types/json-value';
import { JsonViewerService } from './json-viewer.service';
import { ArraySegment } from './segments/array-segment';
import { BooleanSegment } from './segments/boolean-segment';
import { NullSegment } from './segments/null-segment';
import { NumberSegment } from './segments/number-segment';
import { ObjectSegment } from './segments/object-segment';
import { Segment } from './segments/segment';
import { StringSegment } from './segments/string-segment';
import { UnknownSegment } from './segments/unknown-segment';

describe('Service: JsonViewerService', () => {
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
            dateProp: new Date('2012-12-12') as unknown as JSONValue,
            nullProp: null,
            undefinedProp: void 0,
            objectProp: {
                foo: 1,
                bar: 'baz',
            },
            arrayProp: [1, 2, 3],
        };

        const segments = service.createSegments(testObj);
        const [stringSeg, longStringSeg, numberSeg, booleanSeg, dateSeg, nullSeg, undefinedSeg, objectSeg, arraySeg] =
            segments;

        expect(segments).toHaveSize(9);

        checkSegment(stringSeg, StringSegment, {
            type: 'string',
            key: 'stringProp',
            value: 'string_value',
            description: '"string_value"',
            expandable: false,
            limited: false,
        });

        checkSegment(longStringSeg, StringSegment, {
            type: 'string',
            key: 'longStringProp',
            value: '111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111',
            description:
                '"11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111..."',
            expandable: false,
            limited: true,
        });

        checkSegment(numberSeg, NumberSegment, {
            type: 'number',
            key: 'numberProp',
            value: 5,
            description: '5',
            expandable: false,
            limited: false,
        });

        checkSegment(booleanSeg, BooleanSegment, {
            type: 'boolean',
            key: 'booleanProp',
            value: true,
            description: 'true',
            expandable: false,
            limited: false,
        });

        checkSegment(dateSeg, UnknownSegment, {
            type: 'unknown',
            key: 'dateProp',
            value: new Date('2012-12-12') as unknown as JSONValue,
            description: '"2012-12-12T00:00:00.000Z"',
            expandable: false,
            limited: false,
        });

        checkSegment(nullSeg, NullSegment, {
            type: 'null',
            key: 'nullProp',
            value: null,
            description: 'null',
            expandable: false,
            limited: false,
        });

        checkSegment(undefinedSeg, UnknownSegment, {
            type: 'unknown',
            key: 'undefinedProp',
            value: void 0,
            description: 'undefined',
            expandable: false,
            limited: false,
        });

        checkSegment(objectSeg, ObjectSegment, {
            type: 'object',
            key: 'objectProp',
            value: {
                foo: 1,
                bar: 'baz',
            },
            description: 'Object {"foo":1,"bar":"baz"}',
            expandable: true,
            limited: false,
        });

        checkSegment(arraySeg, ArraySegment, {
            type: 'array',
            key: 'arrayProp',
            value: [1, 2, 3],
            description: 'Array[3] [1,2,3]',
            expandable: true,
            limited: false,
        });
    });
});

interface ISegmentCheckValue {
    key: string;
    value: JSONValue;
    description: string;
    type: string;
    expandable: boolean;
    limited: boolean;
}

function checkSegment<T>(segment: Segment, type: Type<T>, values: ISegmentCheckValue): void {
    expect(segment).toBeInstanceOf(type);
    expect(segment.key).toBe(values.key);
    expect(segment.value).toEqual(values.value);
    expect(segment.description).toBe(values.description);
    expect(segment.type).toBe(values.type);
    expect(segment.expandable).toBe(values.expandable);
    expect(segment.limited).toBe(values.limited);
}
