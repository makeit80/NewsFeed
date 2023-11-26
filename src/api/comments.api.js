import { db } from 'api/firebase';
import { collection, getDocs, query } from 'firebase/firestore';

export async function getCommentsOnKeyword(keyword) {
  const q = query(collection(db, 'comments'));
  const querySnapshot = await getDocs(q);
  const docs = querySnapshot.docs;
  const comments = docs.map((doc) => doc.data());
  const commentsOnKeyword = comments.filter((comment) => comment.keyword === keyword);

  return commentsOnKeyword;
}
