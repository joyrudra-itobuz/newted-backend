import { NoteModel } from "../models/note";

interface Response {
  data: any;
  message: string;
  success: boolean;
}

export const response = (data: any, message: string, success: boolean) => {
  return { data, message, success } as Response;
};
