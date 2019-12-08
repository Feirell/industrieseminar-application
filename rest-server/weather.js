exports.endpoints = [
    {
        path: '/', method: 'GET', resolver: (req, res) => {
            const example = 12;
            res.send({ example })
        }
    },
    {
        path: '/', method: 'POST', resolver: (req, res) => {
            console.log(req.query, req.body);
            res.send();
        }
    }
]