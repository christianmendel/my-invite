import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { Store } from "@ngxs/store";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private router: Router, private store: Store, private snackBar: MatSnackBar) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
        const urlPrecisaAutenticar = request.url.includes("/api");

        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                this.throwMessageError(error);
                return throwError(error);
            })
        );
    }

    throwMessageError(error: HttpErrorResponse) {
        switch (error.status) {
            case 500:
                this.snackBar.open(error.error.message, undefined, { duration: 10000 });
                break;

            case 200:
                break;

            case 400:
                this.snackBar.open(error.error.message, undefined, { duration: 10000 });
                break;

            case 404:
                if (error.error.message) {
                    error.error.message.forEach((item: any) => {
                        this.snackBar.open(item, undefined, { duration: 10000 });
                    });
                } else {
                    this.snackBar.open("Não encotrado", undefined, { duration: 10000 });
                }
                break;

            default:
                this.snackBar.open("Erro interno", undefined, { duration: 10000 });
                break;
        }
    }
}
