import type { Recipe } from '../../types';
type Props = {
    recipe: Recipe;
    isKnown: boolean;
    canCraft: boolean;
    missingItems?: {
        item: string;
        need: number;
        have: number;
    }[];
    onClick?: () => void;
};
export default function RecipeCard({ recipe, isKnown, canCraft, missingItems, onClick }: Props): import("react/jsx-runtime").JSX.Element;
export {};
