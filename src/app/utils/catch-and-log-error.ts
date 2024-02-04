import { catchError, Observable, of, OperatorFunction } from 'rxjs';

export function catchAndLogError<T>(data: T | Observable<T> | null = null): OperatorFunction<T | null, T | null> {
    return catchError((err: unknown) => {
        console.error(err);
        alert('Ошибка');
        return data instanceof Observable ? data : of(data);
    });
}
