import { Component, OnInit } from '@angular/core';
import { ArticleService } from './article.service';
import { Commentaire } from '../commentaire/commentaire.model';
import { CommentaireService } from '../commentaire/commentaire.service';
import { NoteService } from '../note/note.service';



@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  articles: any[] = [];
  newArticle: any = { titre: '', contenu: '', auteurname: '' };
  newComment = { idArticle: 0, idVisiteur: 0, contenu: '' };
  commentFormArticleId: number | null = null;
  commentaires: Commentaire[] = [];
  ratingFormArticleId: number=0;
  ratingInputValue: number=0;

  constructor(private articleService: ArticleService,
    private commentaireService: CommentaireService,
    private readonly noteService: NoteService
    ) {}

  ngOnInit(): void {
    this.loadArticles();
  }
  //--------------------------------------------------------------------------------//
  loadArticles() {
    this.articleService.getArticles().subscribe(data => {
      this.articles = data;
    });
  }
  //--------------------------------------------------------------------------------//
  addArticle() {
    console.log('Données du nouvel article:', this.newArticle);
    this.articleService.addArticle(this.newArticle).subscribe(
      response => {
        console.log('Article ajouté avec succès:', response);
        this.newArticle = {}; // Réinitialisez le formulaire après l'ajout
        this.loadArticles(); // Rafraîchir la liste des articles après l'ajout
      }, 
      error => {
      console.error('Erreur lors de l\'ajout de l\'article:', error);
    });
  }
  //--------------------------------------------------------------------------------//
  likeArticle(articleId: number) {
    this.articleService.likeArticle(articleId).subscribe(() => {
      // Rafraîchissez la liste des articles après le like
      this.loadArticles();
    });
  }
  //--------------------------------------------------------------------------------//
  toggleCommentForm(articleId: number) {
    // Chargez les commentaires lors de l'ouverture du formulaire
    this.commentaireService.getCommentairesByArticleId(articleId)
      .subscribe(commentaires => {
        this.commentaires = commentaires;
        // Ouvrez le formulaire pour cet article
        this.commentFormArticleId = articleId;
      });
  }
  ajouterCommentaire(commentaire: string) {
    if (this.commentFormArticleId !== null) {
      // Envoyez le commentaire au backend
      this.articleService.commenterArticle({
        idArticle: this.commentFormArticleId,
        idVisiteur: 1, /* L'ID du visiteur, si nécessaire */
        contenu: commentaire
      }).subscribe(() => {
        // Rafraîchissez la liste des commentaires après l'ajout du commentaire
        this.commentaireService.getCommentairesByArticleId(this.commentFormArticleId!)
          .subscribe(commentaires => this.commentaires = commentaires);
      });
    }
  
    // Réinitialisez le nouveau commentaire après l'ajout
    this.newComment = { idArticle: 0, idVisiteur: 0, contenu: '' };
  
    // Réinitialisez commentFormArticleId
    //this.commentFormArticleId = 0;
  }
  

  toggleRatingForm(articleId: number) {
    this.ratingFormArticleId = articleId;
  }
  noterArticle(articleId: number, valeur: number) {
    // Utilisez le service de notation pour envoyer la notation au backend
    const idVisiteur=1;
    this.noteService.noterArticle(articleId,idVisiteur, valeur).subscribe(() => {
      // Rafraîchir l'article après l'ajout de la note
      this.loadArticles();
    });

    // Réinitialisez le formulaire de notation
    this.ratingFormArticleId = 0;
    this.ratingInputValue = 0;
  }
}


