import {Link, useLoaderData} from "react-router-dom";

const UserInfo = () => {
    const user = useLoaderData();
    console.log(user);

    if (!user) return <p>Loading user...</p>;

    return (
        <div className="user-info" style={{padding: '20px'}}>
            <h2>{user.login}</h2>
            <img src={user.avatar_url} alt={user.login} width={100} />
            <p>Name: {user.name}</p>
            <p>Company: {user.company}</p>
            <p>Followers: {user.followers}</p>
            <p>Repositories: {user.public_repos}</p>
            <a href={user.html_url} target="_blank" rel="noopener noreferrer">
                Visit GitHub Profile →
            </a>
            <Link
                to={`/search`}
                className="profile-link btn-primary"
                style={{ padding: '10px', color: '#fff', fontSize: '14px', borderRadius: '4px', marginLeft: '20px'}}
            >
               Go Back  →
            </Link>
        </div>
    );
};

export default UserInfo;
