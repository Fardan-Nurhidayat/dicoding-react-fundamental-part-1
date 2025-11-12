import { createContext } from "react";

const LangContext = createContext({
  lang : 'en', 
  toggleLang : () => {},
});

export default LangContext;