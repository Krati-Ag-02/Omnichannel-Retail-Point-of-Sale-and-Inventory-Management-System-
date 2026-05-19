function POS() {
  return (
    <div className="
      grid grid-cols-1
      xl:grid-cols-3
      gap-6
    ">
      <div className="
        xl:col-span-2
        rounded-2xl
        border border-white/10
        bg-white/[0.03]
        p-6
        h-[700px]
      ">
        <h1 className="
          text-3xl
          font-semibold
          mb-6
        ">
          POS Terminal
        </h1>

        <div className="
          rounded-xl
          border border-dashed border-white/10
          h-[580px]
          flex items-center justify-center
          text-slate-500
        ">
          Products grid will appear here
        </div>
      </div>

      <div className="
        rounded-2xl
        border border-white/10
        bg-white/[0.03]
        p-6
        h-[700px]
      ">
        <h2 className="
          text-2xl
          font-semibold
          mb-6
        ">
          Cart
        </h2>

        <div className="text-slate-500">
          Cart items will appear here
        </div>
      </div>
    </div>
  )
}

export default POS