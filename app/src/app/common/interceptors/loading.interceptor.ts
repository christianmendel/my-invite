import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, finalize } from "rxjs";
import { LoadingService } from "src/app/services/loading.service";

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
    constructor(private loadingService: LoadingService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.loadingService.show();
        return next.handle(req).pipe(finalize(() => this.loadingService.hide()));
    }
}
