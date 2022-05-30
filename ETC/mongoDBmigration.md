# local mongo DB > atlas로 마이그레이션하기
- mongoDB 데이터를 이동시키는 방법 : export, import, mongodump, mongorestore
- export/import 
    - 데이터를 json, csv 형식으로 추출한 뒤 같은 형식으로 DB에 저장한다.
    - 간편하지만 DB 가 가지고있던 인덱싱 정보 등은 제외되기 때문에 실제 기업 수준에서 사용되던 데이터를 백업/복원하는데는 무리가 있다.
- mongodump/mongorestore
    - 데이터를 bson과 같은 형식으로 저장하며, 인덱싱 정보 등을 모두 백업한다.
    - 속도가 export,import에 비해 빠르다고 함.

- mongorestore
    - dump폴더가 존재하는 위치에서 진행해야 귀찮지않게.. 복원할 수 있다.
    - 이거 하려고 SCP 명령어 써서 EC2에 있는거 다운받고 ㅠㅠ 그랬는데 굳이 그럴 필요 없이
    - EC2에서 dump파일만 만든 후 바로 아래 명령어 사용하면 됐을 듯.. 하하
```
mongorestore --uri "mongoDB 주소 및 유저정보,,등등등.."
             --nsExclude "admin.system.*"
             dump
```
