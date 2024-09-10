import { Component, OnInit } from '@angular/core';
import { CardService } from '../services/card.service';
import { TagService } from '../services/tag.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


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
  columns: any[] = []; // Liste des colonnes
  selectedTag: number | null = null;
  userAnswers: { [key: number]: string } = {};
  newTagLabel: string = '';
  isModalOpen: boolean = false;

  isAddCardModalOpen: boolean = false; // Contrôle de l'affichage du modal d'ajout de carte
  newCardQuestion: string = ''; // Stocke la question de la nouvelle carte
  newCardAnswer: string = ''; // Stocke la réponse de la nouvelle carte
  currentColumnId: number | null = null; // Stocke l'ID de la colonne où la carte sera ajoutée
  newCardTagId: number | null = null; // Tag sélectionné pour la nouvelle carte



  constructor(
    private cardService: CardService,
    private tagService: TagService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadCards();
    this.loadTags();
    this.loadColumns(); // Charge les colonnes
  }

  loadCards() {
    this.cardService.getCards().subscribe((data: any[]) => {
      this.cards = data;
    });
  }

  loadTags() {
    this.tagService.getTags().subscribe((data: any[]) => {
      this.tags = data;
    });
  }

  loadColumns() {
    // Charger les colonnes à partir d'un service ou d'une source de données
    this.columns = [
      { id: 1, label: 'To Do', order: 1 },
      { id: 2, label: 'In Progress', order: 2 },
      { id: 3, label: 'Done', order: 3 }
    ];
  }

  filterByTag(tagId: number | null) {
    this.selectedTag = tagId;
    this.cardService.getCards().subscribe((data: any[]) => {
      this.cards = this.selectedTag !== null
        ? data.filter(card => card.tag === this.selectedTag)
        : data;
    });
  }

  toggleAnswer(card: any) {
    card.showAnswer = !card.showAnswer;
  }

  moveCardLeft(card: any) {
    const currentColumnIndex = card.column;
    const newColumnIndex = currentColumnIndex > 1 ? currentColumnIndex - 1 : this.columns.length;
    card.column = newColumnIndex;
    // Vous pouvez également mettre à jour la carte sur le serveur ici
  }

  moveCardRight(card: any) {
    const currentColumnIndex = card.column;
    const newColumnIndex = (currentColumnIndex % this.columns.length) + 1;
    card.column = newColumnIndex;
    // Vous pouvez également mettre à jour la carte sur le serveur ici
  }

  getCardsByColumn(columnId: number) {
    return this.cards.filter(card => card.column === columnId);
  }

  submitAnswer(card: any) {
    const userAnswer = this.userAnswers[card.id] || '';
    const isCorrect = userAnswer.trim().toLowerCase() === card.answer.trim().toLowerCase();
    alert(isCorrect ? 'Réponse correcte !' : 'Réponse incorrecte, essayez encore.');
  }
  // Méthode pour déconnecter l'utilisateur
  logout() {
    // Logique de déconnexion ici (ex: supprimer les tokens de session)
    // Redirige vers la page de connexion
    this.router.navigate(['/']);
  }

  openAddTagModal() {
    this.isModalOpen = true;
  }

  closeAddTagModal() {
    this.isModalOpen = false;
  }

  addTag() {
    if (this.newTagLabel.trim()) {
      this.tagService.addTag({ label: this.newTagLabel }).subscribe((newTag: any) => {
        this.tags.push(newTag);
        this.newTagLabel = '';
        this.closeAddTagModal();
      });
    }
  }

  openAddCardModal(columnId: number) {
    this.currentColumnId = columnId;
    this.isAddCardModalOpen = true; // Ouvre le modal
  }

  closeAddCardModal() {
    this.isAddCardModalOpen = false; // Ferme le modal
    this.newCardQuestion = ''; // Réinitialise la question de la carte
    this.newCardAnswer = ''; // Réinitialise la réponse de la carte
  }

  // Ajoute une nouvelle carte
  addCard() {
    if (this.newCardQuestion.trim() && this.newCardAnswer.trim() && this.newCardTagId !== null) {
      const newCard = {
        question: this.newCardQuestion,
        answer: this.newCardAnswer,
        column: this.currentColumnId,
        tag: this.newCardTagId // Associe le tag sélectionné à la nouvelle carte
      };
      console.log(newCard);
      this.cardService.addCard(newCard).subscribe((addedCard: any) => {
        this.cards.push(addedCard); // Ajoute la nouvelle carte à la liste
        this.newCardQuestion = ''; // Réinitialise le champ de question
        this.newCardAnswer = '';   // Réinitialise le champ de réponse
        this.newCardTagId = null;  // Réinitialise le champ de tag
        this.closeAddCardModal();  // Ferme le modal après l'ajout
      });
    }
  }
}
