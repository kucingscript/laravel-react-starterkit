import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import { buttonVariants } from '../ui/button';
import { Pagination, PaginationContent, PaginationItem } from '../ui/pagination';

interface PageLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginationProps {
    meta: {
        links: PageLink[];
        from: number;
        to: number;
        total: number;
    };
}

const Paginator = ({ meta }: PaginationProps) => {
    if (!meta || meta.total === 0) {
        return null;
    }

    return (
        <>
            <div className="mt-4">
                <Pagination>
                    <PaginationContent>
                        {meta.links.map((link, index) => (
                            <PaginationItem key={index}>
                                {link.label.includes('Previous') ? (
                                    <Link
                                        href={link.url ?? '#'}
                                        preserveScroll
                                        preserveState
                                        className={cn(
                                            buttonVariants({ variant: 'ghost', size: 'default' }),
                                            'gap-1',
                                            !link.url && 'pointer-events-none opacity-50',
                                        )}
                                    >
                                        « Previous
                                    </Link>
                                ) : link.label.includes('Next') ? (
                                    <Link
                                        href={link.url ?? '#'}
                                        preserveScroll
                                        preserveState
                                        className={cn(
                                            buttonVariants({ variant: 'ghost', size: 'default' }),
                                            'gap-1',
                                            !link.url && 'pointer-events-none opacity-50',
                                        )}
                                    >
                                        Next »
                                    </Link>
                                ) : (
                                    <Link
                                        href={link.url ?? '#'}
                                        preserveScroll
                                        preserveState
                                        className={cn(
                                            buttonVariants({
                                                variant: link.active ? 'outline' : 'ghost',
                                                size: 'icon',
                                            }),
                                            !link.url && 'pointer-events-none opacity-50',
                                        )}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                )}
                            </PaginationItem>
                        ))}
                    </PaginationContent>
                </Pagination>
            </div>
            <div className="mt-4 text-center text-sm text-muted-foreground">
                Showing {meta.from} to {meta.to} of {meta.total} results
            </div>
        </>
    );
};

export default Paginator;
