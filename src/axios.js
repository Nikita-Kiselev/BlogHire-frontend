import axios from "axios";


// крч эта залупа нужна для сохранения корневого пути
// если нам нужно получить посты, то нужно написать так axios.get('http://localhost:666/posts')
// вместо этого теперь мы можем сделать так axios.get('posts') и всё будет нормально
const instance = axios.create({
    baseURL: 'http://localhost:666'
})

instance.interceptors.request.use((config) => {
    config.headers.Authorization = window.localStorage.getItem('token');
    return config;
})

export default instance