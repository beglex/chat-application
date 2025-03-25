import type {User} from '@server/models';

export class UserService {
    private base = `${import.meta.env.VITE_API_URL}/users`;

    private headers: HeadersInit = {
        'Content-Type': 'application/json',
    };

    private options: RequestInit = {
        headers: this.headers,
        credentials: 'include',
    };

    private async parse(response: Response) {
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error);
        }

        return response.json();
    }

    private async request(path = '', options: RequestInit = {}) {
        const url = path ? `${this.base}/${path}` : this.base;
        const response = await fetch(url, {...this.options, ...options});

        return this.parse(response) as Promise<unknown>;
    }

    async create(body: Partial<User>, options: RequestInit = {}) {
        return this.request('', {...options, method: 'POST', body: JSON.stringify(body)}) as Promise<User>;
    }

    async get(options: RequestInit = {}) {
        return this.request('', {...options, method: 'GET'}) as Promise<User[]>;
    }

    async getOne(login: User['login'], options: RequestInit = {}) {
        return this.request(login, {...options, method: 'GET'}) as Promise<User>;
    }

    async update(login: User['login'], body: Partial<User>, options: RequestInit = {}) {
        return this.request(login, {...options, method: 'PATCH', body: JSON.stringify(body)}) as Promise<User>;
    }

    async delete(login: User['login'], options: RequestInit = {}) {
        return this.request(login, {...options, method: 'DELETE'}) as Promise<User>;
    }

    async current() {
        return this.request('current', this.options) as Promise<User | null>;
    }

    async signIn(body: Pick<User, 'login' | 'password'>) {
        return this.request('signin', {method: 'POST', body: JSON.stringify(body)}) as Promise<User>;
    }

    async signUp(body: Pick<User, 'login' | 'email' | 'password'>) {
        return this.request('signup', {method: 'POST', body: JSON.stringify(body)}) as Promise<User>;
    }
}
