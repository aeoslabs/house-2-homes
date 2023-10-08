import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function downloadImage(image: any) {
  const imageUrl = image; // Replace with your image URL
  const response = await fetch(imageUrl);
  const blob = await response.blob();

  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `generated.png`;

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};