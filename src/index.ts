console.log('Домашка');
interface post {
  name: string;
  info: string;
  isImportant: boolean;
  isCompleted: boolean;
  id: number;
}

//объект для запросов
const post25: post = {
  name: 'post 25',
  info: 'test post',
  isImportant: false,
  isCompleted: true,
  id: 25,
};
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

class PostsAgent extends BasicAgent {
  constructor() {
    super('https://intership-liga.ru');
  }

  getPosts = async (): Promise<post[] | null> => {
    try {
      const res = await this.fetch<post[]>('/tasks', {
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

  getPost = async (taskId: number): Promise<post[] | null> => {
    try {
      const res = await this.fetch<post[]>(`/tasks/${taskId}`, {
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

  addPost = async (postForPost: post): Promise<post | null> => {
    try {
      const res = await this.fetch<post>('/tasks/', {
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
}

const PostsAgentInstance = new PostsAgent();

PostsAgentInstance.getPosts();
PostsAgentInstance.getPost(663);
PostsAgentInstance.addPost(post25);
