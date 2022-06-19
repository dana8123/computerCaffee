# Elastic search
업무하다가 배우게된 내용들

## reindex
source(기존 인덱스)로 부터 destination(새로운 인덱스)로의 문서
elastic search에서 analyzer를 변경한다던지, index의 이름을 변경하는것이 어렵기 때문에 인덱스에 있던 문서를 다른 인덱스로 옮겨주는 API
주의사항
  키바나에서 요청할 때, 기본적으로 데이터 처리가 30초 이상이 된다면 timeout 가 반환된다.
  많은 양의 데이터를 처리하는 요청 시, _reindex/?wait_for_completion=false 로 요청하면 바로 result가 반환되고, 백그라운드에서 Redindex 작업이 진행된다.
```json
POST _reindex
{
  "source": {
    "index": "store_item"
  },
  "dest": {
      "index": "text_index"
  }
}
```