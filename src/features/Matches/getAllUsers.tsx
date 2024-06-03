import { useEffect, useState } from 'react';

export default function useGetUsers(bearerToken: string) {
    const [users, setUsers] = useState<Mahasiswa[]>([]);
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
                const data: ApiResponse = await response.json();
                console.log(data.results)
                const mahasiswaData = data.results.filter(mhs => mhs.user_detail?.role === 'STU');
                setUsers(mahasiswaData);
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


export interface Mahasiswa {
    id: number;
    username: string;
    email: string;
    user_detail: {
        email: string;
        role: string;
        is_external: boolean;
        id_code:string;
        full_name:string;
        organization: {
            id: string;
            faculty: string;
            study_program: string;
            educational_program: string;
        };
    };
    user_profile: {
        name: string;
        major: string;
        about: string;
        profile_image: string;
        line_id: string;
        linkedin_url: any;
        github_url: string;
        instagram_url: string;
        website_url: string;
        is_open: boolean;
        fields: {
            id: number;
            name: string;
            code: string;
            description: string;
        }[];
        experiences: []
    };
}

interface ApiResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Mahasiswa[];
}
