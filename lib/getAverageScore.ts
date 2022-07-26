import React from "react";
import { IHouseScore } from "../type/houseScore";

export interface IReviewScore {
  noise: number;
  transit: number;
  commercial: number;
  interrior: number;
  clean: number;
}

export type TReviewScore =
  | "noise"
  | "transit"
  | "commercial"
  | "interrior"
  | "clean";

export const keysKorean = ["정숙도", "교통", "상권", "인테리어", "청결도"];

export const keys: TReviewScore[] = [
  "noise",
  "transit",
  "commercial",
  "interrior",
  "clean",
];

export const getUnitAverageScore = (reviewData: IHouseScore) => {
  let avgs = [0, 0, 0, 0, 0];
  reviewData?.evaluation.map(({ scores }: { scores: any }) => {
    keys.map((key: string, index: number) => (avgs[index] += scores[key]));
  });
  avgs = avgs.map((sum) => sum / reviewData?.evaluation.length);
  return avgs;
};

export const getAverageScore = (reviewData: IHouseScore) =>
  reviewData?.evaluation
    .map(
      ({ scores }: any) =>
        Object.keys(scores)
          .map((key) => scores[key])
          .reduce((sum: number, current: number) => sum + current) / 5
    )
    .reduce((sum: number, current: number) => sum + current) /
  reviewData?.evaluation.length;

export const getAverageStar = (
  averageScore: number,
  fill: React.ReactElement,
  half: React.ReactElement,
  empty: React.ReactElement
) =>
  ["", "", "", "", ""].map((val, index) => {
    if (index + 1 <= averageScore) {
      return fill;
    } else if (index + 0.5 < averageScore) {
      return half;
    } else {
      return empty;
    }
  });

export const getAverageStarClickable = (
  averageScore: number,
  index: number,
  fill: (index: number, score: number) => React.ReactElement,
  empty: (index: number, score: number) => React.ReactElement
) =>
  [1, 2, 3, 4, 5].map((score) => {
    if (score <= averageScore) {
      return fill(index, score);
    } else {
      return empty(index, score);
    }
  });
