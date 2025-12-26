import AuthLeftSideBranding from "@/components/auth/AuthLeftSideBranding"


const AuthPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-background via-background to-primary/5 px-4">
      <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <AuthLeftSideBranding />
        <div className="flex items-center justify-center">
          <div className="w-full">
            {/* <AuthForm mode={mode} /> */}
            asd
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthPage