// commentaire.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentaireService {
  private apiUrl = 'http://localhost:3000/commentaire';  

  constructor(private http: HttpClient) {}

  ajouterCommentaire(idArticle: number, idVisiteur: number, contenu: string): Observable<any> {
    const body = { idArticle, idVisiteur, contenu };
    return this.http.post(`${this.apiUrl}/${idArticle}/${idVisiteur}`, body);
  }

  getCommentairesByArticleId(idArticle: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${idArticle}`);
  }
}
