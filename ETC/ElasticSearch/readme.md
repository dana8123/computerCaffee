# Elastic search
업무하다가 배우게된 내용들, 엘라스틱 서치 공식문서, 또는 https://esbook.kimjmin.net/을 참조했습니다.

## reindex
source(기존 인덱스)로 부터 destination(새로운 인덱스)로의 문서
elastic search에서 analyzer를 변경한다던지, index의 이름을 변경하는것이 어렵기 때문에 인덱스에 있던 문서를 다른 인덱스로 옮겨주는 API  
```주의사항!```  
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

## analyzer
주어진 단어를 어떻게 분석할 것인가를 결정하는 분석기..  
한글 분석기는 엘라스틱 서치에서 공식적으로 지원하는 nori 가 있다.  
각각의 옵션마다 다르게 분석을 한다.

## mapping
엘라스틱 서치는 인덱스에 도큐먼트를 생성하면, 자동으로 매핑이 생성된다.  
```json
GET item_name/_mapping
```
자동으로 매핑 데이터가 생성되기 전에,
미리 인덱스의 매핑을 정의할 수 있다.  
이미 만들어진 매핑 데이터에 추가를 할 순 있지만, 수정/삭제는 불가능하므로,, 매핑이 잘못된 경우 인덱스를 삭제하고 다시 생성하는 작업이 필요하다.

