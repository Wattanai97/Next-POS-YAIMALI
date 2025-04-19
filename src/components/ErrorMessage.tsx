export default function ErrorMessage({ error }: { error: string }) {
    return <div className="text-red-500 text-center font-bold text-3xl my-4">{error}</div>;
  }