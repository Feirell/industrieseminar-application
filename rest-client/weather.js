const request = ({ path, method = 'GET', headers = {}, query = {}, body = undefined }) => {
    const url = new URL('/rest-weather' + path, window.location.href);

    for (const [key, value] of Object.entries(query))
        url.searchParams.set(key, value);

    headers = new Headers(headers);

    if (body)
        headers.set('Content-Type', 'application/json');

    return fetch(url.href, {
        method,
        body: body ? JSON.stringify(body) : undefined,
        headers
    });
}

(async () => {
    const f = await request({
        path: '',
        method: 'POST',
        query: {
            'test-a': 12,
            'test-b': false
        },
        body: {
            testQ: 'abc',
            testT: [1, 2, 3],
        }
    });

    const json = await f.json();
    console.log('json', json);
})()
