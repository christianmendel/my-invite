import { ChangeDetectorRef, Component, DestroyRef } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { FormArray, FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ImageFile } from "src/app/models/imageFile";
import { ServiceService } from "src/app/services/service.service";

@Component({
    selector: "app-invitation-view",
    templateUrl: "./invitation-view.component.html",
    styleUrl: "./invitation-view.component.css"
})
export class InvitationViewComponent {
    constructor(
        private fb: FormBuilder,
        private activatedRoute: ActivatedRoute,
        private service: ServiceService,
        private cdr: ChangeDetectorRef,
        private router: Router,
        private destroyRef: DestroyRef
    ) {
        this.invitationForm = this.newInvitationForm();
    }

    isMapVisible = false;
    isAgendaVisible = false;
    isGiftVisible = false;
    invitationForm: FormGroup = {} as FormGroup;
    paramsId: string = "";
    image = {} as ImageFile;

    ngOnInit() {
        this.activatedRoute.paramMap.subscribe((params) => {
            this.paramsId = params.get("id") || "";
        });

        if (this.paramsId?.length) {
            this.find(this.paramsId);
        }
    }

    get giftSuggestions(): FormArray {
        return this.invitationForm.get("giftSuggestion") as FormArray;
    }

    newInvitationForm(): FormGroup {
        return this.fb.group({
            email: [""],
            title: [""],
            description: [""],
            eventType: [""],
            eventDate: [""],
            eventTime: [""],
            location: this.fb.group({
                address: [""],
                latitude: [null],
                longitude: [null]
            }),
            isTimerVisible: [true],
            confirmByWhatsApp: [true],
            whatsAppNumber: [""],
            giftSuggestion: this.fb.array([]),
            inviteBorderColor: ["#ffffff"],
            inviteFontColor: ["#000000"],
            inviteBackground: ["#ffffff"],
            envelopeBackground: ["#c4dff0"],
            envelopeBackgroundLeft: ["#a4d4f2"],
            envelopeInternalAndTopBackground: ["#3760c9"]
        });
    }

    find(id: string) {
        this.service
            .findInvite(id)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
                next: (result) => {
                    this.invitationForm.patchValue({
                        _id: result._id,
                        confirmByWhatsApp: result.confirmByWhatsApp,
                        createdAt: result.createdAt,
                        description: result.description,
                        design: result.design,
                        email: result.email,
                        eventDate: result.eventDate,
                        eventTime: result.eventTime,
                        eventType: result.eventType,
                        location: result.location,
                        isTimerVisible: result.isTimerVisible,
                        title: result.title,
                        updatedAt: result.updatedAt,
                        whatsAppNumber: result.whatsAppNumber,
                        inviteBorderColor: result.inviteBorderColor,
                        inviteFontColor: result.inviteFontColor,
                        inviteBackground: result.inviteBackground,
                        envelopeBackground: result.envelopeBackground,
                        envelopeBackgroundLeft: result.envelopeBackgroundLeft,
                        envelopeInternalAndTopBackground: result.envelopeInternalAndTopBackground
                    });

                    if (result?.image?.url) {
                        this.image = result.image;
                    }
                    result.giftSuggestion?.forEach((item) => this.giftSuggestions.push(this.fb.control(item)));
                    this.cdr.detectChanges();
                },
                error: (err) => {
                    this.router.navigate(["/"]);
                }
            });
    }
}
