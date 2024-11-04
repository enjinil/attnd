import { z } from "zod";
import { gqlRequest } from "./graphql-client";
import { LOGIN, LOGOUT } from "../features/auth/auth-gqls";

const LOCAL_STORAGE_KEY = "AUTH_TOKEN";

export type User = {
  email: string;
  token: string;
  role: string;
  name: string;
  position: string;
};

export const loginInputSchema = z.object({
  email: z.string().min(1, "Email is required"),
  password: z.string().min(5, "Password is required"),
});

export type LoginInput = z.infer<typeof loginInputSchema>;

type LoginObserver = (user: User) => void;
type LogoutObserver = () => void;

class AuthAPI {
  private loginObservers: LoginObserver[] = [];
  private logoutObservers: LogoutObserver[] = [];

  addLoginObserver(observer: LoginObserver) {
    this.loginObservers.push(observer);
  }

  addLogoutObserver(observer: LogoutObserver) {
    this.logoutObservers.push(observer);
  }

  removeLoginObserver(observer: LoginObserver) {
    this.loginObservers = this.loginObservers.filter((obs) => obs !== observer);
  }

  removeLogoutObserver(observer: LogoutObserver) {
    this.logoutObservers = this.logoutObservers.filter(
      (obs) => obs !== observer
    );
  }

  private notifyLoginObservers(user: User) {
    this.loginObservers.forEach((observer) => observer(user));
  }

  private notifyLogoutObservers() {
    this.logoutObservers.forEach((observer) => observer());
  }

  getToken() {
    const token = window.localStorage.getItem(LOCAL_STORAGE_KEY);
    return token && JSON.parse(token);
  }

  private persistToken(token: string) {
    window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(token));
  }

  async login(input: LoginInput) {
    return gqlRequest(LOGIN, { input }).then((result) => {
      const { login } = result.data;

      this.persistToken(login.token);
      this.notifyLoginObservers(login);

      return login;
    });
  }

  async logout() {
    await gqlRequest(LOGOUT);

    window.localStorage.removeItem(LOCAL_STORAGE_KEY);
    this.notifyLogoutObservers();
  }
}

export const authAPI = new AuthAPI();

export const getToken = authAPI.getToken.bind(authAPI);
export const login = authAPI.login.bind(authAPI);
export const logout = authAPI.logout.bind(authAPI);
export const addLoginObserver = authAPI.addLoginObserver.bind(authAPI);
export const addLogoutObserver = authAPI.addLogoutObserver.bind(authAPI);
export const removeLoginObserver = authAPI.removeLoginObserver.bind(authAPI);
export const removeLogoutObserver = authAPI.removeLogoutObserver.bind(authAPI);

export { LOCAL_STORAGE_KEY };
