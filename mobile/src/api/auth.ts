import { client } from './client';


export interface AuthResponse {
    ok: boolean;
    token: string;
    role: string;
}

export interface GoogleAuthResponse {
    ok: boolean;
    token: string;
    user: {
        id: string;
        email: string;
        name: string;
        role: string;
    };
}

export const login = async (email: string, password: string): Promise<AuthResponse> => {
    if (!email || !password) {
        throw new Error('Email and password are required');
    }

    try {
        console.log('[AUTH] Attempting login to:', client.defaults.baseURL);
        const response = await client.post('/api/auth/login', { email, password });
        console.log('[AUTH] Login successful');
        return response.data;
    } catch (error: any) {
        // Log the full error for debugging
        console.error('[AUTH] Login error details:', {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status,
            baseURL: client.defaults.baseURL,
        });
        
        // Network error (no response from server)
        if (!error.response) {
            throw new Error(`Cannot connect to server at ${client.defaults.baseURL}. Please check your internet connection.`);
        }
        
        // Server responded with error
        const serverMessage = error.response?.data?.message || error.response?.data?.error;
        throw new Error(serverMessage || `Login failed (${error.response?.status})`);
    }
};

export const register = async (name: string, email: string, password: string): Promise<AuthResponse> => {
    if (!name || !email || !password) {
        throw new Error('Name, email, and password are required');
    }

    try {
        const response = await client.post('/api/auth/register', { name, email, password });
        return response.data;
    } catch (error: any) {
         const message = error.response?.data?.message || error.message || 'Registration failed.';
         throw new Error(message);
    }
};

export const googleLogin = async (idToken: string): Promise<GoogleAuthResponse> => {
    if (typeof idToken !== 'string' || !idToken.trim()) {
        throw new TypeError('Invalid idToken: Token must be a non-empty string');
    }

    try {
        const response = await client.post('/api/auth/google/mobile', { idToken });
        return response.data;
    } catch (error: any) {
        const status = error.response?.status;
        const message = error.response?.data?.message || error.message || 'Google Login failed';
        throw new Error(`Google Login failed (${status || 'Network Error'}): ${message}`);
    }
};

export const getProfile = async () => {
    try {
        console.log('[API] Fetching /api/profile ...');
        const response = await client.get('/api/profile');
        console.log('[API] Profile Response:', response.data);
        return response.data.user;
    } catch (error: any) {
        console.error('[API Error] getProfile:', error.message, error.response?.status, error.response?.data);
        throw new Error('Failed to fetch profile');
    }
}

export const updateProfile = async (data: { name: string }) => {
    try {
        const response = await client.put('/api/profile', data);
        return response.data.user;
    } catch (error: any) {
         throw new Error('Failed to update profile');
    }
};

export const getConfig = async () => {
    try {
        const response = await client.get('/api/config');
        return response.data;
    } catch (e) {
        return { campusName: 'DTU', ordersPaused: false };
    }
};

export const requestPasswordReset = async (email: string) => {
    // Stub
    console.log('[API] Mock Password Reset Request for:', email);
    return { ok: true };
};

export const resetPassword = async (token: string, password: string) => {
    // Stub
    console.log('[API] Mock Password Reset for token:', token);
    return { ok: true };
};
