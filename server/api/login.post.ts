import jwt from 'jsonwebtoken';

export default defineEventHandler((event) => {

    const res = new Promise(async (resolve, reject) => {
        await readBody(event)
            .then(body => {
                console.log(body);

                if (!body['username'] || !body['password']) {
                    setResponseStatus(event, 400);
                    resolve({
                        message: 'Body is missing username or password'
                    });
                    return;
                }

                const token = jwt.sign({ username: body['username'] }, 'tempsecret', { expiresIn: '1d' });

                resolve({ token: token });
            })
    })
    return res
});