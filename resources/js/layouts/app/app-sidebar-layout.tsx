import { AppContent } from '@/components/app-content';
import { AppShell } from '@/components/app-shell';
import { AppSidebar } from '@/components/app-sidebar';
import { AppSidebarHeader } from '@/components/app-sidebar-header';
import { SuccessAlert } from '@/components/custom/SuccessAlert';
import { SharedData, type BreadcrumbItem } from '@/types';
import { usePage } from '@inertiajs/react';
import { useEffect, useState, type PropsWithChildren } from 'react';

export default function AppSidebarLayout({ children, breadcrumbs = [] }: PropsWithChildren<{ breadcrumbs?: BreadcrumbItem[] }>) {
    const { flash } = usePage<SharedData>().props;
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);

    useEffect(() => {
        if (flash.success) {
            setShowSuccessAlert(true);
            const timer = setTimeout(() => {
                setShowSuccessAlert(false);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [flash]);

    return (
        <AppShell variant="sidebar">
            <AppSidebar />
            <AppContent variant="sidebar" className="overflow-x-hidden">
                <AppSidebarHeader breadcrumbs={breadcrumbs} />

                {showSuccessAlert && flash.success && (
                    <div className="container mx-auto mb-4 px-4 md:px-0">
                        <SuccessAlert message={flash.success} onClose={() => setShowSuccessAlert(false)} />
                    </div>
                )}

                {children}
            </AppContent>
        </AppShell>
    );
}
