import TableHeadItem from "./TableHeadItem.jsx";
import { Link } from "react-router-dom";

const Table = ({ theadData, tbodyData, customClass }) => {
    return (
        <table className={customClass}>
            <thead>
            <tr>
                {theadData?.map((h) => {
                    return <TableHeadItem key={h} item={h} />;
                })}
            </tr>
            </thead>
            <tbody>
            {tbodyData.map((user) => (
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
                        <Link
                            to={`/search/${user.id}`}
                            className="profile-link"
                        >
                            View Profile →
                        </Link>

                    </td>
                    <td>
                        <button
                            className="btn-repos"
                            data-user-id={user.id}
                        >
                            Show Repos
                        </button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default Table;












