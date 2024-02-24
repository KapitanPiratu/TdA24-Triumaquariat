export default defineEventHandler((event) => {
    if (event.path.substring(0,4) == '/api') {
        
        const config = useRuntimeConfig();
      
        /**
         * If the request is a prerender request, do nothing.
         */
        if (
          event.node.req.headers?.["x-nitro-prerender"] &&
          import.meta.env.NODE_ENV === "prerender"
        ) {
          return;
        }
      
        let authenticated = false;
      
        /**
         * Get the credentials from the Authorization header.
         */
        const credentials = event.node.req.headers?.authorization?.split(" ")[1];
      
        /**
         * If the credentials are defined, check if they match any of the users.
         */
        if (credentials) {
          const [username, password] = Buffer.from(credentials, "base64")
            .toString("ascii")
            .split(":");

        const users = []
        users.push(config.public.auth);
      
          authenticated = users.some(
            (user) => user.username === username && user.password === password
          );
        }
      
        /**
         * If the user is not authenticated or the credentials are not defined, send a 401 response.
         */
        if (!authenticated) {
          event.node.res.setHeader("WWW-Authenticate", 'Basic realm="Secure Area"');
          event.node.res.statusCode = 401;
          event.node.res.end("Access denied");
        }

    }
});