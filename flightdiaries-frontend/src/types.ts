
export interface Diary {
  id: number;
  weather: string;
  visibility: string;
  date: string;
  comment: string;
}

export type NonSensitiveDiaryEntry = Omit<Diary, "comment">;

export type NewDiaryEntry = Omit<Diary, "id">;