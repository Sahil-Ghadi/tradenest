import AddItemForm from "./add-item-form";

export default function AddItemPage() {
  return (
    <div className="container mx-auto bg-white h-[616px] flex items-center justify-center p-4">
      <div className="w-full max-w-lg md:max-w-lg lg:max-w-lg rounded-xl drop-shadow-2xl  bg-slate-700 flex flex-col p-6 md:p-8">
        <h1 className="mb-4 text-2xl mt-4 md:text-3xl lg:text-4xl text-white font-bold text-center">
          + Add New Item
        </h1>
        <AddItemForm />
      </div>
    </div>
  );
}
