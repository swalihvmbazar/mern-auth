import { createFileRoute, Link, useRouter } from '@tanstack/react-router'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { user, isLoading, logout } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.navigate({ to: '/' })
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen  flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            MERN Stack Auth
          </h2>
        
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-center">
              {user ? `Welcome back, ${user.name}` : 'Welcome'}
            </CardTitle>
            <CardDescription className="text-center">
              {user 
                ? 'You are successfully logged in to your account.'
                : 'Please sign in or create an account to get started.'
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            {user ? (
              <div className="space-y-4">
                <div className="text-sm text-gray-600">
                  <p><strong>Email:</strong> {user.email}</p>
                </div>
                <div className="flex space-x-2">
                  <Button 
                    asChild 
                    className="flex-1"
                  >
                    <Link to="/profile">View Profile</Link>
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={handleLogout}
                    className="flex-1"
                  >
                    Logout
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <Button 
                  asChild 
                  className="w-full"
                >
                  <Link to="/auth/login">Sign In</Link>
                </Button>
                <Button 
                  asChild 
                  variant="outline" 
                  className="w-full"
                >
                  <Link to="/auth/register">Create Account</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
        
        
      </div>
    </div>
  )
}
