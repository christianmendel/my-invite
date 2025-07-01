import { Component } from "@angular/core";
import { LoadingService } from "./services/loading.service";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html"
})
export class AppComponent {
    constructor(private loadingService: LoadingService) {}

    loading$ = this.loadingService.loading$;
}
