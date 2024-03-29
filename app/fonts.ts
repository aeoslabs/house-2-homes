import { Cormorant_Garamond, Poppins } from "next/font/google";

export const cormorant = Cormorant_Garamond({
    subsets: ["cyrillic"],
    weight: ["400", "500", "600", "700"],
});
export const poppins = Poppins({
    subsets: ["latin"],
    weight: ["300","400", "500", "600", "700"],
});