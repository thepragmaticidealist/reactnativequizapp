import { Dimensions } from "react-native";
const {width, height} = Dimensions.get('window');

export const COLORS = {
    primary: "#252c4a",
    secondary: '#1E90FF',
    accent: '#3498db',
    
    success: '#00C851',
    error: '#ff4444',
    lightsuccess: '#7aeb7a',
    lighterror: '#ff9a9a',

    black: "#171717",
    white: "#FFFFFF",
    background: "#252C4A",

    progressbar: '#00000020'
}


export const SIZES = {
    base: 10,
    width,
    height
}