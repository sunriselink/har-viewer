import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

export function catchAndLogError<T>(data: T = null) {
    return catchError((err: any) => {
        console.error(err);
        alert('Ошибка');
        return of<T>(data);
    });
}
