import { createServer } from 'http';

const PORT = process.env.PORT || 3000; // Assign a default port if PORT environment variable is not set
const users = [
    { id: 1, name: 'john doe' },
    { id: 2, name: 'jane doe' },
    { id: 3, name: 'jim doe' }
];

// Logger middleware
const logger = (req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
};

// JSON middleware
const jsonMiddleware = (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    next();
};

// Route handler for GET /api/users
const getUsersHandler = (req, res) => {
    const id = req.url.split('/')[3];
    const user = users.find(user => user.id === parseInt(id));

    if (user) {
        res.statusCode = 200;
        res.end(JSON.stringify(user));
    } else {
        res.statusCode = 404;
        res.end(JSON.stringify({ message: 'User not found' }));
    }
};

// Route handler for POST /api/users
const createUserHandler = (req, res) => {
    let body = '';
    req.on('data', (chunk) => {
        body += chunk.toString();
    });
    req.on('end', () => {
        const newUser = JSON.parse(body);
        users.push(newUser);
        res.statusCode = 201;
        res.end(JSON.stringify(newUser));
    });
};

// Not found handler
const notFoundHandler = (req, res) => {
    res.statusCode = 404;
    res.end(JSON.stringify({ message: 'Route not found' }));
};

const server = createServer((req, res) => {
    logger(req, res, () => {
        jsonMiddleware(req, res, () => {
            if (req.url === '/api/users' && req.method === 'GET') {
                getUsersHandler(req, res);
            } else if (req.url.match(/\/api\/users\/([0-9]+)/) && req.method === 'GET') {
                getUsersHandler(req, res);
            } else if (req.url === '/api/users' && req.method === 'POST') {
                createUserHandler(req, res);
            } else {
                notFoundHandler(req, res);
            }
        });
    });
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
