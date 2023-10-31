import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getRandomUniqueValues<T>(
  list: T[],
  maxRandom: number = 15
): T[] {
  const uniqueList = Array.from(new Set(list));
  const randomIndexSet = new Set<number>();
  const uniqueValues: T[] = [];

  while (randomIndexSet.size < maxRandom) {
    const randomIndex = Math.floor(Math.random() * uniqueList.length);
    randomIndexSet.add(randomIndex);
  }

  randomIndexSet.forEach((index) => {
    uniqueValues.push(uniqueList[index]);
  });

  return uniqueValues;
}

export function timeAgo(date: Date): string {
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 60) return seconds + "s";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return minutes + "m";
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return hours + "h";
  const days = Math.floor(hours / 24);
  if (days < 30) return days + "D";
  const months = Math.floor(days / 30);
  if (months < 12) return months + "M";
  const years = Math.floor(days / 365);
  return years + "Y"; // Output format: '1Y', '10M', '5h', '30s', etc.
}

export function formatNumber(number: number): string {
  if (number < 10000) {
    return number.toString();
  } else if (number < 1000000) {
    const thousands = Math.floor(number / 1000);
    return thousands + "K";
  } else if (number < 1000000000) {
    const millions = (number / 1000000).toFixed(1);
    return millions + "M";
  } else {
    const billions = (number / 1000000000).toFixed(1);
    return billions + "B";
  }
}

export function formatNumberWithLeadingZeros(number: number, length: any) {
  return number.toString().padStart(length, "0");
}
