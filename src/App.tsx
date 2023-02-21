import "./styles.css";
import axios from "axios";
import { useEffect, useState } from "react";
import ScrollContainer from "./ScrollContainer";

interface PostInterface {
  id: number;
  title: string;
}

interface PaginationInterface {
  page: number;
  limit: number;
}

const defaultPagination: PaginationInterface = {
  page: 1,
  limit: 10
};

export default function App() {
  const [posts, setPosts] = useState<PostInterface[]>([]);
  const [pagination, setPagination] = useState<PaginationInterface>(
    defaultPagination
  );

  useEffect(() => {
    (async () => {
      const data = await fetchPosts(pagination);
      setPosts(data);
    })();
  }, []);

  const fetchPosts = async (
    options?: Partial<PaginationInterface>
  ): Promise<PostInterface[] | undefined> => {
    const page = options?.page || pagination?.page;
    const limit = options?.limit || pagination?.limit;
    try {
      const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
      const data = [];
      for (let i = page * limit - limit; i < limit * page; i++) {
        if (res.data[i]) {
          data.push(res.data[i]);
        }
      }
      setPagination({ page, limit });
      return data;
    } catch (error) {}
  };

  const onPostloadingMore = async () => {
    const data = (await fetchPosts({ page: pagination.page + 1 })) || [];
    setPosts((prev) => [...prev, ...data]);
  };

  return (
    <>
      Example
      <ScrollContainer height={100} onScrollBottomEnd={onPostloadingMore}>
        <ul>
          {posts?.map(({ id, title }) => (
            <li key={id}>
              {id}. {title}
            </li>
          ))}
        </ul>
      </ScrollContainer>
    </>
  );
}
