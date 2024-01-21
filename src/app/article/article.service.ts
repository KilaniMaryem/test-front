import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateArticleModel } from './article.model';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
    private apiUrl = 'http://localhost:3000';

    constructor(private http: HttpClient) {}
  
    getArticles(): Observable<any[]> {
      return this.http.get<any[]>(`${this.apiUrl}/article`);
    }
    //--------------------------------------------------------------//
    addArticle(articleData: CreateArticleModel): Observable<any> {
      return this.http.post<any>(`${this.apiUrl}/article/add`, articleData);
    }
    //--------------------------------------------------------------//
    likeArticle(articleId: number): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/article/${articleId}/like`, {});
    }
    //--------------------------------------------------------------//
    commenterArticle(commentData: any): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/commentaire/${commentData.idArticle}/${commentData.idVisiteur}`, commentData);
      }
    //--------------------------------------------------------------//
    rateArticle(id:number){}

}
