export default function LoadingSpinner() {
  return (
    <span>
      <svg
        className="text-sky-800 mr-3 size-5 animate-spin"
        viewBox="0 0 24 24"
      ></svg>
      <span className="animate-ping">กำลังโหลด...</span>
    </span>
  );
}
