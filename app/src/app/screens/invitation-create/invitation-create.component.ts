import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, OnInit } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { MatChipInputEvent } from "@angular/material/chips";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute } from "@angular/router";
import { EventTypeEnum } from "src/app/enums/eventType.enum";
import { InvitationDTO } from "src/app/models/invitation";
import { ServiceService } from "src/app/services/service.service";

@Component({
    selector: "app-invitation-create",
    templateUrl: "./invitation-create.component.html",
    styleUrls: ["./invitation-create.component.css"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class InvitationCreateComponent implements OnInit {
    constructor(
        private fb: FormBuilder,
        private service: ServiceService,
        private snackBar: MatSnackBar,
        private cdr: ChangeDetectorRef,
        private activatedRoute: ActivatedRoute,
        private destroyRef: DestroyRef
    ) {
        this.invitationForm = this.newInvitationForm();
    }

    separatorKeysCodes: number[] = [ENTER, COMMA];
    isMapVisible = false;
    isAgendaVisible = false;
    isGiftVisible = false;
    giftInputControl = new FormControl("");
    eventTypeEnum = EventTypeEnum;
    invitationForm: FormGroup = {} as FormGroup;
    files: File[] = [] as File[];
    imageUrl: string = "";
    isPro = false;
    params = <{ isPro: boolean }>{};

    ngOnInit(): void {
        this.params = {
            ...this.activatedRoute.snapshot.data,
            ...this.activatedRoute.snapshot.params,
            ...history.state
        };

        this.isPro = this.params.isPro;
    }

    get giftSuggestions(): FormArray {
        return this.invitationForm.get("giftSuggestion") as FormArray;
    }

    newInvitationForm(): FormGroup {
        return this.fb.group({
            email: ["", Validators.required],
            title: ["", Validators.required],
            description: [""],
            eventType: ["", Validators.required],
            eventDate: ["", Validators.required],
            eventTime: ["", Validators.required],
            location: this.fb.group({
                address: ["", Validators.required],
                latitude: [null],
                longitude: [null]
            }),
            isTimerVisible: [true, Validators.required],
            confirmByWhatsApp: [true, Validators.required],
            whatsAppNumber: ["", [Validators.required, Validators.pattern(/^\d{10,15}$/)]],
            giftSuggestion: this.fb.array([]),
            inviteBorderColor: ["#ffffff", Validators.required],
            inviteFontColor: ["#000000"],
            inviteBackground: ["#ffffff", Validators.required],
            envelopeBackground: ["#c4dff0", Validators.required],
            envelopeBackgroundLeft: ["#a4d4f2", Validators.required],
            envelopeInternalAndTopBackground: ["#3760c9", Validators.required]
        });
    }

    validDateFilter(date: Date | null): boolean {
        return !!date;
    }

    addGift(event: MatChipInputEvent): void {
        const input = event.input;
        const value = event.value.trim();

        if (value) {
            this.giftSuggestions.push(this.fb.control(value));
        }
        if (input) {
            input.value = "";
        }
    }

    removeGift(index: number): void {
        this.giftSuggestions.removeAt(index);
    }

    onEventTypeChange(): void {
        const eventType = this.invitationForm.get("eventType")?.value;

        if (!eventType) return;

        this.isMapVisible = parseInt(eventType) === this.eventTypeEnum.WEDDING;
        this.isAgendaVisible = parseInt(eventType) === this.eventTypeEnum.MEETING;
        this.isGiftVisible = [
            this.eventTypeEnum.ANNIVERSARY,
            this.eventTypeEnum.WEDDING,
            this.eventTypeEnum.PARTY
        ].includes(parseInt(eventType));
    }

    onChageFile() {
        if (this.files?.length) {
            const reader = new FileReader();
            reader.onload = (e: any) => {
                this.imageUrl = e.target.result as string;
                this.cdr.detectChanges();
            };
            reader.readAsDataURL(this.files[0]);
        }
    }

    onWhatsAppInput(event: any): void {
        const rawValue = event.target.value;
        const cleanedValue = rawValue.replace(/\D+/g, "");
        this.invitationForm.get("whatsAppNumber")?.setValue(cleanedValue.trim());
    }

    onSubmit(): void {
        if (!this.invitationForm.valid) {
            this.snackBar.open("Por favor, preencha todos os campos corretamente.", undefined, { duration: 10000 });
            return;
        }

        const invitation = InvitationDTO.mapperDto(this.invitationForm.value);

        this.service
            .createInvite(invitation, this.isPro)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((result) => {
                if (this.files?.length) {
                    this.service
                        .uploadFile(result._id, this.files[0])
                        .pipe(takeUntilDestroyed(this.destroyRef))
                        .subscribe(() => {
                            window.location.href = result.url;
                        });
                } else {
                    window.location.href = result.url;
                }
            });
    }
}
