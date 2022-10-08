import { Like } from '../like/like';
import { Match } from '../match/match';

export interface User {
  userId?: string;
  userEmail?: string;
  userName?: string;
  password?: string;
  avatar?: string;
  pictures?: Array<string>;
  cpf?: string;
  telefone?: string;
  userCreatedAt?: number;
  role?: number; // 1 = Usuário 2 = Org 3 = Admin
  orgId?: string;
  likesSended?: Array<Like>;
  disikesSended?: Array<Like>;
  likesReceived?: Array<Like>;
  dislikesReceived?: Array<Like>;
  Matchs?: Array<Match>;
}
