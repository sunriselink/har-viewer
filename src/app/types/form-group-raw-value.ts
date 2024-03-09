import { AbstractControl, ɵFormGroupRawValue } from '@angular/forms';

export type FormGroupRawValue<T extends { [P in keyof T]: AbstractControl<unknown> }> = ɵFormGroupRawValue<T>;
