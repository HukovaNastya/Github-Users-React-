import React from "react";

const TableRow = ({ data }) => {
    return (
        <tbody>
        {data?.map(user => (
            <tr key={user.id} id={`user-${user.id}`}>
                <td>
                    <div className="user-info">
                        <img src={user.avatar_url} alt={user.login} className="avatar" />
                        <span className="username">{user.login}</span>
                    </div>
                </td>
                <td>{user.public_repos}</td>
                <td>{user.followers}</td>
                <td>
                    <a
                        href={user.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="profile-link"
                    >
                        View Profile →
                    </a>
                </td>
                <td>
                    <button
                        className="btn-repos"
                        data-user-id={user.id}
                        onClick={() => toggleRepos(user.login, user.id)}
                    >
                        Show Repos
                    </button>
                </td>
            </tr>
        ))}
        </tbody>
        // <tr>
        //     {data.map((item) => {
        //         return <td key={item}>{item}</td>;
        //     })}
        // </tr>
    );
};

export default TableRow;