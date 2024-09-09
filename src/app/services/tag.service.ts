import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TagService {
    private apiUrl = 'http://localhost:3000/tags'; // URL de l'API

    constructor(private http: HttpClient) { }

    /**
     * Récupère la liste de tous les tags.
     * @returns {Observable<any[]>} - Observable des tags
     */
    getTags(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl);
    }

    /**
     * Ajoute un nouveau tag.
     * @param {any} tag - Les informations du tag à ajouter.
     * @returns {Observable<any>} - Observable du tag ajouté
     */
    addTag(tag: any): Observable<any> {
        return this.http.post<any>(this.apiUrl, tag);
    }
}
