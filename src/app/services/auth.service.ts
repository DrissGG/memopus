
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = 'http://localhost:3000/users';
    private loggedIn = false;

    constructor(private http: HttpClient) { }

    /**
     * Authentifie l'utilisateur en fonction de son login et mot de passe.
     * @param {string} login - Le nom d'utilisateur
     * @param {string} pwd - Le mot de passe
     * @returns {Observable<boolean>} Retourne un Observable de type boolean.
     */
    login(login: string, pwd: string): Observable<boolean> {
        return this.http.get<any[]>(`${this.apiUrl}?login=${login}&pwd=${pwd}`).pipe(
            map(users => {
                if (users.length > 0) {
                    this.loggedIn = true;
                    return true;
                } else {
                    return false;
                }
            })
        );
    }

    /**
     * Vérifie si l'utilisateur est authentifié.
     * @returns {boolean} Retourne un boolean indiquant si l'utilisateur est connecté.
     */
    isLoggedIn(): boolean {
        return this.loggedIn;
    }
}
