import { Client, Account, Databases, ID, OAuthProvider } from "appwrite";
import config from "./config";

type USER = {
    name?: string;
    username?: string;
    email: string;
    password: string;
}

class AppwriteService {
    client;
    account;
    database;

    constructor() {
        this.client = new Client();
        this.client
            .setProject(config.projectId)
            .setEndpoint(config.projectUrl)

        this.account = new Account(this.client);
        this.database = new Databases(this.client);
    }

    // Authentication
    async createUser({ name, email, password }: USER) {

        const newUser = await this.account.create(ID.unique(), email, password, name);

        if (newUser) {
            return await this.loginUserWithEmailPassword({ email, password });
        }
    }

    async loginUserWithEmailPassword({ email, password }: USER) {

        return await this.account.createEmailPasswordSession(email, password);
    }

    async loginWithGoogle() {

        await this.account.createOAuth2Session(
            OAuthProvider.Google,
            '/',
            '/auth/signup'
        )
    }

    async getCurrentUserDetails() {
        return await this.account.get();
    }

    async logoutCurrentUser() {
        const response = await this.account.deleteSession('current');

        if (response) {
            return true;
        }

        return false;
    }
}


const appwriteService = new AppwriteService();
export default appwriteService;