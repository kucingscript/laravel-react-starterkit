import DeleteConfirmationDialog from '@/components/custom/DeleteConfirmationDialog';
import Paginator from '@/components/custom/Paginator';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { PageLink, type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { Pencil, PlusCircle, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { route } from 'ziggy-js';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: route('dashboard'),
    },
    {
        title: 'Users',
        href: route('users.index'),
    },
];

interface User {
    id: number;
    name: string;
    email: string;
}

interface UserProps {
    users: {
        data: User[];
        links: PageLink[];
        current_page: number;
        last_page: number;
        from: number;
        to: number;
        total: number;
    };
}

export default function Index({ users }: UserProps) {
    const [userToDelete, setUserToDelete] = useState<User | null>(null);
    const handleDelete = () => {
        if (userToDelete) {
            router.delete(route('users.destroy', userToDelete.id), {
                preserveScroll: true,
                onSuccess: () => setUserToDelete(null),
            });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Users" />

            <div className="container mx-auto py-10">
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle>Users List</CardTitle>
                                <CardDescription>A list of all the users in your account.</CardDescription>
                            </div>

                            <Button asChild>
                                <Link href={route('users.create')}>
                                    <PlusCircle className="mr-2 h-4 w-4" />
                                    Create User
                                </Link>
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[100px]">No.</TableHead>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Email</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {users.data.length > 0 ? (
                                        users.data.map((user, index) => (
                                            <TableRow key={user.id}>
                                                <TableCell>{users.from + index}</TableCell>
                                                <TableCell>{user.name}</TableCell>
                                                <TableCell>{user.email}</TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <Button variant="outline" size="icon" asChild>
                                                            <Link href={route('users.edit', user.id)}>
                                                                <Pencil className="h-4 w-4" />
                                                            </Link>
                                                        </Button>
                                                        <Button variant="outline" size="icon" onClick={() => setUserToDelete(user)}>
                                                            <Trash2 className="h-4 w-4 text-destructive" />
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={3} className="h-24 text-center">
                                                No results.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>

                        <Paginator meta={users} />
                    </CardContent>
                </Card>
            </div>

            <DeleteConfirmationDialog
                isOpen={!!userToDelete}
                onClose={() => setUserToDelete(null)}
                onConfirm={handleDelete}
                itemName={userToDelete?.name}
            />
        </AppLayout>
    );
}
