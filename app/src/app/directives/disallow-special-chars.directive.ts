import { Directive, ElementRef, HostListener, inject, Input } from "@angular/core";

@Directive({
    selector: "[disallow-special-chars]"
})
export class DisallowSpecialCharsDirective {
    private readonly el = inject(ElementRef);

    private readonly regexCurrency = new RegExp(/^\bR\$ \b[\d,]*/g);
    private readonly regexNumbers = new RegExp(/^\d*/g);
    @Input() public inputType!: number;

    @HostListener("input", ["$event"])
    public change(event: Event) {
        const current = this.el.nativeElement.value;
        const testValue = current.match(this.regexCurrency) || current.match(this.regexNumbers);
        this.el.nativeElement.value = testValue;
        if (current !== this.el.nativeElement.value) {
            event.preventDefault();
        }
    }
}
