var ImagePicker = require('react-native-image-picker');
import { Platform } from 'react-native';
import firebase from 'react-native-firebase';
import Toast from 'react-native-simple-toast';



export function pickImage(title, path, setUrlFn, loadingFn) {
    var options = {
        title,
        customButtons: [],
        storageOptions: {
            skipBackup: true,
            path: 'images'
        }
    };

    ImagePicker.showImagePicker(options, (response) => {
        console.log('Response = ', response);
        let message = "";
        if (response.didCancel) {
            console.log('User cancelled image picker');
            message = 'No image selected';
        }
        else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
            message = `Image selection Error: ${response.error}`;
        }
        else {
            let source = { uri: response.uri };
            loadingFn();
            uploadImage(setUrlFn, path, response.uri, response.fileName);
            message = 'Image selected successfully';
            // You can also display the image using data:
            // let source = { uri: 'data:image/jpeg;base64,' + response.data };
        
            // callBack(source);
        }
        message.length > 0 && Toast.show(message, Toast.LONG)
    });
}

// const uploadImage = (uri, imageName, mime = 'image/jpg') => {
//     console.log("uri - ", uri)
//     const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
//     const imageRef = firebase.storage().ref('posts').child(imageName)
//     imageRef.put(uploadUri, { contentType: mime })
//     .then(() => {
//         return imageRef.getDownloadURL()
//     })
//     .then((url) => {
//         resolve(url)
//     })
//     .catch((error) => {
//         reject(error)
//     })
// }

const uploadImage = (setUrlFn, path, uri, imageName, mime = 'image/jpg') => {
    console.log("uri - ", uri)
    // return new Promise((resolve, reject) => {
        const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
        const imageRef = firebase.storage().ref(path).child(imageName + new Date().toISOString())
        imageRef.put(uploadUri, { contentType: mime })
        .then(() => {
            return imageRef.getDownloadURL()
        })
        .then((url) => {
            setUrlFn(url);
            // resolve(url)
        })
        .catch((error) => {
            setUrlFn(null);
            Toast.show(`Can't upload image: ${error}`, Toast.LONG)
            // reject(error)
        })
    // })
}