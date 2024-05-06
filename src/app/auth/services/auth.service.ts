import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginResponse } from '../interfaces/login-response.interface';
import { UserCurrent, UserRegister } from '../interfaces/user.interface';
import { RegisterResponse } from '../interfaces/register-response.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) {}

  // Inicio de sesión
  // login(email: string, password: string): Observable<boolean> {
  //   const url = `${this.baseUrl}/auth/login`;
  //   const body = { email, password };

  //   return this.http.post<LoginResponse>(url, body).pipe(
  //     // map(({ token }) => this.setAuthentication(token)),
  //     catchError((err) => {
  //       let errorMessage = err.error.message;
  //       if (err.status === 0) {
  //         errorMessage = 'No se pudo establecer conexión con el servidor. Por favor, inténtelo de nuevo.';
  //       } else if (errorMessage.includes('email')) {
  //         errorMessage = 'El email no está registrado. Por favor, regístrese.';
  //       } else if (errorMessage.includes('password')) {
  //         errorMessage = 'Contraseña incorrecta. Por favor, inténtelo de nuevo.';
  //       } else {
  //         errorMessage = 'Ocurrió un error. Por favor, inténtelo de nuevo más tarde.';
  //       }
  //       return throwError(() => errorMessage);
  //     })
  //   );
  // }

  // Registra un nuevo usuario
  register(user: UserRegister): Observable<RegisterResponse> {
    const url = `${this.baseUrl}/auth/register`;

    return this.http.post<RegisterResponse>(url, user).pipe(
      catchError((err) => {
        let errorMessage = err.error.message;
        if (err.status === 0) {
          errorMessage = 'No se pudo establecer conexión con el servidor. Por favor, inténtelo de nuevo.';
        } else if (errorMessage.includes('already exists')) {
          errorMessage = 'El email ya está registrado. Por favor, ingrese otro email.';
        } else {
          errorMessage = 'Ocurrió un error. Por favor, inténtelo de nuevo más tarde.';
        }
        return throwError(() => errorMessage);
      })
    );
  }

  // Obtener el usuario actual
  getUser(): Observable<UserCurrent> {
    const url = `${this.baseUrl}/auth/user`;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<UserCurrent>(url, { headers }).pipe(
      // tap((user) => this._currentUser.set(user)),
      catchError((err) => {
        return throwError(() => err);
      })
    );
  }
}
