import { FormControl, FormGroup, ɵFormGroupValue } from '@angular/forms';
import { Unsafe } from '../../types/unsafe';

type HarViewerFiltersControls = {
    successful: FormControl<boolean>;
    errors: FormControl<boolean>;
    url: FormControl<Unsafe<string>>;
};

export type HarViewerFiltersValue = ɵFormGroupValue<HarViewerFiltersControls>;

export class HarViewerFilters extends FormGroup<HarViewerFiltersControls> {
    constructor() {
        super({
            successful: new FormControl(true, { nonNullable: true }),
            errors: new FormControl(true, { nonNullable: true }),
            url: new FormControl(),
        });
    }
}
