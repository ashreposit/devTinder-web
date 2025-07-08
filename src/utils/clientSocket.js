import { io } from "socket.io-client";
import { BASE_URL } from "./constants";

export const createSocketConnection = () => {
    if (location.hostname === "localhost") {
        return io(BASE_URL);
    }
    else {
        return io("/",{path:"/api/socket.io"});
    }
};

// the socket connection takes place in localhost/socket.io, but in production our path will be different so we are setting the path explicitly.
// so when we want to guve custom path to socket.io ,this is the way.
