"use client"

import { Suspense, useState } from "react"
import { useSearchParams } from "next/navigation"

function LoginForm() {
  const params = useSearchParams()
  const [pending, setPending] = useState(false)
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-sky-50 p-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-lg">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold">徐州百泓厨房设备有限公司</h1>
          <p className="mt-2 text-sm text-slate-500">网站管理后台登录</p>
        </div>
        {params.get("reason") === "unauthorized" && <p className="mb-4 rounded-md bg-amber-50 px-3 py-2 text-sm text-amber-700">请先登录后再访问管理后台</p>}
        <form action="/api/auth/login" method="post" className="space-y-4" onSubmit={() => setPending(true)}>
          {params.get("error") && <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">{params.get("error")}</p>}
          <label className="block text-sm font-medium">邮箱<input name="email" type="email" autoComplete="email" required className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2" /></label>
          <label className="block text-sm font-medium">密码<input name="password" type="password" autoComplete="current-password" required className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2" /></label>
          <button type="submit" disabled={pending} className="w-full rounded-lg bg-[#0767a8] px-4 py-2.5 font-medium text-white hover:bg-[#055886] disabled:opacity-60">{pending ? "登录中…" : "登录"}</button>
        </form>
      </div>
    </div>
  )
}

export default function AdminLoginPage() {
  return <Suspense fallback={<div className="flex min-h-screen items-center justify-center">加载中…</div>}><LoginForm /></Suspense>
}
