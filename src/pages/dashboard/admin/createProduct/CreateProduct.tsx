import { FieldValues, useFieldArray, useForm } from "react-hook-form";
import { useCreateCarMutation } from "../../../../redux/fetchers/cars/carApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { FaPlus } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { ReUsableImageUploder } from "../../../../utils";
import { useState } from "react";
import { ImagePreview } from "../../../../utils/previewImage";
import { TbFidgetSpinner } from "react-icons/tb";

const CreateProduct = () => {
  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      name: "",
      brand: "",
      model: "",
      releaseYear: null,
      bodyType: "",
      transmission: "",
      fuelType: "",
      engineSize: "",
      color: "",
      price: null,
      quantity: null,
      mileage: "",
      warranty: "",
      category: "",
      description: "",
      features: [{ value: "" }],
      tags: [{ value: "" }]
    }
  });
  const navigate = useNavigate()

  const [CreateProduct, { isLoading }] = useCreateCarMutation()

  const [image, setImage] = useState<File[] | []>([])
  const [preview, setPreview] = useState<string[] | []>([])

  const { fields: featuresFields, append: featuresAppend, remove: featuresRemove } = useFieldArray({
    control,
    name: "features"
  })

  const { fields: tagFields, append: tagAppend, remove: tagRemove } = useFieldArray({
    control,
    name: "tags"
  })




  const onSubmit = async (data: FieldValues) => {

    const features = data?.features.map((features: { value: string }) => features?.value)
    const tags = data?.tags.map((tag: { value: string }) => tag?.value)

    const carData = {
      ...data,
      price: parseFloat(data?.price),
      quantity: parseInt(data?.quantity),
      features: features,
      tags: tags
    }




    // console.log(features, tags)
    try {
      const formData = new FormData()

      formData.append("data", JSON.stringify(carData))
      for (const file of image) {
        formData.append("images", file)
      }

      const res = await CreateProduct(formData).unwrap()
      if (res?.statusCode == 201) {
        toast.success(res?.message)
        navigate('/admin/get-all-products');
      }
       
    } catch (err: any) {
      const errorMessage = err?.data?.errorMessage || "Something went wrong";
      toast.error(errorMessage);
    }
  }

  return (
    <section className="bg-white dark:bg-gray-800 rounded-lg max-h-[80vh] overflow-x-auto">
      <div className="py-8 px-4 mx-auto max-w-6xl lg:py-16">
        <h2 className="mb-10 text-xl md:text-5xl font-bold text-gray-900 text-center dark:text-white">
          Add a new product
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <div className="w-full">
              <label
                htmlFor="name"
                className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Enter product name" required
                {...register("name")}
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="brand"
                className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
              >
                Brand
              </label>
              <input
                type="text"
                id="brand"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Enter car brand (e.g., Toyota)" required
                {...register("brand")}
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="model"
                className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
              >
                Model
              </label>
              <input
                type="text"
                id="model"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Enter model (e.g., Corolla)" required
                {...register("model")}
              />
            </div>
            <div>
              <label
                htmlFor="releaseYear"
                className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
              >
                Release Year
              </label>
              <input
                type="date"
                id="releaseYear"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="2025" required
                {...register("releaseYear")}
              />
            </div>
            <div>
              <label
                htmlFor="bodyType"
                className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
              >
                Body Type
              </label>
              <input
                type="string"
                id="bodyType"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Enter body type (e.g., Sedan, SUV)" required
                {...register("bodyType")}
              />
            </div>
            <div>
              <label
                htmlFor="transmission"
                className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
              >
                Transmission
              </label>
              <input
                type="string"
                id="transmission"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Enter transmission type (e.g., Automatic)" required
                {...register("transmission")}
              />
            </div>
            <div>
              <label
                htmlFor="fuelType"
                className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
              >
                Fuel Type
              </label>
              <input
                type="string"
                id="fuelType"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Enter fuel type (e.g., Petrol, Diesel)" required
                {...register("fuelType")}
              />
            </div>
            <div>
              <label
                htmlFor="engineSize"
                className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
              >
                Engine Size
              </label>
              <input
                type="string"
                id="engineSize"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Enter engine size (e.g., 2000cc or 2.0L)" required
                {...register("engineSize")}
              />
            </div>
            <div>
              <label
                htmlFor="color"
                className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
              >
                Color
              </label>
              <input
                type="string"
                id="color"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Enter car color (e.g., Black)" required
                {...register("color")}
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="price"
                className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
              >
                Price
              </label>
              <input
                type="number"
                id="price"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Enter price (e.g., 1500000)" required
                {...register("price")}
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="quantity"
                className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
              >
                Quantity
              </label>
              <input
                type="number"
                id="quantity"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Enter available quantity" required
                {...register("quantity")}
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="mileage"
                className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
              >
                Mileage
              </label>
              <input
                type="string"
                id="mileage"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Enter mileage in kilometers (e.g., 15000)" required
                {...register("mileage")}
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="warranty"
                className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
              >
                Warranty
              </label>
              <input
                type="text"
                id="warranty"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Enter warranty info (e.g., 2 years or 50,000km)" required
                {...register("warranty")}
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="category"
                className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
              >
                Category
              </label>
              <input
                type="text"
                id="category"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Enter category: car, bus, truck, etc." required
                {...register("category")}
              />
            </div>
            <div>
              <div className="flex items-center justify-between mt-6 mb-4 gap-6">
                <p
                  className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
                >
                  Features
                </p>
                <button onClick={() => featuresAppend({ value: "" })} className="mr-2 border-dotted border-2 border-gray-800 dark:border-gray-200 p-2 rounded-md">
                  <FaPlus size={16} className="text-black dark:text-white" />
                </button>
              </div>
              {
                featuresFields?.map((field, index) => (
                  <div key={field?.id} className="relative mb-4">
                    <input
                      type="text"
                      id="features"
                      className="bg-gray-50 flex-1 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder={`Enter product features ${index + 1}`} required
                      {...register(`features.${index}.value`)}
                    />
                    <button type="button" onClick={() => featuresRemove(index)} className="absolute top-1/2 -translate-y-1/2 right-2 text-white border-dotted border-2 border-gray-800 dark:border-gray-200 p-2 rounded-md">
                      <RxCross2 size={16} />
                    </button>
                  </div>
                ))
              }
            </div>
            <div>
              <div className="flex items-center justify-between mt-6 mb-4 gap-6">
                <p
                  className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
                >
                  Tags
                </p>
                <button onClick={() => tagAppend({ value: "" })} className="border-dotted mr-2 border-2 border-gray-800 dark:border-gray-200 p-2 rounded-md">
                  <FaPlus size={16} className="text-black dark:text-white" />
                </button>
              </div>
              {
                tagFields?.map((field, index) => (
                  <div key={field?.id} className="relative mb-4">
                    <input
                      type="text"
                      id="tag"
                      className="bg-gray-50 flex-1 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder={`Enter product tag ${index + 1}`} required
                      {...register(`tags.${index}.value`)}
                    />
                    <button type="button" onClick={() => tagRemove(index)} className="absolute top-1/2 -translate-y-1/2 right-2 text-white border-dotted border-2 border-gray-800 dark:border-gray-200 p-2 rounded-md">
                      <RxCross2 size={16} />
                    </button>
                  </div>
                ))
              }
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="description"
                className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
              >
                Description
              </label>
              <textarea
                id="description"
                rows={4}
                className="block p-2.5 w-full text-lg text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Enter full product description" required
                {...register("description")}
              ></textarea>
            </div>
            <div className="col-span-2 flex items-center justify-start gap-6 flex-wrap my-6">
              <ReUsableImageUploder setImage={setImage} setPreview={setPreview} label="Upload Product Images" />
              <ImagePreview setImage={setImage} setPreview={setPreview} preview={preview} />
            </div>
          </div>
          {isLoading ? (
            <button
              type="submit"
              className="flex items-center mx-auto justify-center w-full px-5 py-2.5 mt-4 sm:mt-6 text-lg font-medium text-center text-white bg-[#1d4ed8] rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-[#1d4ed8]"
            >
              <TbFidgetSpinner className="mx-auto animate-spin" size={24} />
            </button>
          ) : <button
            type="submit"
            className="flex items-center mx-auto justify-center w-full px-5 py-2.5 mt-4 sm:mt-6 text-lg font-medium text-center text-white bg-[#1d4ed8] rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-[#1d4ed8]"
          >
            Add product
          </button>
          }

        </form>
      </div>
    </section>
  );
};

export default CreateProduct;
