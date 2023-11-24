const admin = require("firebase-admin");

const serviceAccount = require("../socialarena-a9b29-firebase-adminsdk-gdtbp-b23571e739.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "socialarena-a9b29.appspot.com/images", // Replace with your storage bucket
});

function uploadFileToFirestore(file, callback) {
  // Check if a file was provided
  console.log("u reached here");
  if (!file) {
    return callback("No file uploaded.");
  }

  // Get a reference to the Firebase Storage bucket
  const bucket = admin.storage().bucket();

  // Create a unique filename for the image
  const imageName = `${Date.now()}_${file.originalname}`;

  // Upload the file to Firebase Storage
  const uploadTask = bucket.file(`images/${imageName}`).createWriteStream({
    metadata: {
      contentType: file.mimetype,
    },
  });

  uploadTask.on("error", (error) => {
    console.error("Error uploading image:", error);
    callback("Error uploading image.");
  });

  uploadTask.on("finish", () => {
    const imageUrl = `https://storage.googleapis.com/${bucket.name}/${uploadTask.name}`;
    // Instead of directly returning the URL, call a callback function with the URL
    callback(null, imageUrl);
  });

  uploadTask.end(file.buffer);
}

module.exports = uploadFileToFirestore;
