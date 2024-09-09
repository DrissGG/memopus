
import { Component, OnInit } from '@angular/core';
import { CardService } from '../services/card.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TagService } from '../services/tag.service';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  cards: any[] = [];
  tags: any[] = [];
  selectedTag: number | null = null; // Permet à selectedTag d'être soit number soit null

  constructor(
    private cardService: CardService,
    private tagService: TagService
  ) { }

  ngOnInit() {
    this.loadCards();
    this.loadTags();
  }

  /**
   * Charge toutes les cartes.
   */
  loadCards() {
    this.cardService.getCards().subscribe(data => {
      this.cards = data;
    });
  }

  /**
   * Charge tous les tags.
   */
  loadTags() {
    this.tagService.getTags().subscribe(data => {
      this.tags = data;
    });
  }

  /**
   * Filtre les cartes par tag.
   * @param {number | null} tagId - L'ID du tag sélectionné ou null pour afficher toutes les cartes
   */
  filterByTag(tagId: number | null) {
    this.selectedTag = tagId;
    this.cardService.getCards().subscribe(data => {
      this.cards = this.selectedTag !== null
        ? data.filter(card => card.tag === this.selectedTag)
        : data;
    });
  }

  /**
   * Affiche ou cache la réponse d'une carte.
   * @param {any} card - La carte pour laquelle la réponse doit être affichée ou cachée.
   */
  toggleAnswer(card: any) {
    card.showAnswer = !card.showAnswer;
  }

  /**
   * Déplace une carte vers la prochaine colonne disponible.
   * @param {any} card - La carte à déplacer.
   */
  moveCard(card: any) {
    const currentColumnIndex = card.column;
    card.column = (currentColumnIndex % 3) + 1; // Simplement change la colonne (1 -> 2 -> 3 -> 1)
    // Vous pouvez faire appel à cardService ici pour mettre à jour la carte côté serveur
  }
}