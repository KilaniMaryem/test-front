import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-commentaire',
  templateUrl: './commentaire.component.html',
  styleUrls: ['./commentaire.component.css']
})
export class CommentaireComponent {
  @Input() article: any;
  @Output() commentaireAjoute = new EventEmitter<string>();

  newComment: string = '';

  ajouterCommentaire() {
    // Envoyer le commentaire au parent
    this.commentaireAjoute.emit(this.newComment);
    // Réinitialiser le champ de commentaire après l'ajout
    this.newComment = '';
  }
}

