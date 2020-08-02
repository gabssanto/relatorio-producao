import { firebaseFirestore } from './firebase'

export default class FirebaseService {
    static pushData = (node, objToSubmit) => {
        const ref = firebaseFirestore.ref(node).push();
        const id = firebaseFirestore.ref(node).push().key;
        ref.set(objToSubmit);
        return id;
    };

    static getDataList = (nodePath, callback, size = 10) => {

        let query = firebaseFirestore.ref(nodePath)
            .limitToLast(size);
        query.on('value', dataSnapshot => {
            let items = [];
            dataSnapshot.forEach(childSnapshot => {
                let item = childSnapshot.val();
                item['key'] = childSnapshot.key;
                items.push(item);
            });
            callback(items);
        });

        return query;
    };

}
