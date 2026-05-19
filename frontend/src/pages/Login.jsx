import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

function Login() {
  return (
    <div className="
      min-h-screen
      flex items-center justify-center
      px-6
    ">
      <div className="
        w-full max-w-md
        rounded-3xl
        border border-white/10
        bg-white/[0.03]
        backdrop-blur-xl
        p-8
      ">
        <div className="mb-8">
          <h1 className="
            text-3xl
            font-semibold
          ">
            Welcome Back
          </h1>

          <p className="
            text-slate-400
            mt-2
          ">
            Login to continue
          </p>
        </div>

        <div className="space-y-5">
          <Input
            placeholder="Email"
            className="
              h-12
              bg-white/[0.03]
              border-white/10
            "
          />

          <Input
            type="password"
            placeholder="Password"
            className="
              h-12
              bg-white/[0.03]
              border-white/10
            "
          />

          <Button className="
            w-full
            h-12
            bg-blue-500
            hover:bg-blue-600
          ">
            Login
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Login