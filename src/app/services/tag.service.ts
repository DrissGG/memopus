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
     * Récupère la liste de tous les tags depuis l'API.
     * @returns {Observable<any[]>} - Observable contenant la liste des tags.
     */
    getTags(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl);
    }

    /**
     * Ajoute un nouveau tag via l'API.
     * @param {any} tag - Les informations du tag à ajouter.
     * @returns {Observable<any>} - Observable contenant la réponse de l'API après ajout du tag.
     */
    addTag(tag: any): Observable<any> {
        return this.http.post<any>(this.apiUrl, tag);
    }

    /**
     * Supprime un tag en fonction de son ID.
     * @param {number} tagId - ID du tag à supprimer.
     * @returns {Observable<void>} - Observable indiquant la réussite de la suppression.
     */
    deleteTag(tagId: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${tagId}`);
    }

    /**
     * Met à jour les informations d'un tag existant.
     * @param {number} tagId - ID du tag à mettre à jour.
     * @param {any} tag - Objet contenant les nouvelles informations du tag.
     * @returns {Observable<any>} - Observable contenant la réponse de l'API après mise à jour du tag.
     */
    updateTag(tagId: number, tag: any): Observable<any> {
        return this.http.put(`${this.apiUrl}/${tagId}`, tag);
    }
}
