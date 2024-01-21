import { Visiteur } from "../visiteur/visiteur.model";

export interface Commentaire {
    idCommentaire: number;
    contenu: string;
    auteurCommentaire:Visiteur;
  }
  