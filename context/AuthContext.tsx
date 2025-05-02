"use client";

import { createContext, useContext, useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import Cookies from "js-cookie";

interface User {
  id: number;
  name: string;
  email: string;
  userType: "REGION" | "STATION" | "SCHOOL";
  privileges: string[];
  details?: any;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = Cookies.get("auth_token");

      if(!token) {
        setIsAuthenticated(false);
        setUser(null)
        return;
      }
    try {
      const decoded:any = jwt.decode(token);
      
      if(!decoded || !decoded.id) {
      throw new Error("Invalid token structure");
      }
      
      const details  =  decoded.region || decoded.station || decoded.school;

      const user:User = {
        id: decoded.id,
        name:decoded.name,
        email: decoded.email,
        userType:decoded.userType,
        privileges:decoded.privileges,
        details,
      }
        setUser(user);
        setIsAuthenticated(true);
       
      } catch (err) {
        console.error("Token decode failed", err);
        setUser(null);
        setIsAuthenticated(false);
      }
    
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
// "use client";

// import { createContext, useContext, useEffect, useState } from "react";
// import jwt from "jsonwebtoken";
// import Cookies from "js-cookie";
// import { destroyCookie, setCookie } from "nookies";
// import path from "path";

// interface User {
//   id: number;
//   name: string;
//   email: string;
//   userType: "REGION" | "STATION" | "SCHOOL";
//   privileges: string[];
//   region?: {
//     id: number;
//     region: string;
//   };
//   station?: any;
//   school?: any;
//   iat?: number;
//   exp?: number;
// }

// interface AuthContextType {
//   user: User | null;
//   isAuthenticated: boolean;
// }

// const AuthContext = createContext<AuthContextType>({
//   user: null,
//   isAuthenticated: false,
// });

// export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   useEffect(() => {
//     const token = Cookies.get("auth_token");

//     if (token) {
//       try {
//         const decoded = jwt.decode(token) as User;

//         // Save region ID to localStorage if applicable
//         if (decoded?.userType === "REGION" && decoded?.region?.id) {
//           setCookie(null, "regionId", decoded.region.id.toString(), {
//             maxAge: 30 * 24 * 60 * 60, // 30 days
//             path: "/",
//           });

//           //localStorage.setItem("regionId", decoded.region.id.toString());
//         } else {
//           destroyCookie(null, "regionId", {});
//           //ocalStorage.removeItem("regionId");
//         }

//         setUser(decoded);
//         setIsAuthenticated(true);
//       } catch (err) {
//         console.error("Token decode failed", err);
//         setUser(null);
//         setIsAuthenticated(false);
//         destroyCookie(null, "auth_token", {});
//         //localStorage.removeItem("regionId"); // cleanup on error
//       }
//     } else {
//       destroyCookie(null, "auth_token", {});
//       // localStorage.removeItem("regionId"); // cleanup if no token
//     }
//   }, []);

//   return (
//     <AuthContext.Provider value={{ user, isAuthenticated }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);
