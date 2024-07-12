export default function Button({ label }: { label: string }) {
  return <button className="bg-sub-orange text-white px-6 py-2 font-bold rounded-full text-lg md:text-base">{label}</button>
}