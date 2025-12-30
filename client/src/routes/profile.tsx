import { createFileRoute, useRouter } from '@tanstack/react-router'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { ProtectedRoute } from '@/components/ProtectedRoute'

export const Route = createFileRoute('/profile')({
    component: ProfileComponent,
})

function ProfileComponent() {
    return (
        <ProtectedRoute>
            <ProfileContent />
        </ProtectedRoute>
    )
}

function ProfileContent() {
    const { user, logout } = useAuth();
    const router = useRouter()

    const handleLogout = () => {
        logout()
        router.navigate({ to: '/auth/login' })
    }

   

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
                <div className="mb-8">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
                            <p className="text-gray-600">Manage your account information</p>
                        </div>
                        <Button variant="outline" onClick={handleLogout}>
                            Logout
                        </Button>
                    </div>
                </div>

                <div className="space-y-6">
                    {/* Profile Information Card */}
                    <Card>
                        <CardHeader>
                            <div className="flex justify-between items-center">
                                <CardTitle>Profile Information</CardTitle>

                            </div>
                        </CardHeader>
                        <CardContent>
                        
                            <div className="space-y-4">
                                <div>
                                    <Label className="text-sm font-medium text-gray-500">Full Name</Label>
                                    <p className="mt-1 text-lg">{user?.name}</p>
                                </div>

                                <div>
                                    <Label className="text-sm font-medium text-gray-500">Email Address</Label>
                                    <p className="mt-1 text-lg">{user?.email}</p>
                                </div>

                                <div>
                                    <Label className="text-sm font-medium text-gray-500">Member Since</Label>
                                    <p className="mt-1 text-lg">
                                        {user && new Date(user.createdAt).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>


                </div>
            </div>
        </div>
    )
}