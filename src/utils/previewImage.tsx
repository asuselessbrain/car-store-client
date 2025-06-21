import { RxCross2 } from "react-icons/rx";

interface IProps {
    setImage: React.Dispatch<React.SetStateAction<File[] | []>>;
    preview: string[] | [];
    setPreview: React.Dispatch<React.SetStateAction<[] | string[]>>
}


export const ImagePreview = ({ setImage, preview, setPreview }: IProps) => {

    const handleDelete = (index: number) => {
        setImage((prev) => prev?.filter((_, indx) => indx !== index));
        setPreview((prev) => prev?.filter((_, indx) => indx !== index))
    }
    return (
        <div className="relative">
            {

                preview?.map((prev, index) => (<div key={index}><img  src={prev} alt="profile Image" className="rounded-sm" height={145} width={145} />
                    <RxCross2 size={28} onClick={() => handleDelete(index)} className="bg-red-500 text-white font-bold rounded-full absolute -top-2 -right-2 hover:bg-red-400 hover:cursor-pointer p-1" />
                </div>))
            }
        </div>
    )
}