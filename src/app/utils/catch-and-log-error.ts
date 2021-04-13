import { Observable, of, OperatorFunction } from 'rxjs';
import { catchError } from 'rxjs/operators';

export function catchAndLogError<T>(data: T | Observable<T> = null): OperatorFunction<unknown, unknown> {
    return catchError((err: unknown) => {
        console.error(err);
        alert('Ошибка');
        return data instanceof Observable ? data : of<T>(data);
    });
}
