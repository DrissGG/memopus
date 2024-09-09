// src/app/services/tag.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TagService {
    private apiUrl = 'http://localhost:3000/tags';

    constructor(private http: HttpClient) { }

    /**
     * Récupère tous les tags.
     * @returns {Observable<any[]>} Retourne un Observable contenant la liste des tags.
     */
    getTags(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl);
    }
}
