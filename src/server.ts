import app from "./app";

// import server type defintion
import {Server} from "http";

// initialize 
const PORT: string | 3000 = process.env.PORT || 3000;

// initialize server for the application to listen for requests on specified port number ie. 3000 by default
const server: Server = app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
});

// export server for testing
export default server;