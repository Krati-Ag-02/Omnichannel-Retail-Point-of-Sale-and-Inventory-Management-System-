export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold">
          Dashboard
        </h1>

        <p className="text-slate-400 mt-2">
          Monitor store analytics
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {[1,2,3,4].map((item) => (
          <div
            key={item}
            className="
              rounded-2xl
              border border-white/10
              bg-[#081120]
              p-6
              h-32
            "
          />
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <div
          className="
            xl:col-span-2
            rounded-2xl
            border border-white/10
            bg-[#081120]
            h-[420px]
          "
        />

        <div
          className="
            rounded-2xl
            border border-white/10
            bg-[#081120]
            h-[420px]
          "
        />
      </div>
    </div>
  )
}