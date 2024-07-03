export interface RpdListItem {
    id: string;
    text: string;
    isFilled: boolean;
}

export interface RpdListProps {
    RpdListItems: RpdListItem[];
    setChoise: (choise: string) => void;
    currentChoise: string;
}