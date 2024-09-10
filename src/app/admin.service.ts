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

  // Méthode pour activer le mode administrateur
  enableAdminMode() {
    this.isAdminSubject.next(true);
  }

  // Méthode pour désactiver le mode administrateur
  disableAdminMode() {
    this.isAdminSubject.next(false);
  }

  // Méthode pour récupérer l'état actuel du mode administrateur
  isAdmin(): boolean {
    return this.isAdminSubject.value;
  }
}
