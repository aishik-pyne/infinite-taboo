import axios from "axios";
const PUBLIC_PATH = process.env.VUE_APP_PUBIC_PATH ? process.env.VUE_APP_PUBIC_PATH : '/';
export async function getWord() {
    try {
        const response = (await axios.get(`${PUBLIC_PATH}/data/taboo_1.json`)).data;
        console.log(response);
        const item =  response[Math.floor(Math.random() * response.length)];
        console.log(item);
        return item;
        
    } catch (error) {
        console.log(`SOMETHING WENT WRONG: ${error}`);
    }
}

