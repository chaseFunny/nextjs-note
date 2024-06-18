import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export function extractAndConcatenateText(data: any[]) {
  let result = "";

  data.forEach((paragraph) => {
    paragraph.children.forEach((child: any) => {
      if (child.type === "text") {
        result += child.text;
      }
    });
  });

  return result;
}
