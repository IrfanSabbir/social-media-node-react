import axios from "axios";

import { 
  mumurInputProps,
} from '../model'

export const mumurlist = async (props: mumurInputProps) => {
  try {
    const url = `${process.env.REACT_APP_MURMURS_BASE_URL}/${props.type}`;
    const res = await axios.get(url, {
      headers: {
        'Content-Type':'application/json',
        'Authorization': `Bearer ${props.token}`
      }
    });
    return { error : false, data: res.data.data }
  } catch (error) {
    return { error: true, data: []  }
  }
}

export const likmurmurs = async (murmurId?: number, token?: string) => {
  try {
    const url = `${process.env.REACT_APP_MURMURS_BASE_URL}/like/${murmurId}`;
    const res = await axios.post(url, {data: ""}, {
      headers: {
        'Content-Type':'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    console.log(res.data)
    return { error : false, data: res.data.message }
  } catch (error) {
    return { error: true, data: ''  }
  }
}

export const murmurDetails = async (murmurId?: string, token?: string) => {
  try {
    const url = `${process.env.REACT_APP_MURMURS_BASE_URL}/details/${murmurId}`;
    const res = await axios.get(url, {
      headers: {
        'Content-Type':'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    console.log(res.data)
    return { error : false, data: res.data.data }
  } catch (error) {
    return { error: true, data: null  }
  }
}