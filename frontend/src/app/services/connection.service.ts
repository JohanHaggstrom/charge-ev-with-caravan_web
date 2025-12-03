import { Injectable } from '@angular/core';
import { BehaviorSubject, fromEvent, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ConnectionService {
    private onlineSubject = new BehaviorSubject<boolean>(navigator.onLine);
    public online$: Observable<boolean> = this.onlineSubject.asObservable();

    constructor() {
        // Listen to online/offline events
        merge(
            fromEvent(window, 'online').pipe(map(() => true)),
            fromEvent(window, 'offline').pipe(map(() => false))
        ).subscribe(isOnline => {
            this.onlineSubject.next(isOnline);
        });
    }

    isOnline(): boolean {
        return this.onlineSubject.value;
    }
}
