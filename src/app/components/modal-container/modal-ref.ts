import { Observable, ReplaySubject, take } from 'rxjs';

export class ModalRef<T = unknown> {
    public readonly data?: T;

    private readonly close$ = new ReplaySubject<void>(1);

    constructor(data?: T) {
        this.data = data;
    }

    public close(): void {
        this.close$.next();
    }

    public onClose(): Observable<void> {
        return this.close$.pipe(take(1));
    }
}
