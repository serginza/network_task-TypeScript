import { post25, postPatched } from './mockUploadPayload';
import { Post } from './Task.entity';
import {
  ERROR_RECEIVING_DATA_MSG,
  ERROR_CHANGING_DATA_MSG,
  ERROR_POSTING_DATA_MSG,
  ERROR_DELETING_DATA_MSG,
  baseURL,
} from './constants';

//Драсьте
console.log('Доброго вечерочку! Это домашка');

//Класс fetch
class BasicAgent {
  constructor(private _baseUrl: string) {}

  fetch = async <T>(url: string, value?: RequestInit): Promise<T> | never => {
    const res = await fetch(`${this._baseUrl}${url}`, value);

    if (res.ok) {
      const result = (await res.json()) as T;

      return result;
    } else {
      throw new Error('Error!');
    }
  };
}

//Класс REST-запросов
class PostsAgent extends BasicAgent {
  constructor() {
    super(baseURL);
  }

  //GET-запрос
  getPosts = async (): Promise<Post[] | null> => {
    try {
      const res = await this.fetch<Post[]>('/tasks', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('All posts are received!', res);

      return res;
    } catch (err) {
      console.log(ERROR_RECEIVING_DATA_MSG, err);

      return null;
    }
  };

  //GET-запрос (один объект)
  getPost = async (taskId: number): Promise<Post[] | null> => {
    if (!taskId) {
      throw new Error(ERROR_RECEIVING_DATA_MSG);
    }
    try {
      const res = await this.fetch<Post[]>(`/tasks/${taskId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(`Data id = ${taskId} are received!`, res);

      return res;
    } catch (err) {
      console.log(ERROR_RECEIVING_DATA_MSG, err);

      return null;
    }
  };

  //POST-запрос
  addPost = async (postForPost: Post): Promise<Post | null> => {
    if (!postForPost) {
      throw new Error(ERROR_POSTING_DATA_MSG);
    }
    try {
      const res = await this.fetch<Post>('/tasks/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postForPost),
      });
      console.log(`Data id = ${postForPost.id} were posted!`, res);

      return res;
    } catch (err) {
      console.log(ERROR_POSTING_DATA_MSG, err);

      return null;
    }
  };

  //PATCH-запрос
  patchPost = async (postForPatch: Post, taskId: number): Promise<Post | null> => {
    if (!taskId || !postForPatch) {
      throw new Error(ERROR_CHANGING_DATA_MSG);
    }
    try {
      const res = await this.fetch<Post>(`/tasks/${taskId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postForPatch),
      });
      console.log(`Data id = ${taskId} were changed!`, res);

      return res;
    } catch (err) {
      console.log(ERROR_CHANGING_DATA_MSG, err);

      return null;
    }
  };

  //DELETE-запрос
  deletePost = async (taskId: number): Promise<boolean> => {
    if (!taskId) {
      throw new Error(ERROR_DELETING_DATA_MSG);
    }
    try {
      await this.fetch<Post>(`/tasks/${taskId}`, {
        method: 'DELETE',
      });
      console.log(`Data id = ${taskId} were deleted!`);

      return true;
    } catch (err) {
      console.log(ERROR_DELETING_DATA_MSG, err);

      return false;
    }
  };
}

const PostsAgentInstance = new PostsAgent();

PostsAgentInstance.getPosts();
PostsAgentInstance.getPost(1);
PostsAgentInstance.addPost(post25);
PostsAgentInstance.patchPost(postPatched, 25);
PostsAgentInstance.deletePost(25);
