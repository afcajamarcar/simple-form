## About the project

This is a simple form project that contains a custom made image drag-n-drop component based on [react-dropzone](https://www.npmjs.com/package/react-dropzone).

It is also connected to Firebase by using Cloud Firestore.

## `Technologies`

* React ^16.13.1
* [create-react-app](https://create-react-app.dev/docs/getting-started/)
* [react-dropzone](https://www.npmjs.com/package/react-dropzone)
* [Firebase Cloud Firestore](https://firebase.google.com/docs/firestore?hl=es)

## `Instructions`

To correctly setup this project you need, essentially two things: [Nodejs](https://nodejs.org/es/) and A sample project in Firebase.

### Configs

1. Create a new Firebase project.
2. create a new colection called **students**.
3. Export your Firebase config variables to a **.env.development** file and give it the next structure:

```
    REACT_APP_FIREBASE_KEY = <string>
    REACT_APP_FIREBASE_DOMAIN= <string>
    REACT_APP_FIREBASE_DATABASE = <string>
    REACT_APP_FIREBASE_PROJECT_ID = <string>
    REACT_APP_FIREBASE_STORAGE_BUCKET = <string>
    REACT_APP_FIREBASE_SENDER_ID = <string>
    REACT_APP_FIREBASE_APP_ID = <string>
```
**note:** the **.env.development** must be in the root's project directory, not in **src** or any other folder.

4. run `yarn start` and test the app.

### Deployment

To deploy the app with Firebase's Hosting service please follow the next steps:

1. create a **.env.production.local** file with your Firebase project credentials as shown above
2. In the root of the project run `yarn build`
3. run `firebase login`
4. run `firebase init`
5. run `firebase deploy`

That should be it, please let me know if you have any questions about the project