import EmptyIcon from "@/assets/empty-folder.svg?react";

export const EmptyLogs = () => {
  return (
    <div className="w-full h-full flex flex-col gap-2 justify-center items-center p-14">
      <EmptyIcon className="size-10 sm:size-12" />
      <p className="text-xl sm:text-2xl text-center">Записей не обнаружено</p>
    </div>
  );
};
