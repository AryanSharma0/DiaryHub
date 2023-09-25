import { combineReducers } from "redux";
import { diaryReducer } from "./Diary/diary_reducer";
import { noteReducer } from "./Notes/notes_reducer";
import { authReducer } from "./Auth/auth_reducer";
import { postReducer } from "./Blog/Post/post_reducer";
import { highlightReducer } from "./Blog/Highlight/highlight_reducer";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { createTransform } from "redux-persist";
import CryptoJS from "crypto-js";

const encryptionKey = process.env.REACT_APP_PERSIST_ENCRYPT_KEY;
console.log(process.env.REACT_APP_PERSIST_ENCRYPT_KEY);
const encrypt = createTransform(
  (inboundState, key) => {
    if (!inboundState) return inboundState;
    const cryptedText = CryptoJS.AES.encrypt(
      JSON.stringify(inboundState),
      encryptionKey
    );

    return cryptedText.toString();
  },
  (outboundState, key) => {
    if (!outboundState) return outboundState;
    const bytes = CryptoJS.AES.decrypt(outboundState, encryptionKey);

    const decrypted = bytes.toString(CryptoJS.enc.Utf8);

    return JSON.parse(decrypted);
  }
);
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["authReducer"],
  transforms: [encrypt],
};

const reducer = combineReducers({
  diaryReducer,
  noteReducer,
  authReducer,
  postReducer,
  highlightReducer,
});

export const persistedReducer = persistReducer(persistConfig, reducer);
