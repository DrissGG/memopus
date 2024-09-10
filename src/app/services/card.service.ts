// src/app/services/card.service.ts
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
     * Récupère toutes les cartes.
     * @returns {Observable<any[]>} Retourne un Observable contenant la liste des cartes.
     */
    getCards(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl);
    }

    // Nouvelle méthode pour ajouter une carte
    addCard(card: any): Observable<any> {
        return this.http.post<any>(this.apiUrl, card);
    }

    // Méthode pour mettre à jour une carte
    updateCard(cardId: number, cardData: any): Observable<any> {
        return this.http.patch(`${this.apiUrl}/${cardId}`, cardData);
    }
}
