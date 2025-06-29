import clsx from "clsx";
import { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";


//clsx에서 제공하는 clsx가 받을 수 있는 인자(문자열, 객체.. 등등등 )들에 대한 타입이 정리되어있음 
//... input cn의인자로 전달되는 style들을 하나의 배열로 묶어서 가져옴 
// clsx는 스프레드 연산자에 의해 배열을 풀어서, 문자열은 그대로 쓰고,  false 값은 무시하며 true값만 클래스로 만듬 
// twmerge는 오버라이딩을 해결함 
export const cn = (...inputs : ClassValue[]) => {
  return  twMerge(clsx(...inputs))
}