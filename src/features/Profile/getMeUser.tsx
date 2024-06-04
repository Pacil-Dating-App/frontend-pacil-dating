import { useEffect, useState } from 'react';
import { User } from './Profile';

export default function useGetMe(bearerToken: string) {
    const [me, setMe] = useState<User>();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://34.67.119.77/api/v1/users/all/`, {
                    headers: {
                        'Authorization': 'Bearer ' + bearerToken,
                    },
                });
                if (!response.ok) {
                    throw new Error('Gagal mengambil data');
                }
                console.log(response)
                const data: User = await response.json();
                console.log(data)
                
                setMe(data);
                setLoading(false);
            } catch (error: any) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchData();

    }, [bearerToken]);

    return { me, loading, error };
}

interface ApiResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: User;
}
