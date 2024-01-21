// note.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  private apiUrl = 'http://localhost:3000'; // À adapter selon votre configuration

  constructor(private readonly http: HttpClient) {}

  noterArticle(articleId: number,visiteurId: number, valeur: number): Observable<any> {
    const url = `${this.apiUrl}/note/${visiteurId}/${articleId}`; // 1 peut être l'ID du visiteur actuellement authentifié

    return this.http.post(url, { valeur });
  }
}
