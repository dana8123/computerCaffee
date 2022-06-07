# linux 서버 운영하면서 배웠던 것
을 정리해 둔 공간입니다. 쓰면서 어려움을 겪었던 명령어들  

- SPC
EC2 인스턴스 내 저장되어있는 파일을 다운로드 받으려고 사용했던 명령어.  
bastion서버와 연결되어있는 서버에 접속하려다보니 명령어가 다소 복잡해져서 어려움을 겪었다.
```sh
#First, open the tunnel
ssh -f -i 'bastion 서버 pem key file' -N -L 포트포워딩 Num:bastion address  ubuntu@ip address

#second, user the tunnel to copy the file directly from remote2
scp -r -i '접속 서버 pem key' -P 포트포워딩 ubuntu@localhost:파일위치 /home/yj/Downloads(다운로드 파일 저장 할 위치)
```

