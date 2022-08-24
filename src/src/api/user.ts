import axios from "axios";


export const loginuser = async (email: string, password: string) => {
  try {
    const url = `${process.env.REACT_APP_USER_BASE_URL}/login`;
    console.log(url)
    const data = {email, password}
    const res = await axios.post(url, data, {
      headers: {
        'Content-Type':'application/json'
      }
    });
    return { error : false, data: res.data }
  } catch (error) {
    console.log(error);
    return { error: true  }
  }
}


export const signUpser = async (name: string, email: string, password: string) => {
  try {
    const url = `${process.env.REACT_APP_USER_BASE_URL}/signup`;
    console.log(url)
    const data = {name, email, password}
    const res = await axios.post(url, data, {
      headers: {
        'Content-Type':'application/json'
      }
    });
    return { error : false, data: res.data }
  } catch (error) {
    console.log(error);
    return { error: true  }
  }
}