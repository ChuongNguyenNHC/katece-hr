"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

interface RoleGuardProps {
    children: React.ReactNode;
    allowedRoles: string[];
}

export function RoleGuard({ children, allowedRoles }: RoleGuardProps) {
    const router = useRouter();
    const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

    useEffect(() => {
        // Run on client side only
        const checkAuth = () => {
            try {
                const token = localStorage.getItem("token");
                const userStr = localStorage.getItem("user");
                
                if (!token || !userStr) {
                    router.push("/Auth");
                    console.log("Not logged in");
                    return;
                }

                const user = JSON.parse(userStr);
                
                if (allowedRoles.includes(user.position)) {
                    setIsAuthorized(true);
                } else {
                    // Redirect to their appropriate dashboard if logged in but wrong role
                    // Or just login for now
                    setIsAuthorized(false);
                    router.push("/login?error=unauthorized");
                }
            } catch (e) {
                router.push("/Auth");
            }
        };

        checkAuth();
    }, [router, allowedRoles]);

    if (isAuthorized === null) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            </div>
        );
    }

    if (!isAuthorized) {
        return null; // Will redirect in useEffect
    }

    return <>{children}</>;
}
