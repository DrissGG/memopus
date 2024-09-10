import { Component, OnInit } from '@angular/core';
import { CardService } from '../services/card.service';
import { TagService } from '../services/tag.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';

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

  isAdmin = false; // Variable pour stocker l'état de l'admin localement

  constructor(
    private cardService: CardService,
    private tagService: TagService,
    private router: Router,
    private adminService: AdminService
  ) {
    // S'abonner aux changements de l'état admin
    this.adminService.isAdmin$.subscribe(isAdmin => {
      this.isAdmin = isAdmin;
    })
  }

  /** 
   * Bascule le mode administrateur
   * @returns {void}
   */
  toggleAdminMode() {
    if (this.isAdmin) {
      this.adminService.disableAdminMode();
    } else {
      this.adminService.enableAdminMode();
    }
  }

  // Variables pour le modal d'édition de tag
  isEditTagModalOpen = false;
  tagToEdit: any = null;
  editedTagLabel: string = '';

  // Variables pour le modal d'édition de carte
  isEditCardModalOpen = false;
  cardToEdit: any = null;
  editedCardQuestion: string = '';
  editedCardAnswer: string = '';
  editedCardTagId: number | null = null;

  /** 
   * Ouvre le modal d'édition de tag
   * @param {any} tag - Tag à éditer
   * @returns {void}
   */
  openEditTagModal(tag: any) {
    this.tagToEdit = tag;
    this.editedTagLabel = tag.label;
    this.isEditTagModalOpen = true;
  }

  /** 
   * Ferme le modal d'édition de tag
   * @returns {void}
   */
  closeEditTagModal() {
    this.isEditTagModalOpen = false;
    this.tagToEdit = null;
  }

  /** 
   * Enregistre les modifications du tag
   * @returns {void}
   */
  saveTagEdits() {
    if (this.tagToEdit) {
      this.tagService.updateTag(this.tagToEdit.id, { label: this.editedTagLabel }).subscribe(() => {
        this.tagToEdit.label = this.editedTagLabel;
        this.closeEditTagModal();
      });
    }
  }

  /** 
   * Ouvre le modal d'édition de carte
   * @param {any} card - Carte à éditer
   * @param {number} columnId - ID de la colonne
   * @returns {void}
   */
  openEditCardModal(card: any, columnId: number) {
    this.cardToEdit = card;
    this.currentColumnId = columnId;
    this.editedCardQuestion = card.question;
    this.editedCardAnswer = card.answer;
    this.editedCardTagId = card.tag;
    this.isEditCardModalOpen = true;
  }

  /** 
   * Ferme le modal d'édition de carte
   * @returns {void}
   */
  closeEditCardModal() {
    this.isEditCardModalOpen = false;
    this.cardToEdit = null;
  }

  /** 
   * Enregistre les modifications de la carte
   * @returns {void}
   */
  saveCardEdits() {
    if (this.cardToEdit) {
      const updatedCard = {
        question: this.editedCardQuestion,
        answer: this.editedCardAnswer,
        tag: this.editedCardTagId,
        column: this.currentColumnId
      };
      console.log(updatedCard)
      this.cardService.updateCard(this.cardToEdit.id, updatedCard).subscribe(() => {
        this.cardToEdit.question = this.editedCardQuestion;
        this.cardToEdit.answer = this.editedCardAnswer;
        this.cardToEdit.tag = this.editedCardTagId;
        this.cardToEdit.column = this.currentColumnId;
        this.closeEditCardModal();
      });
    }
  }

  /** 
   * Initialisation du composant
   * @returns {void}
   */
  ngOnInit() {
    this.loadCards();
    this.loadTags();
    this.loadColumns(); // Charge les colonnes
  }

  /** 
   * Charge les cartes depuis le service
   * @returns {void}
   */
  loadCards() {
    this.cardService.getCards().subscribe((data: any[]) => {
      this.cards = data;
    });
  }

  /** 
   * Charge les tags depuis le service
   * @returns {void}
   */
  loadTags() {
    this.tagService.getTags().subscribe((data: any[]) => {
      this.tags = data;
    });
  }

  /** 
   * Charge les colonnes (statique pour l'instant)
   * @returns {void}
   */
  loadColumns() {
    // Charger les colonnes à partir d'un service ou d'une source de données
    this.columns = [
      { id: 1, label: 'To Do', order: 1 },
      { id: 2, label: 'In Progress', order: 2 },
      { id: 3, label: 'Done', order: 3 }
    ];
  }

  /** 
   * Filtre les cartes en fonction du tag sélectionné
   * @param {number | null} tagId - ID du tag sélectionné ou null pour afficher toutes les cartes
   * @returns {void}
   */
  filterByTag(tagId: number | null) {
    this.selectedTag = tagId;
    this.cardService.getCards().subscribe((data: any[]) => {
      this.cards = this.selectedTag !== null
        ? data.filter(card => card.tag === this.selectedTag)
        : data;
    });
  }

  /** 
   * Bascule l'affichage de la réponse de la carte
   * @param {any} card - Carte dont l'affichage de la réponse doit être basculé
   * @returns {void}
   */
  toggleAnswer(card: any) {
    card.showAnswer = !card.showAnswer;
  }

  /** 
   * Déplace la carte vers la colonne de gauche
   * @param {any} card - Carte à déplacer
   * @returns {void}
   */
  moveCardLeft(card: any) {
    const currentColumnIndex = card.column;
    const newColumnIndex = currentColumnIndex > 1 ? currentColumnIndex - 1 : this.columns.length;
    card.column = newColumnIndex;
    this.updateCardColumn(card);
  }

  /** 
   * Déplace la carte vers la colonne de droite
   * @param {any} card - Carte à déplacer
   * @returns {void}
   */
  moveCardRight(card: any) {
    const currentColumnIndex = card.column;
    const newColumnIndex = (currentColumnIndex % this.columns.length) + 1;
    card.column = newColumnIndex;
    this.updateCardColumn(card);
  }

  /** 
   * Met à jour la colonne d'une carte
   * @param {any} card - Carte à mettre à jour
   * @returns {void}
   */
  updateCardColumn(card: any) {
    this.cardService.updateCard(card.id, { column: card.column }).subscribe(() => {
    });
  }

  /** 
   * Récupère les cartes pour une colonne donnée
   * @param {number} columnId - ID de la colonne
   * @returns {any[]} Liste des cartes pour la colonne
   */
  getCardsByColumn(columnId: number) {
    return this.cards.filter(card => card.column === columnId);
  }

  /** 
   * Soumet la réponse de l'utilisateur pour une carte
   * @param {any} card - Carte pour laquelle la réponse est soumise
   * @returns {void}
   */
  submitAnswer(card: any) {
    const userAnswer = this.userAnswers[card.id] || '';
    const isCorrect = userAnswer.trim().toLowerCase() === card.answer.trim().toLowerCase();
    alert(isCorrect ? 'Réponse correcte !' : 'Réponse incorrecte, essayez encore.');
  }

  /** 
   * Déconnecte l'utilisateur et le redirige vers la page de connexion
   * @returns {void}
   */
  logout() {
    // Logique de déconnexion ici (ex: supprimer les tokens de session)
    // Redirige vers la page de connexion
    this.router.navigate(['/']);
  }

  /** 
   * Ouvre le modal d'ajout de tag
   * @returns {void}
   */
  openAddTagModal() {
    this.isModalOpen = true;
  }

  /** 
   * Ferme le modal d'ajout de tag
   * @returns {void}
   */
  closeAddTagModal() {
    this.isModalOpen = false;
  }

  /** 
   * Ajoute un nouveau tag
   * @returns {void}
   */
  addTag() {
    if (this.newTagLabel.trim()) {
      this.tagService.addTag({ label: this.newTagLabel }).subscribe((newTag: any) => {
        this.tags.push(newTag);
        this.newTagLabel = '';
        this.closeAddTagModal();
      });
    }
  }

  /** 
   * Ouvre le modal d'ajout de carte
   * @param {number} columnId - ID de la colonne où la carte sera ajoutée
   * @returns {void}
   */
  openAddCardModal(columnId: number) {
    this.currentColumnId = columnId;
    this.isAddCardModalOpen = true; // Ouvre le modal
  }

  /** 
   * Ferme le modal d'ajout de carte
   * @returns {void}
   */
  closeAddCardModal() {
    this.isAddCardModalOpen = false; // Ferme le modal
    this.newCardQuestion = ''; // Réinitialise la question de la carte
    this.newCardAnswer = ''; // Réinitialise la réponse de la carte
  }

  /** 
   * Ajoute une nouvelle carte
   * @returns {void}
   */
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
