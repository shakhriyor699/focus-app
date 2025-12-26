'use client'

const AuthLeftSideBranding = () => {
  return (
    <div className="hidden lg:flex flex-col justify-center space-y-8">
      <div>
        <h1 className="text-5xl font-bold text-foreground mb-3">MyFocus</h1>
        <p className="text-xl text-muted-foreground font-light">Сосредоточьтесь на том, что действительно важно</p>
      </div>

      <div className="space-y-6">
        <div className="flex gap-4">
          <div className="shrink-0">
            <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-primary/10">
              <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
              </svg>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Минимальные отвлечения</h3>
            <p className="mt-1 text-sm text-muted-foreground">Интуитивный интерфейс помогает вам сосредоточиться</p>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="shrink-0">
            <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-primary/10">
              <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Максимальная продуктивность</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Умные рекомендации помогут вам работать эффективнее
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="shrink-0">
            <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-primary/10">
              <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Безопасность данных</h3>
            <p className="mt-1 text-sm text-muted-foreground">Ваши данные защищены шифрованием уровня банка</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthLeftSideBranding