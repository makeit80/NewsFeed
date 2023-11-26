import { db } from 'api/firebase';
import { collection, deleteDoc, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';

export async function getCommentsOnKeyword(keyword) {
    // ex) 키워드가 '허경영'이면, firestore의 comments 컬렉션에서, 'keyword' 필드가 허경영인 문서들을 가져온다
    const q = query(collection(db, 'comments'));
    const querySnapshot = await getDocs(q);
    const comments = querySnapshot.docs();
    const commentsOnKeyowrd = comments.filter(comment => comment.keyword === keyword)

    console.log("commentsOnKeyowrd", commentsOnKeyowrd)

}