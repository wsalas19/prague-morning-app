import {styled} from "@mui/material/styles";
import Switch from "@mui/material/Switch";

export const StyledSwitch = styled(Switch)(({theme}) => ({
  '& .MuiSwitch-track': {
    backgroundColor: "#7F879E",
  },
  '& .MuiSwitch-thumb': {
    color: "black",
  },
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: "black",
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: "#7F879E",
  },
}));