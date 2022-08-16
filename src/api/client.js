import axios from "axios";

const client = axios.create();

client.defaults.baseURL = `https://api.bithumb.com/public/transaction_history`;

export default client;
