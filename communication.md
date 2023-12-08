# 🤠Frontend Backend Communication

## Send dataset

🚀Send only file to backend. 

Dataset(file) can only be send, remove a dataset is forbbiden. Dataset of id 0 is README, it will never be send to backend.

```java
// edit your route here
"http://localhost:8080/api/addDataset"
```

## Send switch dataset
🚀Send dataset name to backend, when switch dataset. To determine which dataset is using.
```java
// Route
"http://localhost:8080/api/changeJsonFile"
```

## Send code
🚀Send string code to backend.
```javascript
// Route
"http://localhost:8080/api/sendDataToBackend"
```
🤌also send result back as csv like string.

## Atttibutes meta information
😪 ... TO BE DONE