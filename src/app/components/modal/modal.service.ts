import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ModalService {
    public readonly text$: Observable<string>;
    public readonly state$: Observable<boolean>;

    private readonly text$$: BehaviorSubject<string> = new BehaviorSubject<string>('');
    private readonly state$$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor() {
        this.text$ = this.text$$.asObservable();
        this.state$ = this.state$$.asObservable();
    }

    public open(text: string): void {
        this.text$$.next(text);
        this.state$$.next(true);
    }

    public close(): void {
        this.state$$.next(false);
    }
}
