import { Component, OnInit, ElementRef } from '@angular/core';
import { LoginService } from './login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  returnUrl: string;
  error = '';


  constructor(private loginService: LoginService,
              private router: Router,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private toastr: ToastrService,
              private elementRef: ElementRef) { }

  

  ngOnInit() {

    this.loginForm = this.formBuilder.group({
      login: ['', Validators.required, Validators.email],
      password: ['', Validators.required]
    });

    this.loginService.logout();

  
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
        return;
    }

   
  this.loginService.login(this.f.login.value, this.f.password.value)
        .pipe(first())
        .subscribe(
            data => {
                this.router.navigate(['/admin']);
            },
            error => {
              this.error = "Senha ou Email inválidos";
                this.toastr.error('Falha na autenticação', 'Senha ou Email inválidos', {
                  timeOut: 3000
                });
            });
  }
}
