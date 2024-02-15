export default defineEventHandler((event) => {

    const res = new Promise<void>(async (resolve, reject) => {
        await readBody(event)
            .then(body => {
                console.log(body);
                resolve();
            })
    })
    return res
});