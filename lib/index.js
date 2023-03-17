"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
console.log('Домашка');
const post25 = {
    name: 'post 25',
    info: 'test post',
    isImportant: false,
    isCompleted: true,
    id: 25,
};
class BasicAgent {
    constructor(_baseUrl) {
        this._baseUrl = _baseUrl;
        this.fetch = (url, value) => __awaiter(this, void 0, void 0, function* () {
            const res = yield fetch(`${this._baseUrl}${url}`, value);
            if (res.ok) {
                const result = (yield res.json());
                return result;
            }
            else {
                throw new Error('Error!');
            }
        });
    }
}
class PostsAgent extends BasicAgent {
    constructor() {
        super('https://intership-liga.ru');
        this.getPosts = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield this.fetch('/tasks', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                console.log('All posts are received!', res);
                return res;
            }
            catch (err) {
                console.log('Error of receiving requested data!', err);
                return null;
            }
        });
        this.getPost = (taskId) => __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield this.fetch(`/tasks/${taskId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                console.log(`Data id = ${taskId} are received!`, res);
                return res;
            }
            catch (err) {
                console.log('Error of receiving requested data!', err);
                return null;
            }
        });
        this.addPost = (postForPost) => __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield this.fetch('/tasks/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(postForPost),
                });
                console.log(`Data id = ${postForPost.id} were posted!`, res);
                return res;
            }
            catch (err) {
                console.log('Error of posting data!', err);
                return null;
            }
        });
    }
}
const PostsAgentInstance = new PostsAgent();
PostsAgentInstance.getPosts();
PostsAgentInstance.getPost(663);
PostsAgentInstance.addPost(post25);
//# sourceMappingURL=index.js.map