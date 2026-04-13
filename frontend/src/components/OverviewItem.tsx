export const OverviewItem = ({ type, amount }: { type: string, amount: number}) => {
  return (
    <>
      <div className="flex flex-col p-4 gap-2 shadow-sm rounded-2xl bg-white">
        <h1>{type}</h1>
        <p className="font-bold text-3xl">${amount}</p>
      </div>
    </>
  );
};
