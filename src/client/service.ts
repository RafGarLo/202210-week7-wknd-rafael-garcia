const getRobots = () => {
    const token =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6IlBlcGUiLCJpYXQiOjE2NjkwNDIxNzF9.Va7fsXsgCj5BkH_ZO8WdGYqp8YWvT6REexcD7cMTSCA';
    const url = 'http://localhost:3300/users/robots';
    fetch(url, {
        headers: {
            'Content-type': 'application/json',
            Authentication: `Bearer ${token}`,
        },
    });
};
