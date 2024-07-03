import { ListItem, ListItemButton, ListItemText, ListItemIcon, Typography } from "@mui/material";
import ListAltIcon from '@mui/icons-material/ListAlt';
import { FC } from "react";
import { RpdListItem as RpdListItemProps } from "../../types/RpdListTypes";
import useStore from "../../store/useStore";

const RpdListItem: FC<RpdListItemProps & { setChoise: (choise: string) => void, currentChoise: string, isFilled: boolean }> = ({ id, text, setChoise, currentChoise, isFilled }) => {
    
    return (
        <ListItem disableGutters sx={{ p: 0, backgroundColor: currentChoise === id ? 'grey.300' : 'transparent' }}>
            <ListItemIcon sx={{ 
                color: isFilled ? "blue" : currentChoise === id || id === "approvalPage" ? 'grey.800' : 'red',
                opacity: id === "approvalPage"? 0.38 : 1, // красный цвет для не выбранного
                pl: 3
            }}>
                <ListAltIcon />
            </ListItemIcon>
            <ListItemButton onClick={() => setChoise(id)} sx={{ color: 'black', px: 0 }} disabled={id === "approvalPage"}>
                <ListItemText primary={
                    <Typography style={{ color: 'black', fontFamily: "Arial", fontSize: "16px" }}>{text}</Typography>
                } />
            </ListItemButton>
        </ListItem>
    );
}

export default RpdListItem;