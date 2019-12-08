export const requestGraphQL = (path, query, variables) =>
    fetch('/graphql-' + path, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query,
            variables,
        })
    })
        .then(r => r.json())
