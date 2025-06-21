interface IProps {
    setImage: React.Dispatch<React.SetStateAction<File[] | []>>;
    preview: string[] | [];
    setPreview: React.Dispatch<React.SetStateAction<[] | string[]>>
}


export const ImagePreview = ({ setImage, preview, setPreview }: IProps) => {
    return (
        <div>
            {preview?.map((prev, index) => <img key={index} src={prev} alt="profile Image" height={145} width={145} />)}
        </div>
    )
}