import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from './Validators/noSpaceAllowed.validator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ANGULAR-REACTIVE-FORM';
  reactiveForm: FormGroup;

  ngOnInit(): void {
    this.reactiveForm = new FormGroup({
      firstname: new FormControl(null,[Validators.required, CustomValidators.noSpaceAllowed]),
      lastname: new FormControl(null,[Validators.required, CustomValidators.noSpaceAllowed]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      username: new FormControl(null, Validators.required, CustomValidators.checkUserName),
      dob: new FormControl(null, Validators.required),
      gender: new FormControl('male'),
      address: new FormGroup({
        street: new FormControl(null, Validators.required),
        country: new FormControl('Country'),
        city: new FormControl(null, Validators.required),
        region: new FormControl(null, Validators.required),
        postal: new FormControl(null, Validators.required)
      }),
      skills: new FormArray([
        new FormControl(null, Validators.required)
      ]),
      experience: new FormArray([
        new FormGroup({
          company: new FormControl(null, Validators.required),
          position: new FormControl('Position', Validators.required),
          totalExp: new FormControl(null, Validators.required),
          start: new FormControl(null, Validators.required),
          end: new FormControl(null, Validators.required)
        })
      ])
    });
  }

  OnFormSubmitted() {
    if (this.reactiveForm.invalid) {
      alert('Please fill in all required fields before submitting the form.');
      this.markFormGroupTouched(this.reactiveForm);
      return;
    }
    console.log(this.reactiveForm.value);
  }

  AddSkills() {
    (this.reactiveForm.get('skills') as FormArray).push(new FormControl(null, Validators.required));
  }

  DeleteSkill(index: number) {
    const controls = this.reactiveForm.get('skills') as FormArray;
    controls.removeAt(index);
  }

  AddExperience() {
    const experienceFormGroup = new FormGroup({
      company: new FormControl(null, Validators.required),
      position: new FormControl('Position', Validators.required),
      totalExp: new FormControl(null, Validators.required),
      start: new FormControl(null, Validators.required),
      end: new FormControl(null, Validators.required)
    });

    (this.reactiveForm.get('experience') as FormArray).push(experienceFormGroup);
  }

  DeleteExperience(index: number) {
    const experienceFormGroup = this.reactiveForm.get('experience') as FormArray;
    experienceFormGroup.removeAt(index);
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      if (control instanceof FormControl) {
        control.markAsTouched();
      } else if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      } else if (control instanceof FormArray) {
        control.controls.forEach((ctrl: FormGroup) => this.markFormGroupTouched(ctrl));
      }
    });
  }
}
