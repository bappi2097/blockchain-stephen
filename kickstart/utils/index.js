import { useRouter, usePathname } from 'next/navigation';

export const link = (path) => {
    const router = useRouter();
    return () => router.push(path);
};

export const getPathName = usePathname;