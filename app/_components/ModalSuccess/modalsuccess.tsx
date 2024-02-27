export default function ModalSuccess({ text }: { text: string }) {
    return (
      <div className="top-[10%] absolute bg-white rounded-xl border-4 p-4 mx-2">
        <p className="text-sm text-green-500">{text}</p>
      </div>
    );
  }
  