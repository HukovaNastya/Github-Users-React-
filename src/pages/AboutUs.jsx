import {Link} from "react-router-dom";

const AboutUs = () => {
    return (
        <div style={{display: 'flex', flexDirection: 'column', padding: '20px'}}>
            <div>
                <h1>
                    You can use GitHub's API to build scripts and applications
                    that automate processes, integrate with GitHub, and extend
                    GitHub. For example, you could use the API to triage issues,
                    build an analytics dashboard, or manage releases.
                </h1>
            </div>
            <div style={{marginTop: '50px'}}>
                <Link
                    to={`/`}
                    className="profile-link btn-primary"
                    style={{ padding: '10px', color: '#fff', fontSize: '14px', borderRadius: '4px', marginLeft: '20px'}}
                >
                    Go Back HOME →
                </Link>
            </div>
        </div>


    )
}

export default AboutUs;