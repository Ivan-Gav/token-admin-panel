export const Loading = () => {
  return (
    <div className="w-full gap-x-2 flex justify-center items-center py-8">
      <div className="w-5 bg-slate-600 animate-pulse h-5 rounded-full animate-bounce"></div>
      <div className="w-5 animate-pulse h-5 bg-slate-600 rounded-full animate-bounce"></div>
      <div className="w-5 h-5 animate-pulse bg-slate-600 rounded-full animate-bounce"></div>
    </div>
  );
};
