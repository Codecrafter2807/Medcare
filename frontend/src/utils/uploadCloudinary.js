

const uploadImageToCloudinary = async (file) => {
  const uploadData = new FormData();

  uploadData.append("file", file);
  uploadData.append("upload_preset", "doctor-booking-system");
  uploadData.append("cloud_name", "harshjain");

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/harshjain/image/upload`,
    {
      method: "post",
      body: uploadData,
    }
  );

  const data = await res.json();

  return data;
};

export default uploadImageToCloudinary;
