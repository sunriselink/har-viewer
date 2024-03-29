import { catchError, EMPTY, isObservable, Observable, of, OperatorFunction } from 'rxjs';

export function catchAndLogError<T>(data: T | Observable<T> = EMPTY): OperatorFunction<T | null, T | null> {
    return catchError((err: unknown) => {
        console.error(err);
        alert('Ошибка');
        return isObservable(data) ? data : of(data);
    });
}
