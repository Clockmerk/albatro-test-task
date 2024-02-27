export default function ModalError({ error }: { error: string }) {
  return (
    <div className="top-[10%] absolute bg-white rounded-xl border-4 p-4 mx-2">
      <p className="text-sm text-red-500">{error}</p>
    </div>
  );
}
