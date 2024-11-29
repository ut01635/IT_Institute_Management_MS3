import { AbstractControl, ValidationErrors, FormGroup } from '@angular/forms';

export class PasswordValidator {
  static match(password: string) {
    return (control: AbstractControl): ValidationErrors | null => {
      // Check if the parent is a FormGroup (which has the controls)
      const parent = control.parent as FormGroup;

      // Ensure parent exists and has the controls
      if (!parent || !parent.controls[password]) {
        return null;
      }

      const passwordControl = parent.controls[password];
      
      // Compare the password fields
      if (passwordControl.value !== control.value) {
        return { compare: true }; // Return error if they don't match
      }

      return null;
    };
  }
}

