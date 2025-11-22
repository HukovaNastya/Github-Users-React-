import github from '../libs/github'
const PER_PAGE = 5;

export async function searchUsers(value, perPage = PER_PAGE, page = 1) {
    const { data } = await github.get(`/search/users?q=${value}&per_page=${perPage}&page=${page}`);
    return data;
}

export async function getUserByLogin(login) {
    const { data } = await github.get(`/users/${login}`);
    return data;
}

export async function getUserById(id) {
    const {data} = await github.get( `/user/${id}`, );
    return data;
}

