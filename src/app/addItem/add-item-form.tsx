"use client";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAdminStore } from "@/store/adminStore";

interface ItemData {
  name: string;
  price: string;
}

export default function AddItemForm() {
  const [fileName, setFileName] = useState("No file chosen");
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { CreateItem } = useAdminStore();
  const [file, setFile] = useState<File | null>(null);
  const [data, setData] = useState<ItemData>({ name: "", price: "" });
  const router = useRouter();


  

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
    setFileName(selectedFile ? selectedFile.name : "No file chosen");
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { name, price } = data;

    if (!name || !price || !file) {
      setError("Please fill out all fields");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const res = await CreateItem(name, Number(price), file);

      if (res.error) {
        setError(res.error.message);
      } else {
        router.push("/");
      }
    } catch {
      setError("Failed to create item. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col items-center justify-center p-8">
      <Input
        className="pl-3 w-[350px] h-[42px] py-2 mb-4 border bg-gray-100 rounded-xl outline-gray-300"
        id="name"
        name="name"
        required
        value={data.name}
        placeholder="Item Name"
        onChange={(e) => setData({ ...data, name: e.target.value })}
      />

      <Input
        className="pl-3 w-[350px] h-[42px] py-2 mb-4 border bg-gray-100 rounded-xl outline-gray-300"
        id="price"
        name="price"
        type="number"
        step="1"
        required
        value={data.price}
        placeholder="Price ₹"
        onChange={(e) => setData({ ...data, price: e.target.value })}
      />

      <div className="flex flex-col">
        <input
          id="image"
          name="image"
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
          ref={fileInputRef}
        />
        <div className="flex items-center w-[350px] h-[42px] mb-4 border bg-gray-100 rounded-xl outline-gray-300">
          <button
            type="button"
            className="bg-blue-600 text-white px-4 py-2 rounded-l-xl hover:bg-blue-700 transition"
            onClick={() => fileInputRef.current?.click()}
          >
            Choose File
          </button>
          <span className="px-3 text-gray-600 truncate">{fileName}</span>
        </div>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      <Button
        className="mt-5 w-[300px] h-[42px] flex justify-center items-center py-2 px-4 rounded-full shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 dark:hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? "Adding Item..." : "Add Item"}
      </Button>
    </form>
  );
}
