import axios from 'axios';


export async function getAddress() {
  let todosRes = await axios.get('http://localhost:3000/api/dia-diem-cach-ly')
  return todosRes.data.docs;
}

export async function getTypeAddress() {
  let todosRes = await axios.get('http://localhost:3000/api/dm-dia-diem-cach-ly')
  return todosRes.data.docs;
}