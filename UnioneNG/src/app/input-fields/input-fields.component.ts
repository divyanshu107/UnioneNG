import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Gender} from '../app-models';

@Component({
  selector: 'app-input-fields',
  standalone: false,
  templateUrl: './input-fields.component.html',
  styleUrl: './input-fields.component.css'
})

export class InputFieldsComponent {
  name: string = "";
  email: string = "";
  gender: Gender|undefined;
  age: Number|undefined;
  password: string = "";

  allGenders = Gender;
  @ViewChild('errorbox') errorBox!: ElementRef<HTMLDivElement>;


  validate(): Array<string>
  {
    let errors: Array<string> = [];
    const emailRegex = RegExp("[A-Za-z0-9\._%+\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z]{2,}");
    if (this.name.length < 2)
      errors.push("Name must have more than 2 characters.");
    if (! emailRegex.test(this.email))
      errors.push("Invalid email.");
    if(this.gender == null)
      errors.push("Gender is required");
    if( this.age == null || this.age.valueOf() < 16)
      errors.push("Age must be greater than 16.");
    if(this.password.length < 8)
      errors.push("Password must have atleast 8 characters.");
    return errors;
  }

  submitForm(event: Event) {
    console.log(this);
    debugger;
    const errors = this.validate();
    if (errors.length > 0) {
      this.errorBox.nativeElement.innerHTML = "";
      this.errorBox.nativeElement.hidden = false;
      errors.forEach(error => this.errorBox.nativeElement.innerHTML += error + "<br>");
      return;
    }
    this.errorBox.nativeElement.hidden = true;
    let res = fetch("https://localhost:7081/api/user",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({Name: this.name,Email: this.email,Password: this.password}),
      }
    ).then(value => {
      console.log(value);
      debugger
    });
  }
}
