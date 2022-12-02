import {
  useState,
  useEffect,
  useContext,
  useMemo,
  ReactNode,
  createContext,
} from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
import { auth } from "@/auth/firebase";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Auth = {
  user: User | null;
  signup: (email: string, password: string) => Promise<void>;
  signin: (email: string, password: string) => Promise<void>;
  error: string | null;
  isLoading: boolean;
};

const AuthContext = createContext<Auth>({
  user: null,
  signup: async () => {},
  signin: async () => {},
  error: null,
  isLoading: false,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const persist = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setIsLoading(false);
        // ...
      } else {
        // User is signed out
        setUser(null);
        setIsLoading(true);
        router.push("/login");
      }
      setIsInitialLoading(false);
    });
    return () => persist();
  }, []);

  const signup = async (email: string, password: string) => {
    setIsLoading(true);

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setUser(user);
        router.push("/");
        setIsLoading(false);
        toast("Successfully signed up.");
      })
      .catch((e) => {
        const errorCode = e.code;
        const errorMessage = e.message;
        console.log(errorMessage);
        setError(errorMessage);
        toast(error);
      })
      .finally(() => setIsLoading(false));
  };

  const signin = async (email: string, password: string) => {
    setIsLoading(true);

    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setUser(user);
        router.push("/");
        setIsLoading(false);
        toast("Successfully signed in.");
      })
      .catch((e) => {
        const errorCode = e.code;
        const errorMessage = e.message;
        console.log(errorMessage);
        setError(errorMessage);
        toast(error);
      })
      .finally(() => setIsLoading(false));
  };

  const signout = async () => {
    setIsLoading(true);

    await signOut(auth)
      .then(() => {
        // Sign-out successful.
        setUser(null);
        setIsLoading(false);
      })
      .catch((e) => {
        // An error happened.
        const errorCode = e.code;
        const errorMessage = e.message;
        console.log(errorMessage);
        setError(errorMessage);
        toast(error);
      })
      .finally(() => setIsLoading(false));
  };

  const memoedValue = useMemo(
    () => ({ user, signup, signin, signOut, isLoading, error }),
    [user, isLoading, error]
  );

  return (
    <AuthContext.Provider value={memoedValue}>
      {isInitialLoading || children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
