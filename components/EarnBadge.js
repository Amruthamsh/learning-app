import { FIREBASE_AUTH } from "../FirebaseConfig";
import {
  getDatabase,
  ref,
  update,
  onValue,
} from "firebase/database";

export const earnBadge = (badge, navigation) => {
  console.log(badge);
  const user = FIREBASE_AUTH.currentUser;
  const db = getDatabase();

  const userDataRef = ref(
    db,
    "users/" + user?.uid + "/badges/" + badge + "/counter/"
  );
  const updates = {};

  onValue(userDataRef, (snapshot) => {
    const data = snapshot.val();
    if (data == null) {
      updates["/badges/" + badge + "/counter/"] = 1;
    } else {
      updates["/badges/" + badge + "/counter/"] = data + 1;
    }
  });

  update(ref(db, "users/" + user?.uid), updates);
  navigation.navigate("Home");
};
