import { useState } from "react"


export const ReUsableImageUploder = () => {
    const [image, setImage] = useState<File[] | []>([])

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event?.target?.files![0];

        setImage((pre) => [...pre, file])

    }

    console.log(image)
    return (
        <div>
            <input onChange={handleImageUpload} type="file" multiple accept="image/*" id="image-upload" className="hidden" />
            <label
                htmlFor="image-upload"
                className="w-full h-36 md:size-36 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md cursor-pointer text-center text-sm text-gray-500 hover:bg-gray-50 transition"
            >
                Upload Image
            </label>
        </div>
    )
}