import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  // Utilisation d'un BehaviorSubject pour stocker l'état d'admin
  private isAdminSubject = new BehaviorSubject<boolean>(false);

  // Observable pour que les composants puissent s'abonner aux changements
  isAdmin$ = this.isAdminSubject.asObservable();

  constructor() { }

  /**
   * Active le mode administrateur.
   * Met à jour l'état du BehaviorSubject pour indiquer que l'utilisateur est un administrateur.
   */
  enableAdminMode() {
    this.isAdminSubject.next(true);
  }

  /**
   * Désactive le mode administrateur.
   * Met à jour l'état du BehaviorSubject pour indiquer que l'utilisateur n'est pas un administrateur.
   */
  disableAdminMode() {
    this.isAdminSubject.next(false);
  }

  /**
   * Récupère l'état actuel du mode administrateur.
   * @returns {boolean} - Retourne true si le mode administrateur est activé, sinon false.
   */
  isAdmin(): boolean {
    return this.isAdminSubject.value;
  }
}
