
interface IProps {
    image: File[] | [];
    setImage: React.Dispatch<React.SetStateAction<File[] | []>>;
    setPreview: React.Dispatch<React.SetStateAction<[] | string[]>>
}

export const ReUsableImageUploder = ({ image, setImage, setPreview }: IProps) => {


    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event?.target?.files![0];

        setImage((pre) => [...pre, file])

        if (file) {
            const reader = new FileReader();

            reader.onload = () => {
                setPreview((pre) => [...pre, reader.result as string])
            }
            reader.readAsDataURL(file);
        }
        event.target.value = ""

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