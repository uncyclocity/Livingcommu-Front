import { IHouseScore } from "../type/houseScore";

export const keysKorean = ["정숙도", "교통", "상권", "인테리어", "청결도"];

export const keys = ["noise", "transit", "commercial", "interrior", "clean"];

export const getUnitAverageScore = (reviewData: IHouseScore) => {
  let avgs = [0, 0, 0, 0, 0];
  reviewData?.evaluation.map(({ scores }: { scores: any }) => {
    console.log(scores);
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
