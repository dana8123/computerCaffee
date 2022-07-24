import { EventEmitter } from 'events';
import { readFile } from 'fs';

function findRegex(files, regex) {
    const emitter = new EventEmitter();
    for (const file of files) {
        readFile(file, 'uft8', (err, content) => { // 파일을 읽을 때
            if (err) {
                return emitter.emit('error', err) // 파일을 읽는동안 에러가 발생했을 때
            }

            emitter.emit('fileread', file)
            const match = content.match(regex)
            if (match) {
                match.foreach(elem => emitter.emit('found', file, elem)) // 일치하는 항목이 발견되었을 때
            }
        })
    }
    return emitter
}


// findRegex 함수에서 생성한 EventEmitter 에 의해 발생되는 세가지 이벤트 타입에 각각 리스너를 등록
findRegex(
    ['fileA.txt', 'fileB.json'],
    /hello \w+/g
)
    .on('fileread', file => console.log(`${file} was read`))
    .on('found', (file, match) => console.log(`Matched "${match}" in ${file}`))
    .on('error', err => console.error(`Error emitted ${err.message}`))