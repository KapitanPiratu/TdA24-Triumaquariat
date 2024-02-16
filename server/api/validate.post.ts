import jwt from 'jsonwebtoken';

export default defineEventHandler((event) => {
    const res = new Promise(async (resolve, reject) => {

        await readBody(event)
            .then(body => {
                if (!body.token) {
                    setResponseStatus(event, 400);
                    resolve({ message: 'token not provided' });
                } else {

                    jwt.verify(body.token, 'tempsecret', (err: any, decoded: any) => {
                        if (err) {
                            console.log(err)
                            setResponseStatus(event, 400);
                            resolve({ message: err });
                        } else {
                            resolve({ valid: true });
                        }
                    })
                }
            })
    })
    return res;
});