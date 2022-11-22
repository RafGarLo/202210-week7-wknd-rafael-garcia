const apiUrl = 'http://localhost:7700';

export const getRobots = (token: string) => {
    console.log(token);
    const url = apiUrl + '/robots';
    return fetch(url, {
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    }).then((resp) => resp.json());
};

export const login = (data: { [key: string]: string }): Promise<string> => {
    const url = apiUrl + '/users/login';
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-type': 'application/json',
        },
    }).then((resp) => resp.json());
};
