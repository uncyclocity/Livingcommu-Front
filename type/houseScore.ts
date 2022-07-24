export interface IScores {
  noise: number;
  transit: number;
  commercial: number;
  interrior: number;
  clean: number;
}

export interface IEvaluation {
  userId: number;
  createdAt: Date | string;
  scores: IScores;
  title: string;
  message: string[];
}

export interface IHouseScore {
  id: number;
  evaluation: IEvaluation[];
}
