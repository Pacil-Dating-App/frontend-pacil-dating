import { useEffect, useState } from 'react';

export default function useGetUsers(bearerToken: string) {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/v1/users/all/?page=1`, {
                    headers: {
                        'Authorization': 'Bearer ' + bearerToken,
                    },
                });
                if (!response.ok) {
                    throw new Error('Gagal mengambil data');
                }
                const data: ApiResponse = await response.json();
                setUsers(data.results);
                setLoading(false);
            } catch (error: any) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchData();

    }, [bearerToken]);

    return { users, loading, error };
}


// INTERFACE

export interface User {
    id: number;
    username: string;
    name: string;
    age: number;
    email: string;
    bio: string;
    description: string;
    profile_image: string;
    major: string;
    year_of_study: string;
    interests: String[]
}

interface ApiResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: User[];
}
