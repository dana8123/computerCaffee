# 철학자들은 왜 굶어죽었을까?

다섯명의 철학자들은 먹고, 생각하면서 시간을 보낸다.  
젓가락은 총 다섯개가 있다.  
식사를 할 때, 두명의 철학자들이 동시에 젓가락을 잡게된다.  
(동시성 문제 발생) -> 상호배제 시켜준다
```
while(true) {
    wait (chopstic[i]);
    wait (chopstic[(i+1) % 5]);
    ...
    // eat for a while
    ...
    signal(chopstic[i]);
    shignal(chopstic[(i+1) % 5]);
    ...
    // think for a while
    ...
}
```
- 상호배제는 이루어지지만 데드락 발생  
- 다섯명의 철학자가 동시에 배가 고파짐, 한명이 한개씩의 젓가락을 잡고있으면 아무도 식사를 할 수 없음(데드락)  
- 철학자의 숫자를 다섯명이 아닌, 네명으로 변경하면 오른쪽 젓가락만 쥐면 모든 철학자들이 식사를 할 수 있음  
- 또는 양쪽 젓가락이 모두 놓여있을 때만 잡도록 함
- 홀수의 철학자들은 왼쪽을 먼저 집고, 오른쪽을 집도록 한다
- 짝수의 철학자들은 오른쪽을 먼저 집고, 왼쪽을 집도록 한다.(크리티컬 섹션으로 보호되는 구역이므로 동시에 젓가락을 잡는일은 생기지 않는다.)
- starvation 문제는 방지하는 것 보다 그냥 두는게 비용적으로 낫다. 
    - 만약 발생하면 빨리 고치자..
## synchronization
- 모니터 도입
    - 양 쪽의 젓가락이 모두 사용 가능할 때, 집는다.
    - 모니터는 pick up, put down 메서드를 제공해야한다.
    ```java
    monitor DiningPhilosophers
    {
        enum {THINKING, HUNGRY, EATING} state[5];
        void pickup(int j) {
            state[i] = HUNGRY;
            test(i);
            // i번째 철학자가 식사중이 아니라면, 기다린다.
            if(state[i] != EATING)
                self[i].wait();
        }
        
        void putdown(int i) {
            state[i] = THINKING;
            // 좌, 우의 철학자들의 상태를 확인한다.
            test((i + 4) % 5);
            test((i + 1) % 5);
        }
        
        void test(int j) {
            // 나는 배고플 때, 좌, 우의 철학자가 먹는중이 아니라면 내가 먹는다.
            if((state[(i + 4) % 5] != EATING) && (state[i] == HUNGRY) && (state[(i+1) % 5 != EATING])) {
                state[i] = EATING;
                // 주변이 수저를 들지 않도록 알려줌
                self[i].signal();
            }
        }
        
        // 철학자들이 생각하는 상태
        initializationg_code(){
            for(int i = 0; i < 5; i++) {
                for(int i = 0; i < 5; i++) 
                    state[i] = THINKING;
            }
        }
    }
    ```



mutual explosion로 크리티컬 섹션을 보호
deadlock, starvation 