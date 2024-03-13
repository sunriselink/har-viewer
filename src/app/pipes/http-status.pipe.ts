import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'httpStatus',
    standalone: true,
})
export class HttpStatusPipe implements PipeTransform {
    public transform(value: number): string {
        return HTTP_CODES.has(value) ? `${value} (${HTTP_CODES.get(value)})` : `${value}`;
    }
}

const HTTP_CODES = new Map<number, string>([
    [0, 'Cancelled'],
    [200, 'OK'],
    [204, 'No Content'],
    [304, 'Not Modified'],
    [400, 'Bad Request'],
    [401, 'Unauthorized'],
    [403, 'Forbidden'],
    [404, 'Not Found'],
    [405, 'Method Not Allowed'],
    [418, "I'm a teapot"],
    [500, 'Internal Server Error'],
    [502, 'Bad Gateway'],
    [503, 'Service Unavailable'],
    [504, 'Gateway Timeout'],
]);
