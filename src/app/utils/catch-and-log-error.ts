import { of, OperatorFunction } from 'rxjs';
import { catchError } from 'rxjs/operators';

export function catchAndLogError<T>(data: T = null): OperatorFunction<unknown, unknown> {
    return catchError((err: unknown) => {
        console.error(err);
        alert('Ошибка');
        return of<T>(data);
    });
}
