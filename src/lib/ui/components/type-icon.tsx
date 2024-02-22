
export default function TypeIcon({ name, shortened } : { name: string, shortened?: boolean }) {
  if (!!shortened) {
    return (
      <div>Shortened type</div>
    )
  }

  return (
    <div className={`${name} flex justify-center items-center w-20 h-7 rounded border border-gray-300`}>
      <span className="text-xs text-white font-semibold text-shadow">
        {name.toUpperCase()}
      </span>
    </div>
  )
}