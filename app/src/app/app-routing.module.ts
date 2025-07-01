import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./screens/home/home.component";
import { InvitationCreateComponent } from "./screens/invitation-create/invitation-create.component";
import { InvitationViewComponent } from "./screens/invitation-view/invitation-view.component";
import { TermsComponent } from "./screens/terms/terms.component";

const routes: Routes = [
    { path: "", component: HomeComponent },
    { path: "create", component: InvitationCreateComponent },
    { path: "view/:id", component: InvitationViewComponent },
    { path: "terms", component: TermsComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
