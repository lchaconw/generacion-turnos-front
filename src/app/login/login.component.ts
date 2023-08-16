import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.username = "admin";
    this.password = "admin";
  }

  onSubmit(): void {
    if (this.username == '' || this.password == '') {
      this.errorMessage = 'Debe completar todos los campos.';
      return;
    }

    this.authService.postLogin(this.username, this.password).subscribe(
      (resp) => {
        if (resp.login) {
          this.authService.setIsLoggedIn(true);
          this.authService.setUserName(this.username);
          this.router.navigate(['/generar-turnos']);
        } else {
          this.errorMessage = 'Usuario o contraseña incorrecta.';
          this.authService.setIsLoggedIn(false);
          this.authService.setUserName('');
        }
      },
      (err) => {
        this.errorMessage = 'Usuario o contraseña incorrecta.';
        this.authService.setIsLoggedIn(false);
        this.authService.setUserName('');
      }
    );
  }
}
