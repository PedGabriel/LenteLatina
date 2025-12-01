import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNmVjNWRhNGE4N2Y4OWMxYzhhYjYzMmI4ODY0NmQ4YiIsIm5iZiI6MTc1OTMyMzMwNS43Miwic3ViIjoiNjhkZDI0YTk3NTcyNDRlNTFkMmRmODViIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.d6NHqURAQDVO1kLUzSrWnKt_kpRNUm1ePvJ_geuVxL8',
    },
});

export default api;