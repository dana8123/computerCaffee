import { EventEmitter } from "events";
import { readFileSync } from "fs";

class FindRegexSync extends EventEmitter {
    constructor(regex) {
        super()
        this.regex = regex
        this.files = []
    }

    addFile(file) {
        this.files.push(file)
        return this
    }

    find() {
        console.log('실행순서가..?')
        for (const file of this.files) {
            let content
            try {
                content = readFileSync(file, 'utf-8')
            } catch (err) {
                this.emit('error', err)
            }
            this.emit('fileread', file)
            const match = content.match(this.regex)
            if (match) {
                match.forEach(elem => this.emit('found', file, elem))
            }
        }
        return this
    }
}


const findRegexSyncInstance = new FindRegexSync(/hello \w+/)
findRegexSyncInstance
    .addFile('fileA.txt')
    .addFile('fileB.json')
    // this listener is invoked
    .on('found', (file, match) => console.log(`[Before] Matched "${match}" in ${file}`))
    .find()
    // this listener is never invoked
    .on('found', (file, match) => console.log(`[After] Matched "${match}" in ${file}`))
