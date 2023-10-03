import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const extractTableName=(url:string)=>{
  // [pantry]-list
  let startIndex = url.indexOf('[')
  let endIndex = url.indexOf(']')
  if(startIndex !== -1 && endIndex !== -1){
    return url.substring(startIndex+1,endIndex)
  }
}
export function truncateString(str:string, maxLength:number) {
  if (str.length <= maxLength) {
    return str;
  }
  return str.substring(0, maxLength) + ' ...view more';
}