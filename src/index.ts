//Драсьте
console.log('Доброго вечерочку! Это домашка');

interface Post {
  name?: string | undefined;
  info?: string | undefined;
  isImportant?: boolean | undefined;
  isCompleted?: boolean | undefined;
  id?: number | undefined;
}

//объект для запросов POST
const post25: Post = {
  name: 'post 25',
  info: 'test post',
  isImportant: false,
  isCompleted: true,
  id: 25,
};

//объект для запросов PATCH
const postPatched: Post = {
  name: 'post 25(patched)',
};

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
    super('https://intership-liga.ru');
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
      console.log('Error of receiving requested data!', err);

      return null;
    }
  };

  //GET-запрос (один объект)
  getPost = async (taskId: number): Promise<Post[] | null> => {
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
      console.log('Error of receiving requested data!', err);

      return null;
    }
  };

  //POST-запрос
  addPost = async (postForPost: Post): Promise<Post | null> => {
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
      console.log('Error of posting data!', err);

      return null;
    }
  };

  //PATCH-запрос
  patchPost = async (postForPatch: Post, taskId: number): Promise<Post | null> => {
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
      console.log('Error of changing data!', err);

      return null;
    }
  };

  //DELETE-запрос
  deletePost = async (taskId: number): Promise<boolean> => {
    try {
      await this.fetch<Post>(`/tasks/${taskId}`, {
        method: 'DELETE',
      });
      console.log(`Data id = ${taskId} were deleted!`);

      return true;
    } catch (err) {
      console.log('Error of deleting data!', err);

      return false;
    }
  };
}

const PostsAgentInstance = new PostsAgent();

PostsAgentInstance.getPosts();
PostsAgentInstance.getPost(666);
PostsAgentInstance.addPost(post25);
PostsAgentInstance.patchPost(postPatched, 25);
PostsAgentInstance.deletePost(25);
