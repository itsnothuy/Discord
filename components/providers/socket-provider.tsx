// "use client";

// import {
//     createContext,
//     useContext,
//     useEffect,
//     useState
// } from "react";

// import { io as ClientIO } from "socket.io-client";

// type SocketContextType = {
//     socket: any | null;
//     isConnected: boolean;
// }

// const SocketContext = createContext<SocketContextType>({
//     socket: null,
//     isConnected: false,
// });

// export const useSocket = () => {
//     return useContext(SocketContext);
// }

// export const SocketProvider= ({
//     children,
// }: {
//     children: React.ReactNode
// }) => {
//     const [socket, setSocket] = useState(null);
//     const [isConnected, setIsConnected] = useState(false);

//     useEffect(() => {
//         const socketInstance = new (ClientIO as any) (process.env.NEXT_PUBLIC_SITE_URL!, {
//             path: "/api/socket/io",
//             addTrailingSlash: false,
//         });

//         socketInstance.on("connect", () => {
//             setIsConnected(true);
//         });

//         socketInstance.on("disconnect", () => {
//             setIsConnected(false);
//         })

//         setSocket(socketInstance);
//         return () => {
//             socketInstance.disconnect();
//         }
//     }, []);

//     return (
//         <SocketContext.Provider value= {{socket, isConnected }}>
//             {children}
//         </SocketContext.Provider>
//     )

// }



"use client";

import React, {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";
import { io as ClientIO, Socket } from "socket.io-client";

type SocketContextType = {
    socket: Socket | null;
    isConnected: boolean;
};

// Create the context with a default value
const SocketContext = createContext<SocketContextType>({
    socket: null,
    isConnected: false,
});

export const useSocket = () => {
    return useContext(SocketContext);
};

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        if (!process.env.NEXT_PUBLIC_SITE_URL) {
            console.error("NEXT_PUBLIC_SITE_URL is not defined.");
            return;
        }

        // Initialize socket connection
        const socketInstance: Socket = ClientIO(process.env.NEXT_PUBLIC_SITE_URL, {
            path: "/api/socket/io",
            addTrailingSlash: false,
        });

        // Handle connection and disconnection events
        socketInstance.on("connect", () => {
            setIsConnected(true);
            console.log("Connected to socket server");
        });

        socketInstance.on("disconnect", () => {
            setIsConnected(false);
            console.log("Disconnected from socket server");
        });

        // Optional: handle errors
        socketInstance.on("connect_error", (error) => {
            console.error("Connection error:", error);
        });

        // Set the socket instance to state
        setSocket(socketInstance);

        // Cleanup function to disconnect socket on component unmount
        return () => {
            socketInstance.disconnect();
        };
    }, []);

    return (
        <SocketContext.Provider value={{ socket, isConnected }}>
            {children}
        </SocketContext.Provider>
    );
};
