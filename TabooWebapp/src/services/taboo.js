import axios from "axios";
// import faker from "faker";

const ENDPOINT = process.env.VUE_APP_API_ENDPOINT;
if (!ENDPOINT) {
  throw "VUE_APP_API_ENDPOINT ENV VAR MISSING";
}
axios.defaults.baseURL = ENDPOINT;
export async function getWord() {
  try {
    const response = await axios.get("/api/guessword");
    if (response.data.tabooWords.length < 4) {
      return getWord();
    }
    return {
      guessWord: response.data.guessWordName,
      tabooWords: response.data.tabooWords.slice(0, 4)
    };
  } catch (error) {
    console.log(`SOMETHING WENT WRONG: ${error}`);
  }
}
