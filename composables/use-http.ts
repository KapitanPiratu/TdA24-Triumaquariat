export const useHttp = (url, params) => {
    const config = useRuntimeConfig()
    const credentials = config.public.auth.username + ':' + config.public.auth.password;

    const opts = {
        async onRequest ({ request, options }) {
            options.headers = {
                'Authorization': 'Basic ' + btoa(credentials)
            }
        }
    }

    const instance = $fetch.create(opts)
    return instance(url, params)
}


