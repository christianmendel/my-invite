import { CdkDrag, CdkDropList } from "@angular/cdk/drag-drop";
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatBadgeModule } from "@angular/material/badge";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatChipsModule } from "@angular/material/chips";
import { MAT_DATE_LOCALE, MatNativeDateModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDialogModule } from "@angular/material/dialog";
import { MatAccordion, MatExpansionModule } from "@angular/material/expansion";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatMenuModule } from "@angular/material/menu";
import { MatPaginatorIntl, MatPaginatorModule } from "@angular/material/paginator";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatTableModule } from "@angular/material/table";
import { MatTabsModule } from "@angular/material/tabs";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatTreeModule } from "@angular/material/tree";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { NgxsModule } from "@ngxs/store";
import { NgxMaskDirective, provideEnvironmentNgxMask } from "ngx-mask";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AuthInterceptor } from "./common/interceptors/http.interceptor";
import { LoadingInterceptor } from "./common/interceptors/loading.interceptor";
import { EmptyValuePipe } from "./common/pipes/empty-value.pipe";
import { FileUploadComponent } from "./components/file-upload/file-upload.component";
import { FooterComponent } from "./components/footer/footer.component";
import { HeaderComponent } from "./components/header/header.component";
import { InvitationComponent } from "./components/invitation/invitation.component";
import { SectionComponent } from "./components/section/section.component";
import { DisallowSpecialCharsDirective } from "./directives/disallow-special-chars.directive";
import { HomeComponent } from "./screens/home/home.component";
import { InvitationCreateComponent } from "./screens/invitation-create/invitation-create.component";
import { InvitationViewComponent } from "./screens/invitation-view/invitation-view.component";
import { TermsComponent } from "./screens/terms/terms.component";
import { ServiceService } from "./services/service.service";
import { CustomPaginator } from "./utils/material";
@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        InvitationCreateComponent,
        FooterComponent,
        SectionComponent,
        DisallowSpecialCharsDirective,
        HomeComponent,
        InvitationComponent,
        InvitationViewComponent,
        EmptyValuePipe,
        FileUploadComponent,
        TermsComponent
    ],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatButtonModule,
        MatSnackBarModule,
        MatSelectModule,
        MatDialogModule,
        MatProgressSpinnerModule,
        MatMenuModule,
        MatCheckboxModule,
        CdkDropList,
        CdkDrag,
        MatCardModule,
        MatListModule,
        FormsModule,
        ReactiveFormsModule,
        MatPaginatorModule,
        MatRadioModule,
        MatTableModule,
        MatTabsModule,
        MatBadgeModule,
        MatSlideToggleModule,
        MatTreeModule,
        MatAccordion,
        MatExpansionModule,
        MatToolbarModule,
        MatChipsModule,
        MatAutocompleteModule,
        MatDatepickerModule,
        MatNativeDateModule,
        NgxMaskDirective,
        NgxsModule.forRoot([])
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        },
        { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
        { provide: MatPaginatorIntl, useClass: CustomPaginator },
        provideAnimationsAsync(),
        provideHttpClient(withInterceptorsFromDi()),
        { provide: MAT_DATE_LOCALE, useValue: "pt-BR" },
        ServiceService,
        provideEnvironmentNgxMask()
    ]
})
export class AppModule {}
