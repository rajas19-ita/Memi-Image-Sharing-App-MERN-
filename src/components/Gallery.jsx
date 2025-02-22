import GalleryImage from "./GalleryImage";
import { FaSync, FaAngleLeft, FaAngleRight } from "react-icons/fa";
import Button from "./Button";

function Gallery({ imagesData, isLoading, error, page, pageSize, setPage }) {
    let content;
    if (isLoading) {
        content = (
            <div className="self-center py-3">
                <FaSync className="animate-spin" size={25} />
            </div>
        );
    } else if (error) {
        let message = error.data ? error.data.message : "An error occurred";
        content = <p className="self-center py-3 text-red-500">{message}</p>;
    } else if (imagesData) {
        if (imagesData.totalImages === 0) {
            content = (
                <p className="self-center py-3 text-gray-500">
                    nothing to show
                </p>
            );
        } else {
            content = (
                <div className="py-3 grid grid-cols-4 gap-6">
                    {imagesData.images.map((img) => (
                        <GalleryImage key={img.id} img={img.url} />
                    ))}
                </div>
            );
        }
    }

    return (
        <div className="flex flex-col gap-3">
            {content}
            <div className="flex justify-center gap-2 border-t py-3">
                <Button
                    onClick={() => setPage((prev) => prev - 1)}
                    isDisabled={page === 1}
                    secondaryBtn
                >
                    <FaAngleLeft />
                </Button>
                Page {page} {imagesData && `of ${imagesData.totalPages}`}
                <Button
                    onClick={() => {
                        setPage((prev) => prev + 1);
                    }}
                    isDisabled={
                        !imagesData ||
                        imagesData.totalImages === 0 ||
                        page === imagesData.totalPages
                    }
                    secondaryBtn
                >
                    <FaAngleRight />
                </Button>
            </div>
        </div>
    );
}

export default Gallery;
