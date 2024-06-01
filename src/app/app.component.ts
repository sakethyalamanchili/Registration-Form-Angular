import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from './Validators/noSpaceAllowed.validator';
import { log } from 'node:console';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ANGULAR-REACTIVE-FORM';
  reactiveForm: FormGroup;
  formStatus: string | string[] | Set<string> | { [klass: string]: any; };
  formdata: any = {};

  ngOnInit(): void {
    this.reactiveForm = new FormGroup({
      firstname: new FormControl(null, [Validators.required, CustomValidators.noSpaceAllowed]),
      lastname: new FormControl(null, [Validators.required, CustomValidators.noSpaceAllowed]),
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

    // this.reactiveForm.get('firstname').valueChanges.subscribe((value) => {
    //   console.log(value);
    // })

    // this.reactiveForm.valueChanges.subscribe((data) => {
    //   console.log(data); 
    // })

    // this.reactiveForm.get('username').statusChanges.subscribe((status) => {
    //   console.log(status);
    // })

    this.reactiveForm.statusChanges.subscribe((status) => {
      console.log(status)
      this.formStatus = status;
    });
  }

  OnFormSubmitted() {
    if (this.reactiveForm.valid) {
      alert('Form Submitted Successfully!');
    }
    else if (this.reactiveForm.invalid) {
      alert('Please fill in all required fields before submitting the form.');
      this.markFormGroupTouched(this.reactiveForm);
      return;
    }
    console.log(this.reactiveForm.value);
    this.formdata = this.reactiveForm.value;
    this.reactiveForm.reset({
      firstname: null,
      lastname: null,
      email: null,
      username: null,
      dob: null,
      gender: 'male',
      address: {
        street: null,
        country: 'Country',
        city: null,
        region: null,
        postal: null
      },
      skills: [null],
      experience: [{
        company: '',
        position: 'Position',
        totalExp: '',
        start: '',
        end: ''
      }]
    });
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

  GenerateUsername() {
    let username = '';
    const fName: string = this.reactiveForm.get('firstname').value;
    const lName: string = this.reactiveForm.get('lastname').value;
    const dob: string = this.reactiveForm.get('dob').value;

    if (fName.length >= 3) {
      username += fName.slice(0, 3);
    }
    else {
      username += fName;
    }

    if (lName.length >= 3) {
      username += lName.slice(0, 3);
    }
    else {
      username += lName;
    }

    let datetime = new Date(dob);
    username += datetime.getFullYear();

    username = username.toLowerCase();

    console.log(username);

    // this.reactiveForm.setValue({
    //   firstname: this.reactiveForm.get('firstname').value,
    //   lastname: this.reactiveForm.get('lastname').value,
    //   email: this.reactiveForm.get('email').value,
    //   username: username,
    //   dob: this.reactiveForm.get('dob').value,
    //   gender: this.reactiveForm.get('gender').value,
    //   address: {
    //     street: this.reactiveForm.get('address.street').value,
    //     country: this.reactiveForm.get('address.country').value,
    //     city: this.reactiveForm.get('address.city').value,
    //     region: this.reactiveForm.get('address.region').value,
    //     postal: this.reactiveForm.get('address.postal').value
    //   },
    //   skills: this.reactiveForm.get('skills').value,
    //   experience: this.reactiveForm.get('experience').value
    // })

    //this.reactiveForm.get('username').setValue(username);

    this.reactiveForm.patchValue({
      username: username,
      // address: {
      //   city: 'New Delhi'
      // }
    })
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
