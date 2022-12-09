const admin = require('firebase-admin');
const serviceAccount = require('../keys.json');
admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
const db = admin.firestore();
const products = db.collection("products");
const { getFirestore } = require('firebase-admin/firestore');
class Container {
    async getAll() {
        try {

            const snapshot = await products.get();
            const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            return list
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    async getById(id) {
        try {
            const data = await getFirestore().doc(`/products/${id}`).get();
            return data;
        } catch (err) {
            console.log(err);
        }
    }

    async save(object) {
        try {
            const data = object;
            await products.add({ data });
            return true
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async updateProduct(id, data) {
        try {
            await products.doc(id).update({ data });
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async deleteById(id) {
        try {
            await products.doc(id).delete();
            return true
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}

module.exports = Container;