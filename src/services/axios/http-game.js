import axios from "axios";

console.log(process.env.NEXT_PUBLIC_TICTACTOEAPI);

export default axios.create({
  baseURL: process.env.NEXT_PUBLIC_TICTACTOEAPI,
  headers: {
    'Content-Type': 'application/json'
  }
});