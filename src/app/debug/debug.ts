import { Observable, pipe, UnaryFunction } from "rxjs";
import { tap } from 'rxjs/operators';

export enum RxJsLoggingLevel {
    TRACE,
    DEBUG,
    INFO,
    ERROR
}

let rxjsLoggingLevel = RxJsLoggingLevel.INFO;

export function setRxJsLoggingLevel(level: RxJsLoggingLevel) {
    rxjsLoggingLevel = level;
}

export function debug(level: RxJsLoggingLevel, message: string): 
UnaryFunction<Observable<any>, Observable<any>> {
    return pipe(
        tap(val => {
            if( level >= rxjsLoggingLevel ) {
                console.log(message + ' : ', val);
            }
        })
    )
}