import { useEffect, useState } from 'react';
import axios from 'axios';

interface Memo {
  id: number;
  title: string;
  content: string;
  author: string;
}

const Home = () => {
  const [memos, setMemos] = useState<Memo[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');

  useEffect(() => {
    fetchMemos();
  }, []);

  const fetchMemos = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/v1/memos');
      setMemos(response.data);
    } catch (error) {
      console.error('Error fetching memos:', error);
    }
  };

  const addMemo = async () => {
    try {
      await axios.post('http://localhost:3000/api/v1/memos', { title, content, author });
      setTitle('');
      setContent('');
      setAuthor('');
      fetchMemos();
    } catch (error) {
      console.error('Error adding memo:', error);
    }
  };

  const deleteMemo = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3000/api/v1/memos/${id}`);
      fetchMemos();
    } catch (error) {
      console.error('Error deleting memo:', error);
    }
  };

  return (
    <div>
      <h1>Memo App</h1>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <input
        type="text"
        placeholder="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />
      <button onClick={addMemo}>Add Memo</button>
      <ul>
        {memos.map((memo) => (
          <li key={memo.id}>
            <h2>{memo.title}</h2>
            <p>{memo.content}</p>
            <p>Author: {memo.author}</p>
            <button onClick={() => deleteMemo(memo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
