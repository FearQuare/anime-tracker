import { useState, useCallback, useRef, useEffect } from "react";
import Cropper from 'react-easy-crop';
import { getCroppedImg } from "../../utils/cropUtils";

export default function UploadProfilePicture() {
    const [preview, setPreview] = useState(null);
    const [error, setError] = useState('');
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

    // Keep a reference of the fileInput to reset its value when the modal is closed
    const fileInputRef = useRef(null);

    const resetModal = () => {
        setPreview(null);
        setZoom(1);
        setCrop({ x: 0, y: 0 });
        setError('');
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    // LISTENER: Detects when the modal is closed via ESC or Backdrop
    useEffect(() => {
        const modalElement = document.getElementById('upload_profile_picture_modal');

        const handleClose = () => {
            resetModal();
        };

        if (modalElement) {
            modalElement.addEventListener('close', handleClose);
        }

        return () => {
            if (modalElement) {
                modalElement.removeEventListener('close', handleClose);
            }
        };
    }, []);

    const handleImageChange = (e) => {
        const image = e.target.files[0];

        if (!image) return;

        if (!image.type.startsWith('image/')) {
            setError('Only image files (JPG, PNG, GIF) are allowed.');
            setPreview(null);
            return;
        }

        if (image.size > 5 * 1024 * 1024) {
            setError('File size must be less than 5MB.');
            setPreview(null);
            return;
        }

        setError('');

        const objectUrl = URL.createObjectURL(image);
        setPreview(objectUrl);
    }

    const onCropComplete = useCallback((croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const handleUpload = async () => {
        try {
            // 1. Generate the new cropped file
            const croppedBlob = await getCroppedImg(preview, croppedAreaPixels);

            // 2. Create a "File" object from the Blob (helpful for uploading)
            const croppedFile = new File([croppedBlob], "profile_cropped.jpg", { type: "image/jpeg" });

            // 3. DEBUG: Show success and log the file
            console.log("Ready to upload:", croppedFile);
            alert("Cropped image generated! Check console.");
            
            // TODO: Send 'croppedFile' to your backend here

        } catch (e) {
            console.error(e);
            setError("Failed to crop image");
        }
    };

    return (
        <dialog id="upload_profile_picture_modal" className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg mb-3">Change Profile Picture</h3>

                {/* Preview the uploaded profile picture */}
                <div className="relative w-full h-64 bg-gray-900 rounded-lg overflow-hidden mb-4">
                    {preview ? (
                        <Cropper
                            image={preview}
                            crop={crop}
                            zoom={zoom}
                            aspect={1} // 1:1 for circular profile pics
                            onCropChange={setCrop}
                            onCropComplete={onCropComplete}
                            onZoomChange={setZoom}
                            // Restrict crop to be circular visually
                            cropShape="round"
                            showGrid={false}
                        />
                    ) : (
                        <div className="w-full h-64 bg-base-300 rounded-lg flex items-center justify-center text-base-content/50 mb-4">
                            <span>Select an image to start</span>
                        </div>
                    )}
                </div>

                {/* 2. ZOOM CONTROLS */}
                {preview && (
                    <div className="flex items-center gap-4 mb-4 px-2">
                        <span className="text-sm font-bold">Zoom</span>
                        <input
                            type="range"
                            value={zoom}
                            min={1}
                            max={3}
                            step={0.1}
                            aria-labelledby="Zoom"
                            onChange={(e) => setZoom(Number(e.target.value))}
                            className="range range-primary range-sm"
                        />
                    </div>
                )}

                {/* Error Message (I'll use AlertContext later)*/}
                {error && <div className="alert alert-error text-sm py-2 mb-4">{error}</div>}

                {/* File Input */}
                <input type='file' className="file-input" accept="image/*" onChange={handleImageChange} ref={fileInputRef} onClick={(e) => (e.target.value = null)} />
                <div className="modal-action mt-3">
                    {preview && (
                        <button className="btn btn-primary" onClick={handleUpload}>
                            Save & Upload
                        </button>
                    )}

                    <form method="dialog">
                        <button className="btn">Cancel</button>
                    </form>
                </div>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    )
}