import axios from 'axios';

const url = 'http://localhost:3000/api/verify';

export const sendRecoveryEmail = async (email) => {
 const req = await axios.post(url, { email });
 const res = req.data;

 console.log(res);
};
