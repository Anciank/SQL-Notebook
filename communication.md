# 🤠Frontend Backend Communication

## Send dataset

🚀Send only file to backend. 

Dataset(file) can only be send, remove a dataset is forbbiden. Dataset of id 0 is README, it will never be send to backend.

```java
// edit your route here
```

## Atttibutes meta information
😪 ... TO BE DONE

## Send code
🚀Use { datasetID, scenarioID, cellID, payload(code) } to maintain the main backend structure.
```javascript
{
  datasetID: 1,
  scenarioID:1,
  cellID:1,
  code:"SELECT * FROM database;"
}
```
```java
// edit your route here
```
🤌also send result back 