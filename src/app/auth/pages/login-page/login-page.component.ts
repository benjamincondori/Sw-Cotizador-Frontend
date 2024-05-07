import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ValidatorsService } from 'src/app/shared/services/validators.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { CustomValidators } from 'src/app/shared/Validators/custom.validator';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  public loginForm!: FormGroup;
  public loading: boolean = false;
  
  constructor(
    private authService: AuthService,
    private validatorsService: ValidatorsService,
    private toastService: ToastService,
    private fb: FormBuilder,
    private router: Router,
  ) {}
  
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          CustomValidators.emailValid,
        ],
      ],
      password: [
        '',
        [
          Validators.required,
        ],
      ],
    });
  }
  
  login(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    
    this.loading = true;
    
    const email = this.loginForm.value.email.trim();
    const password = this.loginForm.value.password.trim();
    
    this.authService.login(email, password)
      .pipe(
        finalize(() => this.loading = false)
      )
      .subscribe({
        next: (user) => {
          this.authService.setCurrentUser(user);
          if (user.roles.includes('user')) {
            this.router.navigate(['/dashboard/home']);
          } else if (user.roles.includes('admin')) {
            // TODO: Redirigir a la página de administrador
          }
          this.toastService.toast('Usuario autenticado con éxito', 'success');
        },
        error: (errorMessage) => {
          this.toastService.toast(errorMessage, 'error');
        },
      });
  }
  
  isInvalidField(field: string): boolean | null {
    return this.validatorsService.isInvalidField(this.loginForm, field);
  }
  
  getMessageError(field: string): string | null {
    return this.validatorsService.getErrorMessage(this.loginForm, field);
  }
  
}
