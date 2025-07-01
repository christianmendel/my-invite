import { AbstractControl, ValidationErrors } from "@angular/forms";

export function validPhone(control: AbstractControl): ValidationErrors | null {
    const phone = control.value?.replace(/\D/g, "");

    if (!phone?.length) {
        return null;
    }

    if (phone.length < 10 || phone.length > 20) {
        return { invalidPhone: true };
    }

    const phoneValido = /^[1-9]{2}[0-9]{8,13}$/.test(phone);
    return phoneValido ? null : { invalidPhone: true };
}
