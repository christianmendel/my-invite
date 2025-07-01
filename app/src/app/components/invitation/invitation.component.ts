import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from "@angular/core";
import { AbstractControl, FormArray } from "@angular/forms";
import { EventTypeEnumDescription } from "src/app/enums/eventType.enum";

@Component({
    selector: "app-invitation",
    templateUrl: "./invitation.component.html",
    styleUrl: "./invitation.component.css"
})
export class InvitationComponent implements OnInit, OnDestroy {
    constructor(private cdr: ChangeDetectorRef) {}

    @Input() invitationForm: AbstractControl = {} as AbstractControl;
    @Input() isGiftVisible = false;
    @Input() isPreView = false;
    @Input() imageUrl = "";
    remainingTime = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    separatorKeysCodes: number[] = [ENTER, COMMA];
    eventDateTime: Date | null = null;
    countdownInterval: any;
    isOpen = false;

    ngOnInit(): void {
        this.invitationForm.valueChanges?.subscribe(() => {
            this.updateEventDateTime();
        });
    }

    toggleOpen() {
        this.isOpen = !this.isOpen;
    }

    get giftSuggestions(): FormArray {
        return this.invitationForm.get("giftSuggestion") as FormArray;
    }

    updateEventDateTime() {
        const eventDateControl = this.invitationForm.get("eventDate")?.value;
        const eventTime = this.invitationForm.get("eventTime")?.value;

        if (eventDateControl && eventTime) {
            let eventDate: Date;

            if (typeof eventDateControl === "string") {
                eventDate = new Date(eventDateControl);
            } else {
                eventDate = eventDateControl;
            }

            const [hours, minutes] = eventTime.split(":").map(Number);

            eventDate.setHours(hours, minutes, 0, 0);

            this.eventDateTime = eventDate;

            if (isNaN(this.eventDateTime.getTime())) {
                return;
            }

            this.startCountdown();
        }
    }

    startCountdown() {
        if (this.countdownInterval) {
            clearInterval(this.countdownInterval);
        }

        this.countdownInterval = setInterval(() => {
            if (this.eventDateTime) {
                const currentTime = new Date().getTime();
                const timeDiff = this.eventDateTime.getTime() - currentTime;

                if (timeDiff <= 0) {
                    this.remainingTime = { days: 0, hours: 0, minutes: 0, seconds: 0 };
                    clearInterval(this.countdownInterval);
                } else {
                    this.remainingTime.days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
                    this.remainingTime.hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                    this.remainingTime.minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
                    this.remainingTime.seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
                }

                this.cdr.detectChanges();
            }
        }, 1000);
    }

    public eventTypeDescription(type: number): string {
        return EventTypeEnumDescription.description(type);
    }

    public encodeUrl() {
        return encodeURIComponent(
            `Confirmo presença no ${this.eventTypeDescription(this.invitationForm.get("eventType")?.value)}: ` +
                this.invitationForm.get("title")?.value
        );
    }

    ngOnDestroy() {
        if (this.countdownInterval) {
            clearInterval(this.countdownInterval);
        }
    }
}
