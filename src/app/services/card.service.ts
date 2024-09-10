
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CardService {
    private apiUrl = 'http://localhost:3000/cards';

    constructor(private http: HttpClient) { }

    /**
     * Récupère toutes les cartes depuis l'API.
     * @returns {Observable<any[]>} Retourne un Observable contenant la liste des cartes.
     */
    getCards(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl);
    }

    /**
     * Ajoute une nouvelle carte via l'API.
     * @param {any} card - Objet représentant la carte à ajouter.
     * @returns {Observable<any>} Retourne un Observable avec la réponse de l'API après ajout de la carte.
     */
    addCard(card: any): Observable<any> {
        return this.http.post<any>(this.apiUrl, card);
    }

    /**
     * Met à jour les informations d'une carte existante.
     * @param {number} cardId - ID de la carte à mettre à jour.
     * @param {any} cardData - Objet contenant les nouvelles données de la carte.
     * @returns {Observable<any>} Retourne un Observable avec la réponse de l'API après mise à jour.
     */
    updateCard(cardId: number, cardData: any): Observable<any> {
        return this.http.patch(`${this.apiUrl}/${cardId}`, cardData);
    }
}
