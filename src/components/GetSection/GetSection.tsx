import { useEffect, useState } from "react";
import type { User } from "../../types/User";
import { UserCardMemo } from "../UserCard/UserCard";
import "./GetSection.scss";
import { Loader } from "../Loader/Loader";
import { ErrorPortal } from "../ErrorPortal/ErrorPortal";

type Params = { updateUsersList: number };

export const GetSection:React.FC<Params> = ({updateUsersList}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [nextUsersLink, setNextUsersLink] = useState<string | null>(
    "https://frontend-test-assignment-api.abz.agency/api/v1/users?page=1&count=6"
  );

  const [loading, setLoading] = useState(false);
  const [update, setUpdate] = useState(1);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      setTimeout(() => {}, 1000);
      if (nextUsersLink) {
        try {
          const result = await fetch(nextUsersLink);

          const response = await result.json();

          setNextUsersLink(response.links.next_url);
          setUsers((u) => [...u, ...response.users]);
        } catch (error) {
          console.log(error);
          setMessage("Error while fetching users");
        }
      }

      setLoading(false);
    };

    getUsers();
  }, [update]);

  useEffect(() => {
    const getUsersOnNewUserRegistration = async () => {
      setLoading(true);
      setTimeout(() => {}, 1000);
        try {
          const result = await fetch('https://frontend-test-assignment-api.abz.agency/api/v1/users?page=1&count=6');

          const response = await result.json();

          setNextUsersLink(response.links.next_url);
          setUsers([...response.users]);
        } catch (error) {
          console.log(error);
          setMessage("Error while fetching users");
        }

      setLoading(false);
    };

    getUsersOnNewUserRegistration();
  }, [updateUsersList])

  return (
    <section className="get" id="users">
      {!!message.length && (
        <ErrorPortal
          message={message}
          onClose={() => {
            setMessage("");
          }}
        />
      )}
      <h1 className="get_header">Working with GET request</h1>

      <div className="get_list">
        {users.map((user) => (
          <UserCardMemo user={user} key={user.id} />
        ))}
      </div>
      {loading && <Loader />}
      <button
        className="get_button"
        onClick={() => {
          setUpdate((prev) => prev + 1);
        }}
        disabled={!nextUsersLink}
      >
        See more
      </button>
    </section>
  );
};
