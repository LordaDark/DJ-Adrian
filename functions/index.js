const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

exports.deleteUser = functions.https.onCall(async (data, context) => {
  const {userId} = data;

  if (!userId) {
    throw new functions.https.HttpsError("invalid-argument", "User ID required.");
  }

  try {
    // Elimina l'utente da Authentication
    await admin.auth().deleteUser(userId);

    // Elimina l'utente da Firestore
    await admin.firestore().collection("users").doc(userId).delete();

    return {success: true, message: "User deleted successfully."};
  } catch (error) {
    console.error("Error deleting user:", error);
    throw new functions.https.HttpsError("internal", "Error deleting user.");
  }
});
