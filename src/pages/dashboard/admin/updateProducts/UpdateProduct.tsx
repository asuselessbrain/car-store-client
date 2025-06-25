import { useFieldArray, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { useGetSingleCarQuery, useUpdateCarMutation } from "../../../../redux/fetchers/cars/carApi";
import { toast } from "react-toastify";
import { Loader } from "lucide-react";
import { ReUsableImageUploder } from "../../../../utils";
import { ImagePreview } from "../../../../utils/previewImage";
import { TbFidgetSpinner } from "react-icons/tb";
import { RxCross2 } from "react-icons/rx";
import { FaPlus } from "react-icons/fa6";
import { useEffect, useState } from "react";

interface CarForm {
  name: string;
  brand: string;
  model: string;
  releaseYear: string;
  bodyType: string;
  transmission: string;
  fuelType: string;
  engineSize: string;
  color: string;
  price: number;
  quantity: number;
  mileage: string;
  warranty: string;
  category: string;
  description: string;
  features: { value: string }[];
  tags: { value: string }[];
}

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading } = useGetSingleCarQuery(id as string);
  const [updateProduct] = useUpdateCarMutation();

  const [image, setImage] = useState<File[]>([]);
  const [preview, setPreview] = useState<string[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);

  const { register, handleSubmit, control, reset } = useForm<CarForm>();

  const {
    fields: featuresFields,
    append: featuresAppend,
    remove: featuresRemove,
  } = useFieldArray({ control, name: "features" });

  const {
    fields: tagFields,
    append: tagAppend,
    remove: tagRemove,
  } = useFieldArray({ control, name: "tags" });

  const car = data?.data;

  useEffect(() => {
    if (car) {
      reset({
        ...car,
        features: car?.features?.map((f: string) => ({ value: f })) || [],
        tags: car?.tags?.map((t: string) => ({ value: t })) || [],
      });
      setExistingImages(car.images || []);
    }
  }, [car, reset]);

  if (isLoading) return <Loader />;

  const handleRemoveExistingImage = (index: number) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: CarForm) => {
    const features = data.features.map((f) => f.value);
    const tags = data.tags.map((t) => t.value);

    // Here you should upload new `image` files to Cloudinary or similar and get URLs
    // For now, let's assume no new images added — only using existing ones
    // You can merge new image URLs after upload

    const carData = {
      ...data,
      features,
      tags,
      price: parseFloat(String(data.price)),
      quantity: parseInt(String(data.quantity)),
      images: existingImages, // add new uploaded URLs here if needed
    };

    try {
      const res = await updateProduct({ id, ...carData });
      if (res?.data?.success) {
        toast.success(res.data.message);
        navigate("/admin/get-all-products");
      }
    } catch (err) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <section className="bg-white dark:bg-gray-800 rounded-lg max-h-[80vh] overflow-x-auto">
      <div className="py-8 px-4 mx-auto max-w-5xl lg:py-16">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          Update Product
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            {/* Text Inputs */}
            {[
              "name",
              "brand",
              "model",
              "bodyType",
              "transmission",
              "fuelType",
              "engineSize",
              "color",
              "mileage",
              "warranty",
              "category",
            ].map((field) => (
              <div key={field}>
                <label htmlFor={field} className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <input
                  type="text"
                  id={field}
                  {...register(field as keyof CarForm)}
                  required
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:text-white"
                  placeholder={`Enter ${field}`}
                />
              </div>
            ))}

            <div>
              <label htmlFor="releaseYear" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">
                Release Year
              </label>
              <input
                type="date"
                id="releaseYear"
                {...register("releaseYear")}
                required
                className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div>
              <label htmlFor="price" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">
                Price
              </label>
              <input
                type="number"
                id="price"
                {...register("price")}
                required
                className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div>
              <label htmlFor="quantity" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">
                Quantity
              </label>
              <input
                type="number"
                id="quantity"
                {...register("quantity")}
                required
                className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:text-white"
              />
            </div>

            {/* Features */}
            <div className="col-span-2">
              <div className="flex justify-between mb-2">
                <p className="text-lg font-medium text-gray-900 dark:text-white">Features</p>
                <button
                  type="button"
                  onClick={() => featuresAppend({ value: "" })}
                  className="border border-dotted border-gray-800 dark:border-white px-3 py-1 rounded"
                >
                  <FaPlus />
                </button>
              </div>
              {featuresFields.map((field, index) => (
                <div key={field.id} className="relative mb-3">
                  <input
                    type="text"
                    {...register(`features.${index}.value`)}
                    className="bg-gray-50 w-full border p-2.5 rounded dark:bg-gray-700 dark:text-white"
                    placeholder={`Feature ${index + 1}`}
                  />
                  <button
                    type="button"
                    onClick={() => featuresRemove(index)}
                    className="absolute top-1/2 -translate-y-1/2 right-2 text-red-500"
                  >
                    <RxCross2 />
                  </button>
                </div>
              ))}
            </div>

            {/* Tags */}
            <div className="col-span-2">
              <div className="flex justify-between mb-2">
                <p className="text-lg font-medium text-gray-900 dark:text-white">Tags</p>
                <button
                  type="button"
                  onClick={() => tagAppend({ value: "" })}
                  className="border border-dotted border-gray-800 dark:border-white px-3 py-1 rounded"
                >
                  <FaPlus />
                </button>
              </div>
              {tagFields.map((field, index) => (
                <div key={field.id} className="relative mb-3">
                  <input
                    type="text"
                    {...register(`tags.${index}.value`)}
                    className="bg-gray-50 w-full border p-2.5 rounded dark:bg-gray-700 dark:text-white"
                    placeholder={`Tag ${index + 1}`}
                  />
                  <button
                    type="button"
                    onClick={() => tagRemove(index)}
                    className="absolute top-1/2 -translate-y-1/2 right-2 text-red-500"
                  >
                    <RxCross2 />
                  </button>
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="col-span-2">
              <label htmlFor="description" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">
                Description
              </label>
              <textarea
                id="description"
                rows={4}
                {...register("description")}
                className="w-full p-2.5 bg-gray-50 border rounded-lg dark:bg-gray-700 dark:text-white"
              ></textarea>
            </div>

            {/* Show Existing Images from DB */}
            {existingImages.length > 0 && (
              <div className="col-span-2">
                <label className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Existing Images</label>
                <div className="flex flex-wrap gap-4">
                  {existingImages.map((img, index) => (
                    <div key={index} className="relative group w-[120px] h-[120px] border rounded overflow-hidden">
                      <img
                        src={img}
                        alt={`Product image ${index + 1}`}
                        className="object-cover w-full h-full"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveExistingImage(index)}
                        className="absolute top-1 right-1 text-white bg-red-600 p-1 rounded-full text-xs hidden group-hover:block"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Image Upload Preview */}
            <div className="col-span-2 flex gap-6 flex-wrap items-center my-6">
              <ReUsableImageUploder setImage={setImage} setPreview={setPreview} label="Upload Product Images" />
              <ImagePreview setImage={setImage} setPreview={setPreview} preview={preview} />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="flex items-center mx-auto justify-center w-full px-5 py-2.5 mt-4 sm:mt-6 text-lg font-medium text-white bg-[#1d4ed8] rounded-lg hover:bg-[#1e40af]"
          >
            {isLoading ? <TbFidgetSpinner className="animate-spin" size={24} /> : "Update Product"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default UpdateProduct;
