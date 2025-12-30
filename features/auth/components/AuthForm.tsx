"use client"

import { useState } from "react"
import { useForm, Controller, useWatch } from "react-hook-form"
import {
  Mail,
  Lock,
  ArrowRight,
  Eye,
  EyeOff,
  Loader,
  CheckCircle,
  Code,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type AuthMode = "login" | "register"
type VerificationStage = "form" | "verify-email"

interface AuthFormValues {
  fullName: string
  email: string
  password: string
  confirmPassword: string
  verificationCode: string
}

export function AuthForm() {
  const [currentMode, setCurrentMode] = useState<AuthMode>("login")
  const [verificationStage, setVerificationStage] =
    useState<VerificationStage>("form")
  const [isLoading, setIsLoading] = useState(false)

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AuthFormValues>({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      verificationCode: "",
    },
  })

  const password = useWatch({ control, name: "password" })
  const email = useWatch({ control, name: "email" })
  const verificationCode = useWatch({ control, name: "verificationCode" })


  const isLoginMode = currentMode === "login"
  const isVerifying = verificationStage === "verify-email"

  // ---------------- SUBMIT ----------------
  const onSubmit = async (data: AuthFormValues) => {
    setIsLoading(true)
    await new Promise((r) => setTimeout(r, 2000))

    if (currentMode === "register") {
      console.log("REGISTER:", data)
      setVerificationStage("verify-email")
      setIsLoading(false)
      return
    }

    console.log("LOGIN:", data)
    setIsLoading(false)
  }

  const onVerifyEmail = async (data: AuthFormValues) => {
    setIsLoading(true)
    await new Promise((r) => setTimeout(r, 2000))

    console.log("VERIFY EMAIL:", {
      email: data.email,
      code: data.verificationCode,
    })

    alert("Аккаунт успешно создан!")
    reset()
    setCurrentMode("login")
    setVerificationStage("form")
    setIsLoading(false)
  }

  // ---------------- VERIFY EMAIL ----------------
  if (isVerifying) {
    return (
      <div className="w-full max-w-md mx-auto space-y-8">
        <div className="text-center space-y-2">
          <CheckCircle className="mx-auto h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Подтвердите email</h1>
          <p className="text-muted-foreground">
            Код отправлен на <b>{email}</b>
          </p>
        </div>

        <form onSubmit={handleSubmit(onVerifyEmail)} className="space-y-5">
          <div>
            <Label>Email</Label>
            <Input value={email} disabled />
          </div>

          <div>
            <Label>Код подтверждения</Label>
            <Controller
              name="verificationCode"
              control={control}
              rules={{
                required: "Введите email",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Некорректный email",
                },
              }}
              render={({ field }) => (
                <div className="relative">
                  <Code className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
                  <Input
                    {...field}
                    inputMode="numeric"
                    className="pl-10 text-center tracking-widest font-mono"
                    onChange={(e) =>
                      field.onChange(
                        e.target.value.replace(/\D/g, "").slice(0, 6)
                      )
                    }
                  />
                </div>
              )}
            />
            {errors.verificationCode && (
              <p className="text-sm text-red-500">
                {errors.verificationCode.message}
              </p>
            )}
          </div>

          <Button
            disabled={isLoading || verificationCode.length !== 6}
            className="w-full"
          >
            {isLoading ? <Loader className="animate-spin" /> : "Подтвердить"}
          </Button>

          <Button
            type="button"
            variant="ghost"
            onClick={() => setVerificationStage("form")}
          >
            Назад
          </Button>
        </form>
      </div>
    )
  }

  // ---------------- AUTH FORM ----------------
  return (
    <div className="w-full max-w-md mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">
          {isLoginMode ? "Вход" : "Регистрация"}
        </h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {!isLoginMode && (
          <div>
            <Label className="mb-1">Полное имя</Label>
            <Controller
              name="fullName"
              control={control}
              rules={{ required: "Введите имя" }}
              render={({ field }) => <Input {...field} />}
            />
            {errors.fullName && (
              <p className="text-sm text-red-500">
                {errors.fullName.message}
              </p>
            )}
          </div>
        )}

        <div>
          <Label className="mb-1">Email</Label>
          <Controller
            name="email"
            control={control}
            rules={{ required: "Введите email" }}
            render={({ field }) => (
              <div className="relative">
                <Mail className="absolute left-3 top-2 h-5 w-5" />
                <Input {...field} className="pl-10" />
              </div>
            )}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div>
          <Label className="mb-1">Пароль</Label>
          <Controller
            name="password"
            control={control}
            rules={{
              required: "Введите пароль",
              minLength: { value: 6, message: "Минимум 6 символов" },
            }}
            render={({ field }) => (
              <div className="relative">
                <Lock className="absolute left-3 top-2 h-5 w-5" />
                <Input
                  {...field}
                  type={showPassword ? "text" : "password"}
                  className="pl-10 pr-10"
                />
                <button
                  type="button"
                  className="absolute right-3 top-2"
                  onClick={() => setShowPassword((v) => !v)}
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
            )}
          />
          {errors.password && (
            <p className="text-sm text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>

        {!isLoginMode && (
          <div>
            <Label className="mb-1">Подтвердите пароль</Label>
            <Controller
              name="confirmPassword"
              control={control}
              rules={{
                required: "Подтвердите пароль",
                validate: (v) => v === password || "Пароли не совпадают",
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  type={showConfirmPassword ? "text" : "password"}
                />
              )}
            />
            {errors.confirmPassword && (
              <p className="text-sm text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
        )}

        <Button className="w-full" disabled={isLoading}>
          {isLoading ? <Loader className="animate-spin" /> : "Продолжить"}
          <ArrowRight />
        </Button>
      </form>

      <div className="text-center text-sm">
        {isLoginMode ? (
          <button onClick={() => setCurrentMode("register")}>
            Создать аккаунт
          </button>
        ) : (
          <button onClick={() => setCurrentMode("login")}>
            Уже есть аккаунт
          </button>
        )}
      </div>
    </div>
  )
}
