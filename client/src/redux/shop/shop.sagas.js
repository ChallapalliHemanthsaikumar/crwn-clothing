import { takeLatest,call, put,all } from "@redux-saga/core/effects";

import { firestore,convertCollectionsSnapshotToMap } from "../../firebase/firebase.utils";
import ShopActionTypes from "./shop.types";

import {
    fetchCollectionSuccess,
    fetchCollectionsFailure
} from './shop.actions';



export function* fetchCollectionsAsync(){
  
   try{

   
   const collectionRef = firestore.collection('collections');

   const snapshot = yield collectionRef.get();
    
   const collectionMap = yield call(convertCollectionsSnapshotToMap,snapshot);
   yield put(fetchCollectionSuccess(collectionMap));
   }catch(error){
    yield put(fetchCollectionsFailure(error.message))
   }

//    collectionRef.get().then(snapshot=> {
//        const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
//        dispatch(fetchCollectionSuccess(collectionsMap));
       
//    }).catch(error => dispatch(fetchCollectionsFailure(error.message)));
}

export function* fetchCollectionsStart(){
    yield takeLatest(ShopActionTypes.FETCH_COLLECTIONS_START,
    fetchCollectionsAsync)
};

export function* shopSagas(){
    yield all([call(fetchCollectionsStart)])
};