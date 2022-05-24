import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  @Input() userId!: number

  form!: FormGroup
  processing: boolean = false
  errorMessage: string = ''
  currentYear: number = 0
  currentDay: number = 1
  currentMonth: number = 1
  date: NgbDateStruct = { year: 0, month: 0, day: 0 }
  user: User = {
    firstname: '',
    lastname: '',
    email: '',
    birthDate: '',
    address: {
      street: '',
      city: '',
      country: '',
      postalcode: ''
    }
  }

  @ViewChild('successSwal')
  public readonly successSwal!: SwalComponent;

  @ViewChild('erroSwal')
  public readonly erroSwal!: SwalComponent;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    const date = new Date;
    this.currentDay = date.getDate()
    this.currentMonth = date.getMonth() + 1
    this.currentYear = date.getFullYear()
    this.setForm()
    if( this.userId !== undefined ){
      this.editUser()
    }
  }

  setForm(){
    console.log(this.date)
    this.form = this.formBuilder.group({
      firstname: this.formBuilder.control(this.user.firstname, [
        Validators.required,
        Validators.pattern('^[A-Za-zñÑáéíóúÁÉÍÓÚ]+$')
      ]),
      lastname: this.formBuilder.control(this.user.lastname, [
        Validators.required,
        Validators.pattern('^[A-Za-zñÑáéíóúÁÉÍÓÚ]+$')
      ]),
      email: this.formBuilder.control(this.user.email, [
        Validators.required,
        Validators.email
      ]),
      birthDate: this.formBuilder.control(this.date, [
        Validators.required
      ]),
      street: this.formBuilder.control(this.user.address.street, [
        Validators.required,
        Validators.pattern('^[A-Za-zñÑáéíóúÁÉÍÓÚ0-9 ]+$')
      ]),
      city: this.formBuilder.control(this.user.address.city, [
        Validators.required,
        Validators.pattern('^[A-Za-zñÑáéíóúÁÉÍÓÚ0 ]+$')
      ]),
      country: this.formBuilder.control(this.user.address.country, [
        Validators.required,
      ]),
      postalcode: this.formBuilder.control(this.user.address.postalcode, [
        Validators.required,
        Validators.pattern('^[0-9]+$')
      ])
    }, {
      updateOn: 'submit'
    })
  }

  onSubmit(){
    if( this.form.status === 'INVALID' ) return

    let {day, month, year} = this.form.value.birthDate
    day = String(day).padStart(2, '0')
    month = String(month).padStart(2, '0')
    const birthDate = `${year}-${month}-${day}`

    this.user.firstname = this.form.value.firstname
    this.user.lastname = this.form.value.lastname
    this.user.email = this.form.value.email
    this.user.birthDate = birthDate
    this.user.address.street = this.form.value.street
    this.user.address.city = this.form.value.city
    this.user.address.country = this.form.value.country
    this.user.address.postalcode = this.form.value.postalcode

    this.processing = true

    let process;
    if( this.userId === undefined ){
      process = this.userService.saveUser(this.user)
    }else{
      process = this.userService.updateUser(this.userId, this.user)
    }

    process.subscribe(
      next=> {
        this.successSwal.fire()
      },
      error => {
        const serverError = error.error
        if( serverError !== undefined ){
          this.errorMessage = typeof serverError === 'string' ? serverError : serverError.errors.join("\n")
        }
        setTimeout(()=>{
          this.processing = false
          this.erroSwal.fire()
        }, 100)
      },
    )
  }

  goToUsers(){
    this.router.navigate(['/users']);
  }

  editUser(){
    this.userService.editUser(this.userId).subscribe(
      (next: any) => {
        delete next.id
        delete next.address.id
        this.user = <User>next
        const birthDateConfig = this.user.birthDate
        const birthDateConfigSplit = birthDateConfig.split('-')
        this.date = {
          year: parseInt(birthDateConfigSplit[0]),
          month: parseInt(birthDateConfigSplit[1]),
          day: parseInt(birthDateConfigSplit[2]),
        }
        this.setForm()
      }
    )
  }

}
