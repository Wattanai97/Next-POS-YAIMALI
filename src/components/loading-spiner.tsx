import TubeLoading from "./tube-loding";
import "@/app/css/loading.css";
export default function LoadingSpinner() {
  return (
    <div className="grid grid-cols-1">
      <div className="my-10 text-center flex justify-center">
        <div className="text-3xl font-bold animate-pulse">
          <div className="flex">
            <p className="dark:text-slate-300/60">Loading</p>
            <div className="flex flex-row gap-1 pt-6 mx-2">
              <div className="w-2 h-2 rounded-full bg-slate-950 dark:bg-slate-300/60 animate-bounce [animation-delay:.7s]"></div>
              <div className="w-2 h-2 rounded-full bg-slate-950 dark:bg-slate-300/60 animate-bounce [animation-delay:.3s]"></div>
              <div className="w-2 h-2 rounded-full bg-slate-950 dark:bg-slate-300/60 animate-bounce [animation-delay:.7s]"></div>
            </div>
          </div>
        </div>
        <div className="w-10 h-10 relative flex items-center justify-center">
          <div className="absolute inset-0 rounded-xl bg-blue-500/20 blur-xl animate-pulse"></div>

          <div className="w-full h-full relative flex items-center justify-center animate-bounce">
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 animate-spin blur-sm"></div>

            <div className="absolute inset-1 bg-gray-900 rounded-lg flex items-center justify-center overflow-hidden">
              <div className="flex gap-1 items-center">
                <div className="w-0.5 h-5 bg-cyan-500 rounded-full animate-[bounce_1s_ease-in-out_infinite]"></div>
                <div className="w-0.5 h-5 bg-blue-500 rounded-full animate-[bounce_1s_ease-in-out_infinite_0.1s]"></div>
                <div className="w-0.5 h-5 bg-indigo-500 rounded-full animate-[bounce_1s_ease-in-out_infinite_0.2s]"></div>
                <div className="w-0.5 h-5 bg-purple-500 rounded-full animate-[bounce_1s_ease-in-out_infinite_0.3s]"></div>
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-transparent via-blue-500/10 to-transparent animate-pulse"></div>
            </div>
          </div>

          <div className="absolute -top-1 -left-1 w-2 h-2 bg-blue-500 rounded-full animate-ping"></div>
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-purple-500 rounded-full animate-ping delay-100"></div>
          <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-cyan-500 rounded-full animate-ping delay-200"></div>
          <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-blue-500 rounded-full animate-ping delay-300"></div>
        </div>
      </div>
      {/*  */}
      <div className="flex justify-center">
        <TubeLoading />
      </div>
    </div>
  );
}
