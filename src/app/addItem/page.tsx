import AddItemForm from "./add-item-form";

export default function AddItemPage() {
  return (
    <div className="container mx-auto bg-white h-[616px] flex items-center justify-center p-4">
      <div className="w-full max-w-lg md:max-w-lg lg:max-w-lg rounded-xl border-4 border-gray-700 shadow-2xl border-dashed bg-white flex flex-col p-6 md:p-8">
        <h1 className="mb-4 text-2xl mt-4 md:text-3xl lg:text-4xl text-black font-bold text-center">
          + Add New Item
        </h1>
        <AddItemForm />
      </div>
    </div>
  );
}
